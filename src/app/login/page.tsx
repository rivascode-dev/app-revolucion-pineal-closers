'use client';

import { useTransition, useState } from 'react';
import { loginAction } from '@/actions/auth';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result && !result.success && result.error) {
        setError(result.error);
      }
    });
  };

  return (
    <main className='min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans'>
      {/* Background Orbs */}
      <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]' />
      <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]' />

      <div className='w-full max-w-md p-4 relative z-10'>
        <div className='bg-[#0a0a0a]/80 border border-white/[0.08] p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl'>
          {/* Logo / Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex w-16 h-16 bg-white rounded-2xl items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-transform hover:scale-105 duration-300'>
              <span className='text-black text-xl font-black tracking-tighter'>
                AV
              </span>
            </div>
            <h1 className='text-2xl font-extrabold text-white tracking-tight'>
              Bienvenido de nuevo
            </h1>
            <p className='text-sm text-zinc-400 mt-2'>
              Gestiona tus contratos en Alquimia Vital
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-3'>
              {/* Email Input */}
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                  <Mail className='h-5 w-5 text-zinc-500' />
                </div>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  placeholder='Tu correo electrónico'
                  className='w-full h-12 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 text-white text-sm font-medium transition-all placeholder:text-zinc-500 hover:bg-white/8 hover:border-white/10 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                />
              </div>

              {/* Password Input */}
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                  <Lock className='h-5 w-5 text-zinc-500' />
                </div>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  placeholder='Tu contraseña'
                  className='w-full h-12 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 text-white text-sm font-medium transition-all placeholder:text-zinc-500 hover:bg-white/8 hover:border-white/10 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className='text-red-400 text-xs bg-red-400/5 p-3.5 rounded-xl border border-red-400/10 animate-fade-in'>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isPending}
              className='w-full h-12 bg-white text-black text-sm font-bold rounded-2xl transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 mt-2'
            >
              {isPending ? (
                <Loader2 className='h-5 w-5 animate-spin text-black' />
              ) : (
                <>
                  Entrar al Panel
                  <ArrowRight className='h-[18px] w-[18px]' />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className='mt-8 pt-6 border-t border-white/5 text-center'>
            <span className='text-[10px] text-zinc-500 font-bold uppercase tracking-widest'>
              Exclusivo para Closers
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
