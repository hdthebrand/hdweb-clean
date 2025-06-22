'use client';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export default function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState('1');

  const result = useMemo(() => {
    const billAmount = parseFloat(bill);
    const numPeople = parseInt(people, 10);

    if (billAmount > 0 && numPeople > 0) {
      const tipAmount = billAmount * (tipPercent / 100);
      const totalAmount = billAmount + tipAmount;
      const tipPerPerson = tipAmount / numPeople;
      const totalPerPerson = totalAmount / numPeople;
      return { tipAmount, totalAmount, tipPerPerson, totalPerPerson };
    }
    return null;
  }, [bill, tipPercent, people]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="bill">Bill Amount ($)</Label>
          <Input id="bill" type="number" value={bill} onChange={e => setBill(e.target.value)} placeholder="0.00" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="tip">Tip Percentage</Label>
            <span className="font-semibold text-primary">{tipPercent}%</span>
          </div>
          <Slider id="tip" min={0} max={50} step={1} value={[tipPercent]} onValueChange={(value) => setTipPercent(value[0])} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="people">Number of People</Label>
          <Input id="people" type="number" min="1" value={people} onChange={e => setPeople(e.target.value)} placeholder="1" />
        </div>
      </div>
      
      <div className="p-6 rounded-lg bg-muted space-y-4">
        <div className="flex justify-between items-baseline">
          <p className="text-muted-foreground">Tip Amount</p>
          <p className="text-2xl font-bold text-primary">{result ? formatCurrency(result.tipAmount) : '$0.00'}</p>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold text-primary">{result ? formatCurrency(result.totalAmount) : '$0.00'}</p>
        </div>
        <div className="pt-4 border-t">
          <div className="flex justify-between items-baseline">
            <p className="text-muted-foreground">Tip Per Person</p>
            <p className="text-xl font-semibold">{result ? formatCurrency(result.tipPerPerson) : '$0.00'}</p>
          </div>
          <div className="flex justify-between items-baseline">
            <p className="text-muted-foreground">Total Per Person</p>
            <p className="text-xl font-semibold">{result ? formatCurrency(result.totalPerPerson) : '$0.00'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
