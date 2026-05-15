import type { Metadata } from 'next';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const metadata: Metadata = {
  title: 'Revolucion Pineal - Sistema de Firmas',
  description: 'Revolucion Pineal - Sistema de Firmas',
};

import { Toaster } from 'sonner';
import { InitColorSchemeScript } from '@mui/material';
import ThemeMUIProvider from '@/components/providers/ThemeMUIProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute='class' defaultMode='light' />
        <ThemeMUIProvider>
          {children}
          <Toaster position='top-right' theme='dark' />
        </ThemeMUIProvider>
      </body>
    </html>
  );
}

