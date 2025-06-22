'use client';
import { useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const isValidForBase = (value: string, base: number) => {
  if (value === '') return true;
  const validChars: { [key: number]: RegExp } = {
    2: /^[01]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9a-fA-F]+$/,
  };
  return validChars[base].test(value);
};

export default function BinaryConverter() {
  const [binary, setBinary] = useState('');
  const [decimal, setDecimal] = useState('');
  const [hex, setHex] = useState('');

  const handleBinaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidForBase(value, 2)) {
      setBinary(value);
      if (value) {
        const dec = parseInt(value, 2);
        setDecimal(dec.toString());
        setHex(dec.toString(16).toUpperCase());
      } else {
        setDecimal('');
        setHex('');
      }
    }
  };

  const handleDecimalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidForBase(value, 10)) {
      setDecimal(value);
      if (value) {
        const dec = parseInt(value, 10);
        setBinary(dec.toString(2));
        setHex(dec.toString(16).toUpperCase());
      } else {
        setBinary('');
        setHex('');
      }
    }
  };

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidForBase(value, 16)) {
      setHex(value);
      if (value) {
        const dec = parseInt(value, 16);
        setBinary(dec.toString(2));
        setDecimal(dec.toString());
      } else {
        setBinary('');
        setDecimal('');
      }
    }
  };

  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <Label htmlFor="decimal">Decimal</Label>
        <Input
          id="decimal"
          placeholder="e.g. 10"
          value={decimal}
          onChange={handleDecimalChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="binary">Binary</Label>
        <Input
          id="binary"
          placeholder="e.g. 1010"
          value={binary}
          onChange={handleBinaryChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hex">Hexadecimal</Label>
        <Input
          id="hex"
          placeholder="e.g. A"
          value={hex}
          onChange={handleHexChange}
          className="uppercase"
        />
      </div>
    </div>
  );
}
