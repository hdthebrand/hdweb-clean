'use client';
import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Download, FileText, Trash2 } from 'lucide-react';

export default function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [ranges, setRanges] = useState('');
  const [splitPdfs, setSplitPdfs] = useState<{ name: string; bytes: Uint8Array }[]>([]);
  const { toast } = useToast();

  const processFile = useCallback(async (selectedFile: File | undefined) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setSplitPdfs([]);
      setRanges('');
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setPageCount(pdfDoc.getPageCount());
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to load PDF.' });
        setFile(null);
        setPageCount(0);
      }
    } else if (selectedFile) {
      toast({ variant: 'destructive', title: 'Invalid File', description: 'Please select a PDF file.' });
    }
  }, [toast]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0]);
  };
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    processFile(e.dataTransfer.files?.[0]);
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);


  const handleSplit = async () => {
    if (!file || !ranges) {
      toast({ variant: 'destructive', title: 'Missing Information', description: 'Please select a file and enter page ranges.' });
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const newPdfs: { name: string; bytes: Uint8Array }[] = [];

      const rangeGroups = ranges.split(',').map(r => r.trim());

      for (const group of rangeGroups) {
        const newPdf = await PDFDocument.create();
        const pagesToCopy: number[] = [];

        if (group.includes('-')) {
          const [start, end] = group.split('-').map(Number);
          if (!isNaN(start) && !isNaN(end) && start <= end && start > 0 && end <= pageCount) {
            for (let i = start; i <= end; i++) {
              pagesToCopy.push(i - 1);
            }
          }
        } else {
          const pageNum = Number(group);
          if (!isNaN(pageNum) && pageNum > 0 && pageNum <= pageCount) {
            pagesToCopy.push(pageNum - 1);
          }
        }
        
        if(pagesToCopy.length > 0) {
          const copiedPages = await newPdf.copyPages(originalPdf, pagesToCopy);
          copiedPages.forEach(page => newPdf.addPage(page));
          
          const pdfBytes = await newPdf.save();
          newPdfs.push({ name: `${file.name.replace('.pdf', '')}-split-${group}.pdf`, bytes: pdfBytes });
        }
      }

      if (newPdfs.length > 0) {
        setSplitPdfs(newPdfs);
        toast({ title: 'Success', description: 'PDF split successfully.' });
      } else {
        toast({ variant: 'destructive', title: 'Invalid Ranges', description: 'No valid pages found for the given ranges.' });
      }

    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'An error occurred while splitting the PDF.' });
    }
  };

  const downloadPdf = (bytes: Uint8Array, name: string) => {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const reset = () => {
    setFile(null);
    setPageCount(0);
    setRanges('');
    setSplitPdfs([]);
  }

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          className="relative flex justify-center w-full h-48 px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer border-border hover:border-primary"
          onClick={() => document.getElementById('pdf-upload')?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="space-y-1 text-center">
            <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Click to upload</span> or drag and drop a PDF
            </p>
          </div>
          <input id="pdf-upload" type="file" onChange={handleFileChange} className="hidden" accept="application/pdf" />
        </div>
      ) : (
        <div className="p-4 border rounded-md bg-muted/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{pageCount} pages</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={reset}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
            </div>
        </div>
      )}
      
      {file && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="ranges">Pages to split</Label>
            <Input 
              id="ranges" 
              value={ranges} 
              onChange={(e) => setRanges(e.target.value)} 
              placeholder="e.g., 1-3, 5, 8-10" 
            />
            <p className="text-xs text-muted-foreground mt-1">Enter page numbers or ranges, separated by commas.</p>
          </div>
          <Button onClick={handleSplit} className="w-full">Split PDF</Button>
        </div>
      )}

      {splitPdfs.length > 0 && (
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Split Files</h3>
          <ul className="space-y-2">
            {splitPdfs.map((pdf, index) => (
              <li key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium truncate mr-4">{pdf.name}</p>
                <Button variant="outline" size="sm" onClick={() => downloadPdf(pdf.bytes, pdf.name)}>
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
