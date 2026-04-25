import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"

// The same defaults used in App.tsx
const DEFAULT_WEIGHTS = {
  "240x60": 1,
  "280x60": 1,
  "16 pack": 4,
  "12 pack": 3,
  "120x60": 0.5,
  "60x60": 0.25,
  "2.9m cladding": 0.6 
};

export default function SwapData() {
  const [jsonInput, setJsonInput] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      localStorage.setItem("PRODUCT_WEIGHTS", JSON.stringify(parsed));
      alert("Weights updated successfully!");
      navigate("/");
    } catch (e) {
      alert("Invalid JSON! Please check your commas and quotes.");
    }
  };

  // NEW: This loads the defaults into the text area for editing
  const handleLoadDefaults = () => {
    setJsonInput(JSON.stringify(DEFAULT_WEIGHTS, null, 2));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure? This will delete your custom data and return to the factory defaults.")) {
      localStorage.removeItem("PRODUCT_WEIGHTS");
      setJsonInput(""); // Clear the box
      alert("Weights reset to default.");
      navigate("/");
    }
  };

  return (
    <div className="jetbrains-mono p-10 flex flex-col gap-4 relative min-h-svh bg-background text-foreground">
      <h1 className="text-xl font-bold">Data Swap</h1>
      
      <p className="text-sm text-muted-foreground">
        Paste your new JSON weights object here. Use the button below to start with the defaults.
      </p>

      <textarea 
        className="w-full border rounded-md p-4 h-80 bg-transparent jetbrains-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder='Click "Load Defaults" to see the format...'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      
      <div className="flex flex-wrap gap-3">
        {/* Load Defaults Button */}
        <Button onClick={handleLoadDefaults} variant="secondary" className="jetbrains-mono">
          Load Defaults for Editing
        </Button>

        <Button onClick={handleSave} className="custom-btn bg-primary text-primary-foreground">
          Save Custom Weights
        </Button>

        <Button 
          onClick={handleReset} 
          variant="outline" 
          className="jetbrains-mono border-red-500 text-red-500 hover:bg-red-50"
        >
          Reset to Factory
        </Button>
      </div>
      
      <div className="mt-8 text-sm text-muted-foreground border-t pt-4">
        <p className="font-bold mb-2 text-yellow-600">Editing Tip:</p>
        <p>After clicking <strong>Load Defaults</strong>, you can change the numbers or add new products. Just make sure to keep the <code>"key": value</code> format exactly as it appears.</p>
      </div>

      <Link to="/" className="absolute bottom-4 right-4 text-xs text-muted-foreground hover:underline">
        Back to Calculator
      </Link>
    </div>
  );
}
