'use client'

import { Link as LinkIcon, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function CopyButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const url = `${window.location.origin}/contrato/${id}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('Enlace copiado al portapapeles')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-hover text-secondary hover:text-foreground transition-all border border-transparent hover:border-border"
      title="Copiar Enlace Público"
    >
      {copied ? <Check size={18} className="text-green-500" strokeWidth={3} /> : <LinkIcon size={18} />}
    </button>
  )
}
