import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom" // Added useNavigate

export default function SwapData() {
  const [jsonInput, setJsonInput] = useState("");
  const navigate = useNavigate(); // This allows us to redirect the user

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      localStorage.setItem("PRODUCT_WEIGHTS", JSON.stringify(parsed));
      alert("Weights updated successfully!");
      navigate("/"); // Send them back to the calculator to see the changes
    } catch (e) {
      alert("Invalid JSON! Check your quotes and braces.");
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure? This will delete your custom data and return to the factory defaults.")) {
      localStorage.removeItem("PRODUCT_WEIGHTS");
      alert("Weights reset to default.");
      navigate("/");
    }
  };

  return (
    <div className="jetbrains-mono p-10 flex flex-col gap-4 relative min-h-svh bg-background text-foreground">
      <h1 className="text-xl font-bold">Data Swap</h1>
      
      <p className="text-sm text-muted-foreground">
        Paste your new JSON weights object here to override the system defaults.
      </p>

      <textarea 
        className="w-full border rounded-md p-4 h-64 bg-transparent jetbrains-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder='{"240x60": 1, "custom-item": 5}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      
      <div className="flex gap-3">
        <Button onClick={handleSave} className="custom-btn bg-primary text-primary-foreground">
          Save Custom Weights
        </Button>

        {/* The Reset Button */}
        <Button 
          onClick={handleReset} 
          variant="outline" 
          className="jetbrains-mono border-red-500 text-red-500 hover:bg-red-50"
        >
          Reset to Defaults
        </Button>
      </div>
      
      <div className="mt-8 text-sm text-muted-foreground border-t pt-4">
        <p className="font-bold mb-2">JSON Rules:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Keys must be <strong>lowercase</strong> (e.g., "16 pack")</li>
          <li>Strings must use <strong>double quotes</strong> (e.g., "key")</li>
          <li>Numbers should <strong>not</strong> have quotes (e.g., 1.5)</li>
        </ul>
      </div>

      <Link to="/" className="absolute bottom-4 right-4 text-xs text-muted-foreground hover:underline">
        Cancel and Go Back
      </Link>
    </div>
  );
}
