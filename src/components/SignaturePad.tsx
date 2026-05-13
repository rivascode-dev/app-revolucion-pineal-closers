'use client';

import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Eraser, Check, Loader2 } from 'lucide-react';

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
    <div className='space-y-6'>
      <div className='relative group'>
        <div className='absolute -inset-0.5 bg-gradient-to-r from-white/10 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200'></div>
        <div className='relative border border-white/10 rounded-2xl bg-[#0a0a0a] overflow-hidden shadow-2xl'>
          <div className='absolute top-4 left-6 flex items-center gap-2 text-white/20 select-none pointer-events-none'>
            <span className='text-[10px] font-black uppercase tracking-[0.3em]'>
              Firme aquí
            </span>
          </div>
          <SignatureCanvas
            ref={sigCanvas}
            onBegin={() => setIsEmpty(false)}
            penColor='white'
            canvasProps={{
              className: 'w-full cursor-crosshair',
              style: { width: '100%', height: '300px' },
            }}
          />
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
        <button
          onClick={clear}
          className='flex-1 flex items-center justify-center gap-2 py-4 px-6 border border-white/5 bg-white/5 text-gray-400 rounded-2xl hover:bg-white/10 hover:text-white transition-all text-xs font-black uppercase tracking-widest'
        >
          <Eraser size={16} strokeWidth={3} />
          Limpiar Lienzo
        </button>
        <button
          onClick={handleSign}
          disabled={isEmpty || isSigning || disabled}
          className='flex-[1.5] flex items-center justify-center gap-3 py-4 px-10 bg-white text-black rounded-2xl hover:bg-gray-200 disabled:opacity-30 disabled:grayscale transition-all text-xs font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-[0.98]'
        >
          {isSigning ? (
            <Loader2 className='animate-spin h-5 w-5' />
          ) : (
            <>
              <Check size={18} strokeWidth={3} />
              Finalizar y Firmar
            </>
          )}
        </button>
      </div>
    </div>
  );
}
