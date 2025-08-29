'use client'

import { useState } from "react";

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { role: "assistant", text: "Hi! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });
            const data = await res.json();

            setMessages((prev) => [...prev, { role: "assistant", text: data.bot }]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "Something went wrong. Try again." },
            ]);
        }
    };

    return (
        <div className="font-sans flex flex-col items-center justify-center w-full h-full">

            <div className="w-full max-w-md bg-gray-light shadow-lg rounded-2xl flex flex-col h-120">
                {/* Header */}
                <div className="bg-blue-600 text-gray-light px-4 py-3 text-lg font-semibold">
                    Chatbot
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`px-4 py-2 rounded-xl max-w-[70%] text-sm shadow-md whitespace-pre-line ${msg.role === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="flex items-center border-t border-gray-light p-3 bg-gray-light">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
