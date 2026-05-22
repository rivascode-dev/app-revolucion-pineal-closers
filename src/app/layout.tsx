import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Revolución Pineal - Sistema de Firmas',
  description: 'Sistema administrativo y de firmas de Revolución Pineal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' suppressHydrationWarning className={inter.variable}>
      <body className="antialiased min-h-screen bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position='top-right' theme='dark' />
        </ThemeProvider>
      </body>
    </html>
  );
}
