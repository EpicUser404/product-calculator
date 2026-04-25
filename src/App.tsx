import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
// 1. Add BrowserRouter and Routes to your imports
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import SwapData from "./DataSwap" // Make sure this is imported!

const DEFAULT_WEIGHTS = {
  "240x60": 1,
  "280x60": 1,
  "16 pack": 4,
  "12 pack": 3,
  "120x60": 0.5,
  "60x60": 0.25,
  "2.9m cladding": 0.6 
};

// This is your Main Calculator View
function CalculatorView({ activeWeights }: { activeWeights: Record<string, number> }) {
  const [inputText, setInputText] = useState("");
  const [totalWeight, setTotalWeight] = useState<number | null>(null);
  const [outOf140, setOutOf140] = useState<number | null>(null);

  const handleCalculate = () => {
    const lines = inputText.split('\n');
    let sum = 0;
    lines.forEach((line: string) => {
      const [rawName, rawQty] = line.split('-');
      const name = rawName?.trim().toLowerCase();
      const quantity = rawQty ? parseFloat(rawQty.trim()) : 1;
      if (name && activeWeights[name]) {
        sum += activeWeights[name] * quantity;
      }
    });
    setTotalWeight(sum);
    setOutOf140((sum / 140) * 100);
  };

  return (
    <div className="jetbrains-mono flex min-h-svh p-6 bg-background text-foreground">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
            <textarea 
              className="jetbrains-mono w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
              placeholder={"240x60 - 5\n16 pack - 2"} 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
            />
            <Button className="jetbrains-mono custom-btn mt-2" onClick={handleCalculate}>
              Calculate Weight
            </Button>
            <p className="jetbrains-mono mt-4 font-medium">
              {totalWeight === null 
                ? "Waiting for input..." 
                : `Total Weight: ${totalWeight.toFixed(2)} panels (${outOf140?.toFixed(2)}% of 140 panels)`}
            </p>
            {outOf140 !== null && (
              <p className={`jetbrains-mono mt-2 font-bold ${outOf140 > 100 ? 'text-red-500' : 'text-green-500'}`}>
                {outOf140 > 100 ? "Warning: Van Overloaded!" : "Within Van Capacity"}
              </p>
            )}
        </div>
        <div className="text-xs text-muted-foreground">Format: <code>Product Name - Quantity</code></div>
      </div>
      {/* Link is now safe because it's inside the Router below */}
      <Link to="/swap-data" className="absolute bottom-4 right-4 text-xs text-muted-foreground hover:underline">Update Weight information.</Link>
    </div>
  );
}

// 2. This is the actual "App" that manages the Router
export default function App() {
  const [activeWeights, setActiveWeights] = useState<Record<string, number>>(DEFAULT_WEIGHTS);

  useEffect(() => {
    const saved = localStorage.getItem("PRODUCT_WEIGHTS");
    if (saved) {
      setActiveWeights(JSON.parse(saved));
    }
  }, []);

  return (
    <BrowserRouter>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
          .jetbrains-mono { font-family: 'JetBrains Mono', monospace; }
          .custom-btn { border: 1px solid #d4d4d8; border-radius: 6px; padding: 0.5rem 1rem; cursor: pointer; background: transparent; }
        `}
      </style>

      <Routes>
        <Route path="/" element={<CalculatorView activeWeights={activeWeights} />} />
        <Route path="/swap-data" element={<SwapData />} />
      </Routes>
    </BrowserRouter>
  )
}
