'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TextToSpeech() {
  const [text, setText] = useState('Hello! Welcome to HD Web Tools. You can convert any text into speech here.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        setSelectedVoice(availableVoices.find(v => v.default)?.name || availableVoices[0].name);
      }
    };
    
    // Voices are loaded asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    }
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) {
        toast({ title: 'Text is empty', description: 'Please enter some text to speak.', variant: 'destructive' });
        return;
    }
    
    if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsSpeaking(true);
        return;
    }
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
    };
    utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
    };
    utterance.onerror = () => {
        toast({ title: 'Error', description: 'Could not play audio.', variant: 'destructive' });
        setIsSpeaking(false);
        setIsPaused(false);
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsSpeaking(false);
  };
  
  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div className="space-y-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to speech..."
        className="min-h-[20vh]"
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedVoice} onValueChange={setSelectedVoice}>
          <SelectTrigger className="w-full sm:w-[280px]">
            <SelectValue placeholder="Select a voice" />
          </SelectTrigger>
          <SelectContent>
            {voices.map((voice) => (
              <SelectItem key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex-1 flex gap-2">
            {!isSpeaking && !isPaused ? (
                <Button onClick={handleSpeak} className='w-full'><Play className="mr-2 h-4 w-4" />Speak</Button>
            ) : null}
            {isSpeaking && !isPaused ? (
                <Button onClick={handlePause} className='w-full'><Pause className="mr-2 h-4 w-4" />Pause</Button>
            ) : null}
             {isPaused ? (
                <Button onClick={handleSpeak} className='w-full'><Play className="mr-2 h-4 w-4" />Resume</Button>
            ) : null}
             {(isSpeaking || isPaused) && (
                <Button variant="destructive" onClick={handleStop} className='w-full'><Square className="mr-2 h-4 w-4" />Stop</Button>
             )}
        </div>
      </div>
    </div>
  );
}
