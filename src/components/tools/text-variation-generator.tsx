'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { generateVariationsAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const initialState = {
  success: false,
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : <><Wand2 className="mr-2 h-4 w-4" /> Generate Variations</>}
    </Button>
  );
}

export default function TextVariationGenerator() {
  const [state, formAction] = useActionState(generateVariationsAction, initialState);
  const { toast } = useToast();
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="text">Your Text</Label>
          <Textarea id="text" name="text" rows={5} placeholder="Enter the text you want to transform..." required />
          {state.error?.text && <p className="text-sm text-destructive mt-1">{state.error.text[0]}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="numberOfVariations">Number of Variations</Label>
            <Input id="numberOfVariations" name="numberOfVariations" type="number" min="1" max="5" defaultValue="3" />
          </div>
          <div>
            <Label htmlFor="tone">Tone (Optional)</Label>
            <Input id="tone" name="tone" placeholder="e.g., Formal, Humorous" />
          </div>
          <div>
            <Label htmlFor="vocabulary">Vocabulary (Optional)</Label>
            <Input id="vocabulary" name="vocabulary" placeholder="e.g., Simple, Sophisticated" />
          </div>
        </div>
        <SubmitButton />
      </form>
      
      {state.success && state.data && (
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Generated Variations</h3>
          <div className="space-y-4">
            {(state.data as string[]).map((variation, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <p className="flex-grow">{variation}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(variation)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {state.success === false && typeof state.error === 'string' && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          <p>{state.error}</p>
        </div>
      )}
    </div>
  );
}
