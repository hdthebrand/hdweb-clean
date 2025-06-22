'use client';
import { useState, useRef, useCallback } from 'react';
import { UploadCloud, Download, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Crop = { x: number; y: number; width: number; height: number };
type Handle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export default function ImageCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, width: 100, height: 100 });
  const [exportFormat, setExportFormat] = useState('png');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const { toast } = useToast();

  const resetState = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setCrop({ x: 0, y: 0, width: 100, height: 100 });
  };
  
  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      resetState();
      const reader = new FileReader();
      reader.onload = e => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidth = Math.min(width * 0.8, 400);
    const cropHeight = Math.min(height * 0.8, 400);
    setCrop({
      x: (width - cropWidth) / 2,
      y: (height - cropHeight) / 2,
      width: cropWidth,
      height: cropHeight,
    });
  };
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
  }, []);
  
  const handleCropClick = () => {
    const imageEl = imageRef.current;
    const canvas = canvasRef.current;
    if (imageSrc && imageEl && canvas) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const scaleX = img.naturalWidth / imageEl.width;
        const scaleY = img.naturalHeight / imageEl.height;

        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;
        const cropWidth = crop.width * scaleX;
        const cropHeight = crop.height * scaleY;

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        ctx.drawImage(
          img,
          cropX, cropY, cropWidth, cropHeight,
          0, 0, cropWidth, cropHeight
        );

        setCroppedImage(canvas.toDataURL(`image/${exportFormat}`));
        toast({ title: 'Success', description: 'Image cropped. You can now download it.' });
      };
      img.onerror = () => {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to load image for cropping.' });
      };
    }
  };
  
  const handleDownload = () => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.href = croppedImage;
      link.download = `cropped-image.${exportFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: 'Success', description: 'Image downloaded.' });
    }
  };

  const handleInteractionStart = (
    e: React.MouseEvent<HTMLDivElement>,
    handle?: Handle
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const imageEl = imageRef.current;
    if (!imageEl) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startCrop = { ...crop };
    const imageRect = imageEl.getBoundingClientRect();

    const onMouseMove = (moveE: MouseEvent) => {
        let newCrop = { ...crop };
        const dx = moveE.clientX - startX;
        const dy = moveE.clientY - startY;

        if (handle) {
            // Resizing
            if (handle.includes('e')) newCrop.width = Math.min(startCrop.width + dx, imageRect.width - startCrop.x);
            if (handle.includes('w')) {
                const newWidth = startCrop.width - dx;
                if(newWidth > 20) {
                    newCrop.width = newWidth;
                    newCrop.x = startCrop.x + dx;
                }
            }
            if (handle.includes('s')) newCrop.height = Math.min(startCrop.height + dy, imageRect.height - startCrop.y);
            if (handle.includes('n')) {
                const newHeight = startCrop.height - dy;
                if(newHeight > 20) {
                    newCrop.height = newHeight;
                    newCrop.y = startCrop.y + dy;
                }
            }
        } else {
            // Moving
            newCrop.x = Math.max(0, Math.min(startCrop.x + dx, imageRect.width - startCrop.width));
            newCrop.y = Math.max(0, Math.min(startCrop.y + dy, imageRect.height - startCrop.height));
        }
        
        if (newCrop.x < 0) { newCrop.x = 0; }
        if (newCrop.y < 0) { newCrop.y = 0; }
        if (newCrop.x + newCrop.width > imageRect.width) { newCrop.width = imageRect.width - newCrop.x; }
        if (newCrop.y + newCrop.height > imageRect.height) { newCrop.height = imageRect.height - newCrop.y; }

        setCrop(newCrop);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  
  const resizeHandles: Handle[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
  
  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <div
          className="relative flex justify-center w-full h-64 px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer border-border hover:border-primary"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <div className="space-y-1 text-center">
            <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Click to upload</span> or drag and drop
            </p>
          </div>
          <input id="file-upload" type="file" onChange={e => handleFileChange(e.target.files)} className="hidden" accept="image/*" />
        </div>
      ) : (
        <div className="relative inline-block" style={{ userSelect: 'none' }}>
          <p className="text-sm text-muted-foreground mb-2">Drag and resize the rectangle to select the crop area.</p>
          <img
            ref={imageRef}
            src={imageSrc}
            alt="To be cropped"
            className="max-w-full max-h-[60vh] select-none"
            onLoad={handleImageLoad}
          />
          <div
            className="absolute border-2 border-dashed border-primary bg-primary/20 cursor-move"
            style={{
              left: `${crop.x}px`,
              top: `${crop.y}px`,
              width: `${crop.width}px`,
              height: `${crop.height}px`,
            }}
            onMouseDown={(e) => handleInteractionStart(e)}
          >
            {resizeHandles.map(handle => {
                const handleStyle: React.CSSProperties = {};
                if (handle.includes('n')) { handleStyle.top = '-5px'; handleStyle.cursor = 'n-resize'; }
                if (handle.includes('s')) { handleStyle.bottom = '-5px'; handleStyle.cursor = 's-resize'; }
                if (handle.includes('e')) { handleStyle.right = '-5px'; handleStyle.cursor = 'e-resize'; }
                if (handle.includes('w')) { handleStyle.left = '-5px'; handleStyle.cursor = 'w-resize'; }
                if (handle === 'ne') handleStyle.cursor = 'ne-resize';
                if (handle === 'nw') handleStyle.cursor = 'nw-resize';
                if (handle === 'se') handleStyle.cursor = 'se-resize';
                if (handle === 'sw') handleStyle.cursor = 'sw-resize';
                if (['n', 's'].includes(handle)) { handleStyle.left = 'calc(50% - 5px)'; }
                if (['e', 'w'].includes(handle)) { handleStyle.top = 'calc(50% - 5px)'; }
                
                return (
                    <div
                        key={handle}
                        className="absolute w-[10px] h-[10px] bg-primary rounded-full"
                        style={handleStyle}
                        onMouseDown={(e) => handleInteractionStart(e, handle)}
                    />
                )
            })}
          </div>
        </div>
      )}

      {imageSrc && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label>Export Format</Label>
            <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="flex gap-4 mt-2">
              {['png', 'jpeg', 'webp'].map(format => (
                <div key={format} className="flex items-center space-x-2">
                  <RadioGroupItem value={format} id={format} />
                  <Label htmlFor={format}>{format.toUpperCase()}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button onClick={handleCropClick} className="w-full sm:w-auto">
            <Scissors className="mr-2 h-4 w-4" />
            Crop Image
          </Button>
        </div>
      )}

      {croppedImage && (
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Cropped Preview</h3>
          <div className='p-4 border rounded-md bg-muted/50 inline-block'>
            <img src={croppedImage} alt="Cropped result" className="max-w-full max-h-64" />
          </div>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Cropped Image
          </Button>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
}
