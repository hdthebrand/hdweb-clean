'use client';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft } from 'lucide-react';

const conversions = {
  length: {
    meters: 1,
    kilometers: 1000,
    centimeters: 0.01,
    miles: 1609.34,
    feet: 0.3048,
    inches: 0.0254,
  },
  weight: {
    grams: 1,
    kilograms: 1000,
    milligrams: 0.001,
    pounds: 453.592,
    ounces: 28.3495,
  },
  temperature: {
    // Special handling needed
  },
  area: {
    'square meters': 1,
    'square kilometers': 1000000,
    'square miles': 2589988.11,
    'square yards': 0.836127,
    'square feet': 0.092903,
    acres: 4046.86,
    hectares: 10000,
  },
  volume: {
    liters: 1,
    milliliters: 0.001,
    'cubic meters': 1000,
    gallons: 3.78541,
    quarts: 0.946353,
    pints: 0.473176,
    cups: 0.236588,
    'fluid ounces': 0.0295735,
  },
};

type ConversionCategory = keyof typeof conversions;
type StandardCategory = 'length' | 'weight' | 'area' | 'volume';


export default function UnitConverter() {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [fromUnit, setFromUnit] = useState(Object.keys(conversions.length)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(conversions.length)[1]);
  const [fromValue, setFromValue] = useState('1');
  
  const toValue = useMemo(() => {
    const fromVal = parseFloat(fromValue);
    if (isNaN(fromVal)) return '';

    if (category === 'temperature') {
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return ((fromVal * 9/5) + 32).toFixed(2);
      if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return ((fromVal - 32) * 5/9).toFixed(2);
      if (fromUnit === 'celsius' && toUnit === 'kelvin') return (fromVal + 273.15).toFixed(2);
      if (fromUnit === 'kelvin' && toUnit === 'celsius') return (fromVal - 273.15).toFixed(2);
      if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') return ((fromVal - 32) * 5/9 + 273.15).toFixed(2);
      if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') return ((fromVal - 273.15) * 9/5 + 32).toFixed(2);
      return fromValue;
    }

    const units = conversions[category as StandardCategory];
    const fromFactor = units[fromUnit as keyof typeof units];
    const toFactor = units[toUnit as keyof typeof units];
    
    const valueInBase = fromVal * fromFactor;
    const result = valueInBase / toFactor;
    return result % 1 !== 0 ? result.toFixed(5) : result.toString();
  }, [fromValue, fromUnit, toUnit, category]);

  const handleCategoryChange = (newCategory: ConversionCategory) => {
    setCategory(newCategory);
    const newUnits = Object.keys(newCategory === 'temperature' ? {celsius: '', fahrenheit: '', kelvin: ''} : conversions[newCategory as StandardCategory]);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1] || newUnits[0]);
  };

  const unitOptions = useMemo(() => {
    if (category === 'temperature') {
      return ['celsius', 'fahrenheit', 'kelvin'];
    }
    return Object.keys(conversions[category as StandardCategory]);
  }, [category]);

  return (
    <div className="space-y-6">
        <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(val) => handleCategoryChange(val as ConversionCategory)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="length">Length</SelectItem>
                    <SelectItem value="weight">Weight</SelectItem>
                    <SelectItem value="temperature">Temperature</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                    <SelectItem value="volume">Volume</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full space-y-2">
                <Label>From</Label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {unitOptions.map(unit => <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Input type="number" value={fromValue} onChange={e => setFromValue(e.target.value)} />
            </div>
            <div className="pt-10">
                <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="w-full space-y-2">
                <Label>To</Label>
                <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {unitOptions.map(unit => <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Input value={toValue} readOnly className='font-semibold' />
            </div>
        </div>
    </div>
  );
}
