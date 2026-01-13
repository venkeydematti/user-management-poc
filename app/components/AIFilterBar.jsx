import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AIFilterBar({ onApply }){
    const [input, setInput] = useState("");

    const handleApply = () => {
        if (!input.trim()) return;
        console.log("Applying AI filter with input:", input);
        onApply(input);
    }

    return (
        <div className="flex items-center gap-2 py-10">   
        <Input type="text" placeholder="Example: 'groceries under 400' or 'chicken below 100..." 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleApply()}
        />
        <Button variant="outline" onClick={handleApply} disabled={!input.trim()}>AI Filter</Button></div>
    )
}