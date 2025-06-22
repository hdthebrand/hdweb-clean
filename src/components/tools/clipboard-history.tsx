'use client';
import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ClipboardHistory() {
  const [history, setHistory] = useLocalStorage<string[]>('clipboard-history', []);
  const { toast } = useToast();

  useEffect(() => {
    const handleCopy = () => {
      setTimeout(async () => {
        try {
          if (navigator.clipboard.readText) {
            const text = await navigator.clipboard.readText();
            if (text && !history.includes(text)) {
              setHistory(prev => [text, ...prev.slice(0, 49)]);
            }
          }
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
      }, 100);
    };

    document.addEventListener('copy', handleCopy);
    return () => document.removeEventListener('copy', handleCopy);
  }, [history, setHistory]);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      description: `"${text.substring(0, 20)}..." has been copied.`,
    });
  };
  
  const clearHistory = () => {
    setHistory([]);
    toast({
      title: 'Clipboard history cleared.',
    });
  }

  return (
    <div className="space-y-4">
        <div className='flex justify-between items-center'>
            <p className='text-sm text-muted-foreground'>Your last 50 copied items are stored locally.</p>
            <Button variant="destructive" size="sm" onClick={clearHistory} disabled={history.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear History
            </Button>
        </div>
        <ScrollArea className="h-96 w-full rounded-md border p-4">
            {history.length > 0 ? (
            <ul className="space-y-2">
                {history.map((item, index) => (
                <li key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <pre className="text-sm truncate mr-4 flex-1">{item}</pre>
                    <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(item)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </li>
                ))}
            </ul>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Your clipboard history is empty. Try copying some text!</p>
                </div>
            )}
        </ScrollArea>
    </div>
  );
}
