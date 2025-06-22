'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, Redo } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function OnlineTimer() {
  const [initialTime, setInitialTime] = useState({ h: 0, m: 5, s: 0 });
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [totalTime, setTotalTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        audioRef.current = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3');
    }
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      audioRef.current?.play();
    }
    return () => {
      if(timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleInputChange = (field: 'h' | 'm' | 's', value: string) => {
    if (isRunning) return;
    const numValue = parseInt(value, 10) || 0;
    const newInitialTime = { ...initialTime, [field]: numValue };
    setInitialTime(newInitialTime);
    const newTotalSeconds = newInitialTime.h * 3600 + newInitialTime.m * 60 + newInitialTime.s;
    setTimeLeft(newTotalSeconds);
    setTotalTime(newTotalSeconds);
  };
  
  const handleStartPause = () => {
    if (timeLeft > 0) {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    const newTotalSeconds = initialTime.h * 3600 + initialTime.m * 60 + initialTime.s;
    setTimeLeft(newTotalSeconds);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-4 items-center">
        <Input type="number" min="0" value={initialTime.h} onChange={e => handleInputChange('h', e.target.value)} className="w-24 text-center text-lg" disabled={isRunning} aria-label="Hours" />
        <span>:</span>
        <Input type="number" min="0" max="59" value={initialTime.m} onChange={e => handleInputChange('m', e.target.value)} className="w-24 text-center text-lg" disabled={isRunning} aria-label="Minutes" />
        <span>:</span>
        <Input type="number" min="0" max="59" value={initialTime.s} onChange={e => handleInputChange('s', e.target.value)} className="w-24 text-center text-lg" disabled={isRunning} aria-label="Seconds" />
      </div>

      <div className="font-mono text-7xl sm:text-8xl md:text-9xl text-center tracking-tighter w-full bg-muted p-6 rounded-lg">
        {formatTime(timeLeft)}
      </div>
      
      <Progress value={(timeLeft / totalTime) * 100} className="w-full max-w-md" />

      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleStartPause} size="lg" className="w-32" disabled={totalTime === 0}>
          {isRunning ? <><Pause className="mr-2 h-5 w-5" />Pause</> : <><Play className="mr-2 h-5 w-5" />Start</>}
        </Button>
        <Button onClick={handleReset} size="lg" variant="destructive" className="w-32">
          <Redo className="mr-2 h-5 w-5" />Reset
        </Button>
      </div>
    </div>
  );
}
