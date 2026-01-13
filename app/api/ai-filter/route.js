import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
    try {
        const { text } = await request.json();
        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            temperature: 0,
            messages: [
                {
                    role: "system",
                    content: `
Return ONLY valid JSON.

Rules:
- "query" must be a SINGLE keyword or category
- Remove words like "under", "below", numbers, currency

Schema:
{
  "query": string | null,
  "maxPrice": number | null
}

Examples:
User: "groceries under 400"
Output: {"query":"groceries","maxPrice":400}

User: "chicken below 100"
Output: {"query":"chicken","maxPrice":100}
`
                },
                { role: "user", content: text },
            ],
        });

        const response = completion.choices[0].message.content;

        let filters;
        try {
            // Parse the response as JSON
            filters = JSON.parse(response);
        } catch {
            console.error("Invalid AI response:", response);
            // Response sent to FE
            return NextResponse.json(
                { error: "Invalid AI response format" },
                { status: 500 }
            );
        }

        return NextResponse.json({ filters });
    } catch (error) {
        console.error("AI filter error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
