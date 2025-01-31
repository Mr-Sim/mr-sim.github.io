import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { useLag } from './LagContext';

export function LagController() {
  const { lagValue, setLagValue, isEnabled, setIsEnabled } = useLag();

  const handleIncrement = () => {
    setLagValue(prev => Math.min(prev + 1, 100));
  };

  const handleDecrement = () => {
    setLagValue(prev => Math.max(prev - 1, 0));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setLagValue(Math.max(0, Math.min(value, 100)));
    }
  };

  return (
    <div className="absolute bottom-10 right-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm p-2 rounded-lg">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={(e) => setIsEnabled(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-white text-sm">Lag</span>
      </label>
      
      <div className="flex items-center gap-1">
        <button
          onClick={handleDecrement}
          disabled={lagValue === 0}
          className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-50"
        >
          <Minus className="w-4 h-4 text-white" />
        </button>
        
        <input
          type="number"
          value={lagValue}
          onChange={handleInputChange}
          min="0"
          max="100"
          className="w-12 bg-white/10 text-white text-center rounded px-1 py-0.5"
        />
        
        <button
          onClick={handleIncrement}
          disabled={lagValue === 100}
          className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-50"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}