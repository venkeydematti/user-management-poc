import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Custom 404 Page</h1>
            <p>The page you are looking for does not exist.</p>
            <Link href="/" className="text-blue-500 hover:text-blue-700">Go back to the home page</Link>
        </div>
    )
}