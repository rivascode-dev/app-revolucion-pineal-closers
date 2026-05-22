'use client';

import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Eraser, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SignaturePadProps {
  onSign: (signatureData: string) => Promise<void>;
  disabled?: boolean;
}

export function SignaturePad({ onSign, disabled = false }: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const clear = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
  };

  const handleSign = async () => {
    if (sigCanvas.current?.isEmpty() || disabled) return;

    const dataUrl = sigCanvas.current
      ?.getTrimmedCanvas()
      .toDataURL('image/png');
    if (dataUrl) {
      setIsSigning(true);
      try {
        await onSign(dataUrl);
      } finally {
        setIsSigning(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-violet-500/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-all duration-300 pointer-events-none" />
        
        <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="absolute top-4 left-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest pointer-events-none select-none">
            Firme aquí
          </div>
          <SignatureCanvas
            ref={sigCanvas}
            onBegin={() => setIsEmpty(false)}
            penColor="black"
            canvasProps={{
              style: { width: '100%', height: '300px', cursor: 'crosshair' },
            }}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={clear}
          variant="outline"
          className="flex-1 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 border-slate-200 hover:bg-slate-50 text-slate-700 transition-all"
        >
          <Eraser className="h-4 w-4" strokeWidth={3} />
          Limpiar Lienzo
        </Button>
        <Button
          onClick={handleSign}
          disabled={isEmpty || isSigning || disabled}
          className="flex-[1.5] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          {isSigning ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" strokeWidth={3} />
          )}
          {isSigning ? 'Firmando...' : 'Finalizar y Firmar'}
        </Button>
      </div>
    </div>
  );
}
