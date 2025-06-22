'use client';
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const charSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
};

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    const selectedOptions = Object.keys(options).filter(key => options[key as keyof typeof options]);
    if (selectedOptions.length === 0) {
      toast({
        title: 'Uh oh!',
        description: 'Please select at least one character set.',
        variant: 'destructive',
      });
      return;
    }

    let charset = '';
    selectedOptions.forEach(opt => {
      charset += charSets[opt as keyof typeof charSets];
    });

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  }, [length, options, toast]);
  
  const handleCopyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({
        title: 'Password Copied!',
        description: 'Your new password has been copied to the clipboard.',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Input readOnly value={password} placeholder="Click 'Generate' to create a password" className="text-lg font-mono flex-1 h-12" />
        <Button variant="outline" size="icon" onClick={handleCopyToClipboard} disabled={!password}>
          <Copy className="h-5 w-5" />
        </Button>
        <Button size="icon" onClick={generatePassword}>
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <Label htmlFor="length">Password Length</Label>
            <span className="text-lg font-semibold text-primary">{length}</span>
        </div>
        <Slider id="length" min={8} max={64} step={1} value={[length]} onValueChange={(value) => setLength(value[0])} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(charSets).map((key) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={key}
              checked={options[key as keyof typeof options]}
              onCheckedChange={(checked) =>
                setOptions(prev => ({ ...prev, [key]: checked }))
              }
            />
            <Label htmlFor={key} className="capitalize text-sm cursor-pointer">{key}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
