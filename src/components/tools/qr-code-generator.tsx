'use client';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://firebase.google.com/');
  const [qrSrc, setQrSrc] = useState('');
  const { toast } = useToast();

  const generateQrCode = () => {
    if (text.trim() === '') {
      toast({
        title: 'Input needed',
        description: 'Please enter some text to generate a QR code.',
        variant: 'destructive',
      });
      setQrSrc('');
      return;
    }
    setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=256x256&bgcolor=f0f4ef&color=000000`);
  };

  const handleDownload = async () => {
    if (!qrSrc) return;
    try {
        const response = await fetch(qrSrc);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'qrcode.png');
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast({ title: 'Success', description: 'QR Code downloaded.' });
    } catch (error) {
        toast({ title: 'Error', description: 'Failed to download QR Code.', variant: 'destructive' });
    }
  };
  
  // Generate QR on initial render
  useState(generateQrCode);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL"
          className="flex-1"
        />
        <Button onClick={generateQrCode} className="w-full sm:w-auto">Generate QR Code</Button>
      </div>

      {qrSrc && (
        <div className="flex flex-col items-center gap-4 pt-4 border-t">
          <div className="p-4 bg-white rounded-lg shadow-md inline-block">
             <Image src={qrSrc} alt="Generated QR Code" width={256} height={256} />
          </div>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PNG
          </Button>
        </div>
      )}
    </div>
  );
}
