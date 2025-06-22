'use client';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(term);

    if (p > 0 && r > 0 && t > 0) {
      const interest = p * r * t;
      const totalPayment = p + interest;
      return { interest, totalPayment };
    }
    return null;
  }, [principal, rate, term]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="principal">Loan Amount ($)</Label>
          <Input id="principal" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="e.g. 10000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">Annual Interest Rate (%)</Label>
          <Input id="rate" type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 5" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="term">Loan Term (Years)</Label>
          <Input id="term" type="number" value={term} onChange={e => setTerm(e.target.value)} placeholder="e.g. 3" />
        </div>
      </div>
      
      {result && (
        <div className="p-6 rounded-lg bg-muted grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-medium text-muted-foreground">Total Simple Interest</h3>
            <p className="text-4xl font-bold text-primary">{formatCurrency(result.interest)}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-muted-foreground">Total Payment</h3>
            <p className="text-4xl font-bold text-primary">{formatCurrency(result.totalPayment)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
