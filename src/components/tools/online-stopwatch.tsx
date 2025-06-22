'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, History, Redo } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const formatTime = (time: number) => {
  const milliseconds = `00${time % 1000}`.slice(-3, -1);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / (1000 * 60)) % 60}`.slice(-2);
  return `${minutes}:${seconds}.${milliseconds}`;
};

export default function OnlineStopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    } else {
      if(timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if(timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, time]);

  const handleStartStop = () => setIsRunning(!isRunning);
  
  const handleLap = () => {
    setLaps(prevLaps => [time, ...prevLaps]);
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="font-mono text-7xl sm:text-8xl md:text-9xl text-center tracking-tighter w-full bg-muted p-6 rounded-lg">
        {formatTime(time)}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleStartStop} size="lg" className="w-32">
          {isRunning ? <><Pause className="mr-2 h-5 w-5" />Pause</> : <><Play className="mr-2 h-5 w-5" />Start</>}
        </Button>
        <Button onClick={handleLap} size="lg" variant="outline" disabled={!isRunning && time === 0} className="w-32">
          <History className="mr-2 h-5 w-5" />Lap
        </Button>
        <Button onClick={handleReset} size="lg" variant="destructive" disabled={!isRunning && time === 0} className="w-32">
          <Redo className="mr-2 h-5 w-5" />Reset
        </Button>
      </div>
      {laps.length > 0 && (
        <ScrollArea className="h-60 w-full max-w-sm rounded-md border">
          <ul className="p-4 space-y-2">
            {laps.map((lap, index) => (
              <li key={index} className="flex justify-between items-center p-2 rounded-md bg-muted/50 font-mono text-sm">
                <span>Lap {laps.length - index}</span>
                <span>{formatTime(lap - (laps[index + 1] || 0))}</span>
                <span>{formatTime(lap)}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}
