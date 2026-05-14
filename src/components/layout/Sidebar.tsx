'use client';

import { LayoutDashboard, FileText, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Contratos', href: '/dashboard/contratos', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='w-20 md:w-64 border-r border-border bg-surface flex flex-col h-screen sticky top-0 transition-all duration-300'>
      <div className='flex items-center gap-3 p-4 justify-center md:justify-start'>
        <div className='w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center shrink-0 shadow-lg'>
          <span className='text-white dark:text-black font-black text-xl'>RP</span>
        </div>
        <div className='text-right hidden md:block'>
          <p className='text-base font-black tracking-tighter text-foreground leading-tight'>
            REVOLUCIÓN PINEAL
          </p>
          <p className='text-[9px] font-bold text-secondary tracking-[0.2em] uppercase'>
            Closers App
          </p>
        </div>
      </div>

      <div className='p-8 pb-4 hidden md:block'>
        <h2 className='text-[10px] font-bold text-secondary uppercase tracking-[0.2em]'>
          Navegación
        </h2>
      </div>

      <nav className='flex-1 px-3 md:px-4 space-y-2 mt-4 md:mt-0'>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl transition-all duration-200 group justify-center md:justify-start',
                isActive
                  ? 'bg-black dark:bg-white text-white dark:text-black font-semibold shadow-xl'
                  : 'text-secondary hover:text-foreground hover:bg-surface-hover',
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  isActive
                    ? 'text-white dark:text-black'
                    : 'text-secondary group-hover:text-foreground',
                )}
              />
              <span className='hidden md:block'>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className='p-4 hidden md:block'>
        <div className='p-4 bg-surface-hover rounded-2xl border border-border'>
          <p className='text-xs text-secondary mb-3'>Revolución Pineal v1.0</p>
          <div className='h-1 w-full bg-border rounded-full overflow-hidden'>
            <div className='h-full w-2/3 bg-foreground/20 dark:bg-white rounded-full'></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
