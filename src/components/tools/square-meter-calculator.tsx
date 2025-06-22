'use client';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Unit = 'm' | 'cm' | 'mm' | 'ft' | 'in';
type CalcMode = 'area' | 'areaPer2mm';

const conversionFactorsToMeters: { [key in Unit]: number } = {
  m: 1,
  cm: 0.01,
  mm: 0.001,
  ft: 0.3048,
  in: 0.0254,
};

const conversionFactorsToMM: { [key in Unit]: number } = {
  m: 1000,
  cm: 10,
  mm: 1,
  ft: 304.8,
  in: 25.4,
};

const unitData = [
    { value: 'm', label: 'Meters (m)' },
    { value: 'cm', label: 'Centimeters (cm)' },
    { value: 'mm', label: 'Millimeters (mm)' },
    { value: 'ft', label: 'Feet (ft)' },
    { value: 'in', label: 'Inches (in)' },
];

export default function SquareMeterCalculator() {
  const [mode, setMode] = useState<CalcMode>('area');
  
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [quantity, setQuantity] = useState('1');
  
  const [lengthUnit, setLengthUnit] = useState<Unit>('mm');
  const [widthUnit, setWidthUnit] = useState<Unit>('mm');
  const [thicknessUnit, setThicknessUnit] = useState<Unit>('mm');

  const result = useMemo(() => {
    const numLength = parseFloat(length);
    const numWidth = parseFloat(width);
    const numQuantity = parseInt(quantity) || 1;

    if (isNaN(numLength) || isNaN(numWidth)) return null;

    let calculatedResult: number | null = null;

    if (mode === 'area') {
      const lengthInMeters = numLength * conversionFactorsToMeters[lengthUnit];
      const widthInMeters = numWidth * conversionFactorsToMeters[widthUnit];
      calculatedResult = lengthInMeters * widthInMeters;
    }

    if (mode === 'areaPer2mm') {
      const numThickness = parseFloat(thickness);
      if (isNaN(numThickness)) return null;
      
      const lengthInMM = numLength * conversionFactorsToMM[lengthUnit];
      const widthInMM = numWidth * conversionFactorsToMM[widthUnit];
      const thicknessInMM = numThickness * conversionFactorsToMM[thicknessUnit];
      
      calculatedResult = (lengthInMM * widthInMM * thicknessInMM) / 2000000;
    }

    if (calculatedResult === null) return null;

    return calculatedResult * numQuantity;
  }, [length, width, thickness, quantity, lengthUnit, widthUnit, thicknessUnit, mode]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Calculation Type</Label>
        <RadioGroup value={mode} onValueChange={(v) => setMode(v as CalcMode)} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="area" id="area" />
            <Label htmlFor="area">Area (L x W)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="areaPer2mm" id="areaPer2mm" />
            <Label htmlFor="areaPer2mm">Area per 2mm</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="length">Length</Label>
            <div className="flex gap-2">
                <Input id="length" type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g. 10" />
                <Select value={lengthUnit} onValueChange={(v) => setLengthUnit(v as Unit)}>
                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {unitData.map(u => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <div className="flex gap-2">
                <Input id="width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g. 5" />
                 <Select value={widthUnit} onValueChange={(v) => setWidthUnit(v as Unit)}>
                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {unitData.map(u => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        </div>
        {mode === 'areaPer2mm' && (
             <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="thickness">Thickness</Label>
                <div className="flex gap-2">
                    <Input id="thickness" type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} placeholder="e.g. 20" />
                    <Select value={thicknessUnit} onValueChange={(v) => setThicknessUnit(v as Unit)}>
                        <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {unitData.map(u => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        )}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input id="quantity" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="1" />
        </div>
      </div>

      {result !== null && (
        <div className="p-6 rounded-lg bg-muted text-center">
            <h3 className="text-lg font-medium text-muted-foreground">Result</h3>
            <p className="text-4xl font-bold text-primary">
                {result.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 7})} 
                <span> m&sup2;</span>
            </p>
        </div>
      )}
    </div>
  );
}
