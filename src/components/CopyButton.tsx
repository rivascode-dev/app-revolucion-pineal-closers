'use client';

import { Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
    <button
      onClick={handleCopy}
      className={`p-2 rounded-lg transition-all relative group ${
        copied
          ? 'text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
      title="Copiar Enlace Público"
    >
      {copied ? <Check className="h-[18px] w-[18px]" strokeWidth={3} /> : <LinkIcon className="h-[18px] w-[18px]" />}
    </button>
  );
}
