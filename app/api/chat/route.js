import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "No message provided" }, { status: 400 });
        }

        const res = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=" +
            process.env.NEXT_PUBLIC_GEMINI_API_KEY,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: message }],
                        },
                    ],
                }),
            }
        );

        const data = await res.json();

        if (
            data?.candidates?.[0]?.content?.parts?.[0]?.text
        ) {
            const botReply = data.candidates[0].content.parts[0].text;
            return NextResponse.json({ user: message, bot: botReply });
        } else {
            return NextResponse.json(
                { error: "Failed to get valid response", details: data },
                { status: 500 }
            );
        }
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
