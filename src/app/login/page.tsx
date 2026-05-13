'use client'

import { useTransition, useState } from 'react'
import { login } from '@/actions/auth'
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md p-4 relative z-10">
        <div className="bg-[#0a0a0a] border border-white/[0.08] p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-10">
            <div className="inline-flex w-16 h-16 bg-white rounded-2xl items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
              <span className="text-black font-black text-3xl">RP</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Bienvenido de nuevo</h1>
            <p className="text-gray-500 mt-2 text-sm">Gestiona tus contratos con Revolución Pineal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-600 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-12 pr-4 py-4 border border-white/5 rounded-2xl bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/[0.08] transition-all text-sm"
                  placeholder="Tu correo electrónico"
                />
              </div>

              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-600 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-12 pr-4 py-4 border border-white/5 rounded-2xl bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/[0.08] transition-all text-sm"
                  placeholder="Tu contraseña"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs bg-red-400/5 p-4 rounded-xl border border-red-400/10 animate-in fade-in slide-in-from-top-2 duration-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 bg-white text-black text-sm font-bold rounded-2xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-[0.98]"
            >
              {isPending ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Entrar al Panel
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold">Exclusivo para Closers</p>
          </div>
        </div>
      </div>
    </main>
  )
}
