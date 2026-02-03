import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-4 border-t border-gray-200 bg-gray-100">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="">
                <p className="text-2xl font-bold">SmartSearch AI</p>
                <p className="font-light">AI-powered semantic product discovery built with Next.js & Groq</p>
            </div>
            <div className="">
                <div className="flex items-center justify-center text-center p-4">
                   <p className="font-bold">Tech Stack: Next.js | React | React Query | Groq AI | Tailwind CSS</p>
                </div>
            </div>
            </div>

            <div className="flex items-center gap-4 justify-center text-center p-4">
                <p className="font-bold">© 2026 Built by Venkey</p>
            </div>
        </footer>
    )
}