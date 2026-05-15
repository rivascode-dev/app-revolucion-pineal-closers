'use client';

import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Eraser, Check } from 'lucide-react';
import { Box, Button, Typography, Stack, CircularProgress } from '@mui/material';

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
    <Stack spacing={3}>
      <Box sx={{ position: 'relative', '&:hover .signature-glow': { opacity: 0.5, transitionDuration: '200ms' } }}>
        <Box sx={{
          position: 'absolute',
          inset: -2,
          background: 'linear-gradient(to right, var(--mui-palette-divider), transparent)',
          borderRadius: 4,
          filter: 'blur(8px)',
          opacity: 0.3,
          transition: 'opacity 1000ms',
        }} className="signature-glow" />
        <Box sx={{
          position: 'relative',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          bgcolor: 'background.paper',
          overflow: 'hidden',
          boxShadow: 1,
        }}>
          <Box sx={{
            position: 'absolute',
            top: 16,
            left: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.disabled',
            userSelect: 'none',
            pointerEvents: 'none'
          }}>
            <Typography variant="overline">
              Firme aquí
            </Typography>
          </Box>
          <SignatureCanvas
            ref={sigCanvas}
            onBegin={() => setIsEmpty(false)}
            penColor='black'
            canvasProps={{
              style: { width: '100%', height: '300px', cursor: 'crosshair' },
            }}
          />
        </Box>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          onClick={clear}
          variant="outlined"
          color="inherit"
          startIcon={<Eraser size={16} strokeWidth={3} />}
          sx={{ flex: 1 }}
        >
          Limpiar Lienzo
        </Button>
        <Button
          onClick={handleSign}
          disabled={isEmpty || isSigning || disabled}
          variant="contained"
          sx={{ flex: 1.5 }}
          startIcon={!isSigning && <Check size={18} strokeWidth={3} />}
        >
          {isSigning ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            'Finalizar y Firmar'
          )}
        </Button>
      </Stack>
    </Stack>
  );
}
