'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='w-10 h-10 rounded-xl bg-surface border border-border animate-pulse' />
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className='relative w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-surface-hover hover:border-primary/20 transition-all duration-200 group'
      aria-label='Cambiar tema'
    >
      {resolvedTheme === 'dark' ? (
        <Sun className='h-5 w-5 text-amber-500' />
      ) : (
        <Moon className='h-5 w-5 text-blue-400' />
      )}
    </button>
  );
}
