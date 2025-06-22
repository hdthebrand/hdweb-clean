'use client';
import { useState } from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, format, isValid } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export default function AgeCalculator() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (date && isValid(date)) {
      const now = new Date();
      if (date > now) {
        setAge(null);
        return;
      }

      const years = differenceInYears(now, date);
      let months = differenceInMonths(now, date) % 12;
      
      let tempDate = new Date(date);
      tempDate.setFullYear(tempDate.getFullYear() + years);
      tempDate.setMonth(tempDate.getMonth() + months);
      
      let days = differenceInDays(now, tempDate);

      if (days < 0) {
        months -= 1;
        if (months < 0) {
          months = 11;
        }
        tempDate = new Date(date);
        tempDate.setFullYear(tempDate.getFullYear() + years);
        tempDate.setMonth(tempDate.getMonth() + months);
        days = differenceInDays(now, tempDate);
      }
      
      setAge({ years, months, days });
    } else {
      setAge(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full sm:w-[280px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick your date of birth</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              captionLayout="dropdown-buttons"
              fromYear={1900}
              toYear={new Date().getFullYear()}
            />
          </PopoverContent>
        </Popover>
        <Button onClick={calculateAge} className="w-full sm:w-auto">Calculate Age</Button>
      </div>

      {age !== null && (
        <div className="p-6 rounded-lg bg-muted text-center">
          <h3 className="text-lg font-medium text-muted-foreground">Your Age Is</h3>
          <p className="text-4xl font-bold text-primary">
            {age.years} <span className="text-2xl font-medium text-foreground">years,</span>{' '}
            {age.months} <span className="text-2xl font-medium text-foreground">months, &</span>{' '}
            {age.days} <span className="text-2xl font-medium text-foreground">days</span>
          </p>
        </div>
      )}
    </div>
  );
}
