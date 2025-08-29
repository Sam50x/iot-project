const mqtt = require('mqtt');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('Starting HiveMQ-Supabase bridge...');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

const options = {
    host: process.env.HIVEMQ_HOST,
    port: parseInt(process.env.HIVEMQ_PORT),
    protocol: 'mqtts',
    username: process.env.HIVEMQ_USERNAME,
    password: process.env.HIVEMQ_PASSWORD,
};

console.log('Connecting to HiveMQ...');

const client = mqtt.connect(options);

client.on('connect', () => {
    console.log('Connected to HiveMQ successfully!');

    client.subscribe('esp32/sensors/distance', (err) => {
        if (!err) {
            console.log('Subscribed to esp32/sensors/distance topic');
            console.log('Waiting for messages from ESP32...');
        } else {
            console.error('❌ Subscription error:', err);
        }
    });
});

client.on('message', async (topic, message) => {
    const messageStr = message.toString();
    console.log('Message received from ESP32:', messageStr);

    try {
        const data = JSON.parse(messageStr);
        console.log('Parsed data:', data);

        const { data: result, error } = await supabase
            .from('sensor_data')
            .insert([
                {
                    distance: data.distance,
                }
            ]);

        if (error) {
            console.error('Database error:', error);
        } else {
            console.log('Data saved to Supabase successfully!');
            console.log('Saved:', {
                distance: data.distance,
            });
        }

    } catch (error) {
        console.error('Error processing message:', error);
    }
});

client.on('error', (error) => {
    console.error('MQTT connection error:', error);
});

client.on('close', () => {
    console.log('MQTT connection closed');
});

process.on('SIGINT', () => {
    console.log('Shutting down bridge...');
    client.end();
    process.exit(0);
});