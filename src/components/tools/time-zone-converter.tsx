'use client';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const timeZones = [
  'UTC', 'GMT', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Australia/Sydney'
];

export default function TimeZoneConverter() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fromZone, setFromZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [toZone, setToZone] = useState('UTC');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timeZone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(date);
    } catch (e) {
      return 'Invalid Time Zone';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-muted">
            <Label className='text-muted-foreground'>Your Local Time</Label>
            <p className="text-2xl font-semibold text-primary">{formatTime(currentTime, fromZone)}</p>
            <p className="text-sm text-muted-foreground">{fromZone}</p>
        </div>
        <div className="p-6 rounded-lg bg-muted">
            <Label htmlFor="to-zone" className='text-muted-foreground'>Converted Time</Label>
            <p className="text-2xl font-semibold text-primary">{formatTime(currentTime, toZone)}</p>
             <Select value={toZone} onValueChange={setToZone}>
                <SelectTrigger id="to-zone" className="w-full mt-1">
                    <SelectValue placeholder="Select a time zone" />
                </SelectTrigger>
                <SelectContent>
                    {timeZones.map((tz) => (
                    <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    </div>
  );
}
