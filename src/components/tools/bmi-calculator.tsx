'use client';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function BmiCalculator() {
  const [unit, setUnit] = useState('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightIn, setHeightIn] = useState('');

  const bmi = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const hIn = parseFloat(heightIn);

    if (unit === 'metric' && h > 0 && w > 0) {
      return w / (h / 100) ** 2;
    }
    if (unit === 'imperial' && h > 0 && w > 0) {
      const totalHeightInInches = h * 12 + (hIn || 0);
      if (totalHeightInInches > 0) {
        return (w / totalHeightInInches ** 2) * 703;
      }
    }
    return null;
  }, [height, weight, heightIn, unit]);

  const bmiCategory = useMemo(() => {
    if (bmi === null) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obesity';
  }, [bmi]);

  return (
    <div className="space-y-6">
      <RadioGroup defaultValue="metric" onValueChange={setUnit} className="flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="metric" id="metric" />
          <Label htmlFor="metric">Metric (cm, kg)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="imperial" id="imperial" />
          <Label htmlFor="imperial">Imperial (ft, in, lbs)</Label>
        </div>
      </RadioGroup>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {unit === 'metric' ? (
          <div className="space-y-2">
            <Label htmlFor="height-cm">Height (cm)</Label>
            <Input id="height-cm" type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 175" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="height-ft">Height (ft)</Label>
              <Input id="height-ft" type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height-in">Height (in)</Label>
              <Input id="height-in" type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} placeholder="e.g. 9" />
            </div>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="weight">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Label>
          <Input id="weight" type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder={unit === 'metric' ? "e.g. 70" : "e.g. 154"} />
        </div>
      </div>
      
      {bmi !== null && (
        <div className="p-6 rounded-lg bg-muted text-center">
            <h3 className="text-lg font-medium text-muted-foreground">Your BMI is</h3>
            <p className="text-4xl font-bold text-primary">{bmi.toFixed(1)}</p>
            <p className="text-lg font-medium">{bmiCategory}</p>
        </div>
      )}
    </div>
  );
}
