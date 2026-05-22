/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />;
  }

  const isDark = theme === 'dark';

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Cambiar tema"
      className="h-10 w-10 rounded-xl border border-border bg-background transition-all duration-300 hover:border-primary hover:bg-accent active:scale-95 shadow-sm hover:shadow"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-500 transition-transform duration-500 rotate-0 scale-100 dark:rotate-0 dark:scale-100" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-500 transition-transform duration-500 rotate-0 scale-100 dark:rotate-0 dark:scale-100" />
      )}
    </Button>
  );
}
