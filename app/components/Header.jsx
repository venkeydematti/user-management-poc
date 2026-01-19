import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
    return (
        <header className="px-10 py-3 border-b border-b-gray-600 flex items-center justify-between"> 
            <Link href="/">
                <h2 className="uppercase font-semibold text-lg tracking-wide">User Management</h2>
            </Link>
            <Link href="/products" className="text-sm text-gray-500 hover:text-gray-700">Products ( Using useEffect )</Link>
            <Link href="/products-query" className="text-sm text-gray-500 hover:text-gray-700">Products ( Using Tanstack Query)</Link>
            <Link href="/login">  
                <Button variant="outline" disabled={true}>Sign In ( Disabled )</Button>
            </Link>
        </header>
  );
}