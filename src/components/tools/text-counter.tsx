'use client';
import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';

export default function TextCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const characters = text.length;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 0;
    const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '').length;
    return { characters, words, sentences, paragraphs };
  }, [text]);

  return (
    <div className="space-y-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here to count..."
        className="min-h-[40vh]"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Characters</p>
          <p className="text-3xl font-bold text-primary">{stats.characters}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Words</p>
          <p className="text-3xl font-bold text-primary">{stats.words}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Sentences</p>
          <p className="text-3xl font-bold text-primary">{stats.sentences}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Paragraphs</p>
          <p className="text-3xl font-bold text-primary">{stats.paragraphs}</p>
        </div>
      </div>
    </div>
  );
}
