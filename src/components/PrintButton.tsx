'use client';

import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PrintButton() {
  return (
    <Button
      variant="outline"
      onClick={() => window.print()}
      className="mt-6 font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 border-slate-200 hover:bg-slate-50 text-slate-700 transition-all cursor-pointer"
    >
      <Printer className="h-4.5 w-4.5" />
      Descargar como PDF
    </Button>
  );
}
