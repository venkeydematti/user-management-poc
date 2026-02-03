import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
    return (
        <header className="px-10 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-100"> 
            <Link href="/">
                <h2 className="uppercase font-semibold text-lg tracking-wide">User Management</h2>
            </Link>
            <Link href="/products" className="text-sm text-gray-500 hover:text-gray-700">Smart AI Search</Link>
        </header>
  );
}