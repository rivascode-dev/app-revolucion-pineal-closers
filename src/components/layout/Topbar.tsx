'use client';

import { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { signOut } from '@/actions/auth';
import { ThemeToggle } from '../ThemeToggle';

export function Topbar({ userEmail }: { userEmail: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='h-20 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 flex items-center justify-between'>
      <div className='flex-1'></div>

      <div className='flex items-center gap-4'>
        <ThemeToggle />

        {/* User Avatar - Left */}
        <div className='relative'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center gap-3 hover:bg-surface p-2 rounded-xl transition-all group'
          >
            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-black border border-border flex items-center justify-center overflow-hidden'>
              <User
                className='text-secondary group-hover:text-white transition-colors'
                size={20}
              />
            </div>
            <div className='text-left hidden sm:block'>
              <p className='text-sm font-semibold text-foreground leading-tight'>
                Micuenta
              </p>
              <p className='text-[10px] text-secondary truncate max-w-[120px]'>
                {userEmail}
              </p>
            </div>
            <ChevronDown
              size={14}
              className={cn(
                'text-secondary transition-transform duration-200',
                isOpen && 'rotate-180',
              )}
            />
          </button>

          {/* Dropdown / Dialog */}
          {isOpen && (
            <div className='absolute top-full right-0 mt-2 w-56 bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200'>
              <div className='p-4 border-b border-border'>
                <p className='text-xs text-secondary mb-1'>Conectado como</p>
                <p className='text-sm font-medium text-foreground truncate'>
                  {userEmail}
                </p>
              </div>
              <button
                onClick={() => signOut()}
                className='w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors'
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
