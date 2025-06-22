'use client';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Note: These are mock exchange rates for demonstration purposes.
const rates: { [key: string]: number } = {
  USD: 1,       // US Dollar
  EUR: 0.92,    // Euro
  JPY: 157.25,  // Japanese Yen
  GBP: 0.79,    // British Pound
  AUD: 1.50,    // Australian Dollar
  CAD: 1.37,    // Canadian Dollar
  CHF: 0.90,    // Swiss Franc
  CNY: 7.25,    // Chinese Yuan
  INR: 83.50,   // Indian Rupee
  AED: 3.67,    // UAE Dirham
};

const currencyData = [
    { code: 'USD', name: 'United States Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'GBP', name: 'British Pound Sterling' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'AED', name: 'UAE Dirham' },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const convertedAmount = useMemo(() => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return '';

    const amountInUSD = numAmount / rates[fromCurrency];
    const result = amountInUSD * rates[toCurrency];
    
    return result.toFixed(2);
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full space-y-2">
        <Label>From</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1.00"
        />
        <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger>
            <SelectContent>
                {currencyData.map(c => <SelectItem key={c.code} value={c.code}>{c.code} - {c.name}</SelectItem>)}
            </SelectContent>
        </Select>
      </div>
      <div className="pt-8">
        <Button variant="ghost" size="icon" onClick={handleSwap} aria-label="Swap currencies">
          <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
        </Button>
      </div>
      <div className="w-full space-y-2">
        <Label>To</Label>
         <Input
          value={convertedAmount}
          readOnly
          className='font-semibold text-lg'
        />
        <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger>
            <SelectContent>
                {currencyData.map(c => <SelectItem key={c.code} value={c.code}>{c.code} - {c.name}</SelectItem>)}
            </SelectContent>
        </Select>
      </div>
    </div>
  );
}
