'use client';
import { useState } from 'react';
import { addDays, differenceInDays, format, isValid, subDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

export default function DateCalculator() {
  const [mode, setMode] = useState<'duration' | 'addsub'>('duration');

  // Duration mode state
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState<number | null>(null);

  // Add/Subtract mode state
  const [baseDate, setBaseDate] = useState<Date | undefined>(new Date());
  const [days, setDays] = useState('0');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [resultDate, setResultDate] = useState<string | null>(null);
  
  const calculateDuration = () => {
    if (fromDate && toDate && isValid(fromDate) && isValid(toDate)) {
      setDuration(differenceInDays(toDate, fromDate));
    } else {
      setDuration(null);
    }
  };

  const calculateDate = () => {
    if (baseDate && isValid(baseDate)) {
        const numDays = parseInt(days, 10);
        if(!isNaN(numDays)) {
            const newDate = operation === 'add' ? addDays(baseDate, numDays) : subDays(baseDate, numDays);
            setResultDate(format(newDate, 'PPP'));
        }
    } else {
        setResultDate(null);
    }
  };


  return (
    <div className="space-y-6">
      <RadioGroup value={mode} onValueChange={(value) => setMode(value as 'duration' | 'addsub')} className="flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="duration" id="duration" />
          <Label htmlFor="duration">Calculate Duration</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="addsub" id="addsub" />
          <Label htmlFor="addsub">Add/Subtract Days</Label>
        </div>
      </RadioGroup>
      <Separator />

      {mode === 'duration' ? (
        <div className="space-y-4">
            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex-1 space-y-2'>
                    <Label>From Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !fromDate && 'text-muted-foreground')}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {fromDate ? format(fromDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus /></PopoverContent>
                    </Popover>
                </div>
                <div className='flex-1 space-y-2'>
                    <Label>To Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !toDate && 'text-muted-foreground')}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {toDate ? format(toDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus /></PopoverContent>
                    </Popover>
                </div>
            </div>
            <Button onClick={calculateDuration} className="w-full">Calculate Duration</Button>
            {duration !== null && (
                <div className="p-6 rounded-lg bg-muted text-center">
                    <h3 className="text-lg font-medium text-muted-foreground">Difference is</h3>
                    <p className="text-4xl font-bold text-primary">{Math.abs(duration)} <span className="text-2xl font-medium text-foreground">days</span></p>
                </div>
            )}
        </div>
      ) : (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className='flex-1 space-y-2'>
                    <Label>Start Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !baseDate && 'text-muted-foreground')}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {baseDate ? format(baseDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={baseDate} onSelect={setBaseDate} initialFocus /></PopoverContent>
                    </Popover>
                </div>
                <RadioGroup value={operation} onValueChange={(value) => setOperation(value as 'add' | 'subtract')} className="flex gap-4 pb-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="add" id="add" /><Label htmlFor="add">Add</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="subtract" id="subtract" /><Label htmlFor="subtract">Subtract</Label></div>
                </RadioGroup>
                <div className='space-y-2'>
                    <Label>Days</Label>
                    <Input type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="e.g. 30" />
                </div>
            </div>
          <Button onClick={calculateDate} className="w-full">Calculate Date</Button>
          {resultDate && (
            <div className="p-6 rounded-lg bg-muted text-center">
                <h3 className="text-lg font-medium text-muted-foreground">Resulting Date is</h3>
                <p className="text-4xl font-bold text-primary">{resultDate}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
