'use client';

import { Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { IconButton, Tooltip } from '@mui/material';

export function CopyButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/contrato/${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Enlace copiado al portapapeles');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip title="Copiar Enlace Público">
      <IconButton
        onClick={handleCopy}
        color={copied ? 'success' : 'default'}
      >
        {copied ? <Check size={18} strokeWidth={3} /> : <LinkIcon size={18} />}
      </IconButton>
    </Tooltip>
  );
}
