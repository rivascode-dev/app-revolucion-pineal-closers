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
      className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-all border border-transparent hover:border-white/5"
      title="Copiar Enlace Público"
    >
      {copied ? <Check size={18} className="text-green-400" strokeWidth={3} /> : <LinkIcon size={18} />}
    </button>
  )
}
