'use client'

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

const HistoryPage = () => {

    const [history, setHistory] = useState([])

    const getHistory = async () => {
        const { data, error } = await supabase
            .from("sensor_data")
            .select()
            .order("created_at", { ascending: true })

        if (error) {
            console.error("Error fetching history:", error);
        } else if (data) {
            setHistory(data);
        }
    };

    useEffect(() => {
        getHistory();

        const channel = supabase
            .channel("distance-changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "sensor_data",
                },
                (payload) => {
                    console.log("New row:", payload.new);
                    setDistance(payload.new.distance);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const historyItems = history.map((dist, index) => {
        if (!dist.distance || dist.distance >= 50) return
        return (
            <div
                key={index}
                className="grid grid-cols-3 w-full text-center border-b border-gray-700 py-1"
            >
                <h1>{dist.distance}</h1>
                <h1>{dist.created_at.split("T")[1].split(".")[0]}</h1>
                <h1>{dist.created_at.split("T")[0]}</h1>
            </div>
        )
    })

    return (
        <div className="font-sans flex flex-col items-center justify-center w-full h-full">
            <div className="w-120 h-160 bg-black-main border-4 p-8 overflow-y-scroll">
                <div className="w-full h-full flex flex-col justify-between items-center">
                    <div
                        className="grid grid-cols-3 w-full text-center border-b border-gray-700 py-1"
                    >
                        <h1>Distance</h1>
                        <h1>Time</h1>
                        <h1>Date</h1>
                    </div>
                    {historyItems}
                </div>
            </div>
        </div>
    )
}

export default HistoryPage