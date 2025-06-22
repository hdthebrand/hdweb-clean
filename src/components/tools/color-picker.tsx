'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export default function ColorPicker() {
  const [color, setColor] = useState('#94B49F');
  const { toast } = useToast();

  const rgbColor = hexToRgb(color);
  const rgbString = rgbColor ? `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})` : '';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Color Copied!',
      description: `${text} has been copied to your clipboard.`,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
      <div className="relative">
        <div 
          className="w-48 h-48 rounded-full border-8 border-background shadow-lg" 
          style={{ backgroundColor: color }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="w-full sm:w-64 space-y-4">
        <div>
          <Label htmlFor="hex-color">Hex</Label>
          <div className="flex items-center gap-2">
            <Input id="hex-color" value={color} readOnly />
            <Button variant="outline" size="icon" onClick={() => handleCopy(color)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="rgb-color">RGB</Label>
          <div className="flex items-center gap-2">
            <Input id="rgb-color" value={rgbString} readOnly />
            <Button variant="outline" size="icon" onClick={() => handleCopy(rgbString)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
