'use client';

import { useEffect } from 'react';

export function LightModeWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement;
    let wasDark = false;

    // Remove dark class if present
    if (html.classList.contains('dark')) {
      wasDark = true;
      html.classList.remove('dark');
    }

    // Set up a MutationObserver to block any attempts to add the 'dark' class
    // This handles cases where MUI or next-themes tries to re-apply it after hydration
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && html.classList.contains('dark')) {
          html.classList.remove('dark');
        }
      });
    });

    observer.observe(html, { attributes: true });

    return () => {
      observer.disconnect();
      // Restore dark mode if it was active before navigating to this page
      if (wasDark) {
        html.classList.add('dark');
      }
    };
  }, []);

  // We no longer need to wrap it in a custom ThemeProvider because removing the 
  // `.dark` class from <html> naturally prevents all `theme.applyStyles('dark')`
  // CSS rules from matching, leaving the pure light mode.
  return <>{children}</>;
}

