'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft } from 'lucide-react';

const toRoman = (num: number): string => {
  if (isNaN(num) || num < 1 || num > 3999) return '';
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syb = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let roman = "";
  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      roman += syb[i];
      num -= val[i];
    }
  }
  return roman;
};

const fromRoman = (str: string): number | string => {
    const romanMap: { [key: string]: number } = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    str = str.toUpperCase();
    let number = 0;
    for (let i = 0; i < str.length; i++) {
        if (!romanMap[str[i]]) return '';
        const current = romanMap[str[i]];
        const next = romanMap[str[i + 1]];
        if (next && current < next) {
            number -= current;
        } else {
            number += current;
        }
    }
    // Very basic validation
    if (toRoman(number) !== str) return '';
    return number;
};


export default function RomanNumeralConverter() {
  const [number, setNumber] = useState('');
  const [roman, setRoman] = useState('');

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumber(value);
    setRoman(toRoman(parseInt(value, 10)));
  };

  const handleRomanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setRoman(value);
    const result = fromRoman(value);
    setNumber(typeof result === 'number' ? result.toString() : '');
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full space-y-2">
        <Label htmlFor="number">Number</Label>
        <Input
          id="number"
          type="number"
          value={number}
          onChange={handleNumberChange}
          placeholder="e.g. 2024"
        />
      </div>
      <div className="pt-6">
        <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="w-full space-y-2">
        <Label htmlFor="roman">Roman Numeral</Label>
        <Input
          id="roman"
          value={roman}
          onChange={handleRomanChange}
          placeholder="e.g. MMXXIV"
          className="uppercase"
        />
      </div>
    </div>
  );
}
