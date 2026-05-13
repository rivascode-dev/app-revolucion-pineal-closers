'use client';

import { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { signOut } from '@/actions/auth';

export function Topbar({ userEmail }: { userEmail: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-end'>
      {/* Logo - Right */}
      {/* <div className='flex items-center gap-3'>
        <div className='text-right hidden sm:block'>
          <p className='text-lg font-black tracking-tighter text-white'>
            REVOLUCIÓN PINEAL
          </p>
          <p className='text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase'>
            Closers App
          </p>
        </div>
        <div className='w-12 h-12 bg-white rounded-xl flex items-center justify-center'>
          <span className='text-black font-black text-2xl'>RP</span>
        </div>
      </div> */}

      {/* User Avatar - Left */}
      <div className='relative'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition-all group'
        >
          <div className='w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black border border-white/10 flex items-center justify-center overflow-hidden'>
            <User
              className='text-gray-400 group-hover:text-white transition-colors'
              size={20}
            />
          </div>
          <div className='text-left hidden sm:block'>
            <p className='text-sm font-semibold text-white leading-tight'>
              Micuenta
            </p>
            <p className='text-[10px] text-gray-500 truncate max-w-[120px]'>
              {userEmail}
            </p>
          </div>
          <ChevronDown
            size={14}
            className={cn(
              'text-gray-500 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </button>

        {/* Dropdown / Dialog */}
        {isOpen && (
          <div className='absolute top-full left-0 mt-2 w-56 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200'>
            <div className='p-4 border-b border-white/5'>
              <p className='text-xs text-gray-500 mb-1'>Conectado como</p>
              <p className='text-sm font-medium text-white truncate'>
                {userEmail}
              </p>
            </div>
            <button
              onClick={() => signOut()}
              className='w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-400/5 transition-colors'
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
