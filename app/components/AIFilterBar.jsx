import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AIFilterBar({ onApply }){
    const [input, setInput] = useState("");
    
    // Enable button only if input has at least 3 non-space characters
  const isSearchEnabled = input.trim().length >= 3;
  console.log("isSearchEnabled", isSearchEnabled);

    const handleApply = () => {
        if (!isSearchEnabled) return; 
        console.log("Applying AI filter with input:", input);
        onApply(input);
    }

    const handleClear = () => {
      setInput("");
      onApply(""); // Clear the filters
    }

    const handleInputChange = (e) => {
      setInput(e.target.value);
      // Clear the filters if the input is empty
      if (!e.target.value.trim()) {
        onApply(""); // Clear the filters
      }
    };

    return (
        <div className="flex items-center gap-2 py-10 w-full max-w-xl">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Example: groceries under 400 or chicken below 100"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              className="pr-10"
            />
    
            {input && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
    
          <Button
            variant="outline"
            onClick={handleApply}
            disabled={!isSearchEnabled}
          >
            AI Filter
          </Button>
        </div>
      );
}