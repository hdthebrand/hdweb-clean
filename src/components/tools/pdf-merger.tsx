'use client';
import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Download, FileText, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PdfMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedPdf, setMergedPdf] = useState<Uint8Array | null>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== selectedFiles.length) {
      toast({ variant: 'destructive', title: 'Invalid Files', description: 'Some selected files were not PDFs and were ignored.' });
    }
    
    setFiles(prev => [...prev, ...pdfFiles]);
    setMergedPdf(null);
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < files.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      setFiles(newFiles);
    }
  };
  
  const handleMerge = async () => {
    if (files.length < 2) {
      toast({ variant: 'destructive', title: 'Not enough files', description: 'Please select at least two PDFs to merge.' });
      return;
    }

    try {
      const mergedPdfDoc = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfToMerge = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdfDoc.copyPages(pdfToMerge, pdfToMerge.getPageIndices());
        copiedPages.forEach(page => mergedPdfDoc.addPage(page));
      }
      
      const mergedPdfBytes = await mergedPdfDoc.save();
      setMergedPdf(mergedPdfBytes);
      toast({ title: 'Success', description: 'PDFs merged successfully. You can now download the file.' });
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'An error occurred while merging the PDFs.' });
    }
  };

  const downloadMergedPdf = () => {
    if (!mergedPdf) return;
    const blob = new Blob([mergedPdf], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'merged.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const pdfFiles = droppedFiles.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== droppedFiles.length) {
      toast({ variant: 'destructive', title: 'Invalid Files', description: 'Some dropped files were not PDFs and were ignored.' });
    }
    
    setFiles(prev => [...prev, ...pdfFiles]);
    setMergedPdf(null);
  }, [toast]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);
  
  return (
    <div className="space-y-6">
      <div
        className="relative flex justify-center w-full h-48 px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer border-border hover:border-primary"
        onClick={() => document.getElementById('pdf-uploads')?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="space-y-1 text-center">
          <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Click to upload</span> or drag and drop PDFs
          </p>
          <p className="text-xs text-muted-foreground">Add two or more files to merge</p>
        </div>
        <input id="pdf-uploads" type="file" onChange={handleFileChange} className="hidden" accept="application/pdf" multiple />
      </div>
      
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Files to Merge ({files.length})</h3>
          <ScrollArea className="h-64 w-full rounded-md border p-2">
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center p-2 rounded-lg bg-muted/50">
                  <FileText className="h-6 w-6 mr-3 text-primary shrink-0" />
                  <p className="text-sm font-medium truncate flex-grow">{file.name}</p>
                  <div className='flex items-center gap-1 ml-2'>
                    <Button variant="ghost" size="icon" onClick={() => moveFile(index, 'up')} disabled={index === 0}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <Button onClick={handleMerge} className="w-full" disabled={files.length < 2}>Merge {files.length} PDFs</Button>
        </div>
      )}

      {mergedPdf && (
        <div className="space-y-4 pt-4 border-t text-center">
          <h3 className="text-lg font-medium">Merge Complete!</h3>
          <Button onClick={downloadMergedPdf}>
            <Download className="mr-2 h-4 w-4" /> Download Merged PDF
          </Button>
        </div>
      )}
    </div>
  );
}
