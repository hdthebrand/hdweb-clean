'use client';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Textarea } from '@/components/ui/textarea';

export default function OnlineNotepad() {
  const [text, setText] = useLocalStorage('online-notepad', '');

  return (
    <div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing your notes here... Everything is saved automatically."
        className="min-h-[60vh] text-base"
        aria-label="Online Notepad"
      />
    </div>
  );
}
