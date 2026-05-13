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
    <aside className='w-64 border-r border-white/5 bg-[#0a0a0a] hidden md:flex flex-col h-screen sticky top-0'>
      <div className='flex items-center gap-3 p-2'>
        <div className='w-12 h-12 bg-white rounded-xl flex items-center justify-center'>
          <span className='text-black font-black text-2xl'>RP</span>
        </div>
        <div className='text-right hidden sm:block'>
          <p className='text-lg font-black tracking-tighter text-white'>
            REVOLUCIÓN PINEAL
          </p>
          <p className='text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase'>
            Closers App
          </p>
        </div>
      </div>

      <div className='p-8'>
        <h2 className='text-xs font-bold text-gray-500 uppercase tracking-[0.2em]'>
          Navegación
        </h2>
      </div>

      <nav className='flex-1 px-4 space-y-2'>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                isActive
                  ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5',
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  isActive
                    ? 'text-black'
                    : 'text-gray-500 group-hover:text-white',
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className='p-4'>
        <div className='p-4 bg-white/5 rounded-2xl border border-white/5'>
          <p className='text-xs text-gray-500 mb-3'>Revolución Pineal v1.0</p>
          <div className='h-1 w-full bg-white/10 rounded-full overflow-hidden'>
            <div className='h-full w-2/3 bg-white rounded-full'></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
