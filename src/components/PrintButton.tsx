'use client';

import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className='mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-medium text-sm border border-white/10 shadow-lg cursor-pointer'
    >
      <Printer size={18} />
      Descargar como PDF
    </button>
  );
}
