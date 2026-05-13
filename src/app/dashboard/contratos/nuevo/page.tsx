'use client';

import { useTransition, useState } from 'react';
import { createContract } from './actions';
import {
  User,
  Phone,
  Hash,
  Euro,
  Loader2,
  ArrowLeft,
  Send,
} from 'lucide-react';
import Link from 'next/link';

const CURRENCIES = ['EUR', 'USD', 'MXN', 'ARS', 'PEN'];

const TYPE_OF_CONTRACTS = [
  {
    name: 'Acuerdo de Acceso (ADVANCED HEALERS)',
    value: 'acuerdo_acceso_advanced_healers',
  },
  { name: 'Alquimia Vilal (E.C.A)', value: 'alquimia_vilal_eca' },
  {
    name: 'Alquimia Vilal (ENERGY MASTER)',
    value: 'alquimia_vilal_energy_master',
  },
  {
    name: 'Oferta Iniciación (CON ACCESO VITALICIO)',
    value: 'oferta_iniciacion_vitalicio',
  },
];

export default function NewContractPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await createContract(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className='max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className='flex items-center justify-between'>
        <Link
          href='/dashboard/contratos'
          className='group flex items-center gap-2 text-gray-500 hover:text-white transition-all text-sm font-bold uppercase tracking-widest'
        >
          <div className='w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white/5 group-hover:border-white/10 transition-all'>
            <ArrowLeft size={18} />
          </div>
          Volver
        </Link>
        <div className='h-px flex-1 bg-white/5 mx-6 hidden sm:block'></div>
        <p className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-700'>
          Paso 01 / Generación
        </p>
      </div>

      <div className='space-y-4'>
        <h1 className='text-4xl font-black tracking-tight text-white'>
          Nuevo Contrato
        </h1>
        <p className='text-gray-500'>
          Completa los detalles para generar el enlace de firma digital.
        </p>
      </div>

      <div className='bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden'>
        {/* Decorative element */}
        <div className='absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-bl-[5rem] border-l border-b border-white/[0.05]'></div>

        <form onSubmit={handleSubmit} className='space-y-10 relative z-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10'>
            {/* Cliente */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-white/40 mb-2'>
                <User size={14} />
                <span className='text-[10px] font-black uppercase tracking-widest'>
                  Información del Cliente
                </span>
              </div>
              <div className='space-y-4'>
                <div className='group space-y-2'>
                  <label
                    htmlFor='nombre_cliente'
                    className='text-xs font-bold text-gray-500 uppercase tracking-wider ml-1'
                  >
                    Nombre Completo
                  </label>
                  <input
                    id='nombre_cliente'
                    name='nombre_cliente'
                    type='text'
                    required
                    className='block w-full px-5 py-4 border border-white/5 rounded-2xl bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-white/[0.06] transition-all text-sm font-medium'
                    placeholder='Ej: Juan Antonio Pérez'
                  />
                </div>
                <div className='group space-y-2'>
                  <label
                    htmlFor='telefono_cliente'
                    className='text-xs font-bold text-gray-500 uppercase tracking-wider ml-1'
                  >
                    WhatsApp (con prefijo)
                  </label>
                  <div className='relative'>
                    <input
                      id='telefono_cliente'
                      name='telefono_cliente'
                      type='tel'
                      required
                      className='block w-full px-5 py-4 border border-white/5 rounded-2xl bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-white/[0.06] transition-all text-sm font-medium'
                      placeholder='+34 600 000 000'
                    />
                  </div>
                </div>

                <div className='group space-y-2'>
                  <label
                    htmlFor='tipo_contrato'
                    className='text-xs font-bold text-gray-500 uppercase tracking-wider ml-1'
                  >
                    Tipo de Contrato
                  </label>

                  <div className='flex gap-x-4 '>
                    <select
                      id='tipo_contrato'
                      name='tipo_contrato'
                      required
                      className='block w-full px-5 py-4 border border-white/5 rounded-2xl bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-white/[0.06] transition-all text-sm font-medium'
                    >
                      {TYPE_OF_CONTRACTS.map((contract, index) => (
                        <option
                          key={index}
                          value={contract.value}
                          className='bg-[#111111]'
                        >
                          {contract.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Condiciones */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-white/40 mb-2'>
                <Hash size={14} />
                <span className='text-[10px] font-black uppercase tracking-widest'>
                  Condiciones Económicas
                </span>
              </div>
              <div className='space-y-4'>
                <div className='group space-y-2'>
                  <label
                    htmlFor='importe'
                    className='text-xs font-bold text-gray-500 uppercase tracking-wider ml-1'
                  >
                    Moneda / Importe Total
                  </label>

                  <div className='flex gap-x-4 '>
                    <select
                      id='moneda'
                      name='moneda'
                      required
                      className='block w-25 px-5 py-4 border border-white/5 rounded-2xl bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-white/[0.06] transition-all text-sm font-medium'
                    >
                      {CURRENCIES.map((currency) => (
                        <option
                          key={currency}
                          value={currency}
                          className='bg-[#111111]'
                        >
                          {currency}
                        </option>
                      ))}
                    </select>

                    <input
                      id='importe'
                      name='importe'
                      type='number'
                      step='0.01'
                      required
                      className='block w-55 px-5 py-4 border border-white/5 rounded-2xl bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-white/[0.06] transition-all text-sm font-medium'
                      placeholder='0.00'
                    />
                  </div>
                </div>
                <div className='group space-y-2'>
                  <label
                    htmlFor='numero_cuotas'
                    className='text-xs font-bold text-gray-500 uppercase tracking-wider ml-1'
                  >
                    Número de Cuotas
                  </label>
                  <select
                    id='numero_cuotas'
                    name='numero_cuotas'
                    required
                    className='block w-full px-5 py-4 border border-white/5 rounded-2xl bg-white/[0.03] text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-white/[0.06] transition-all text-sm font-medium appearance-none cursor-pointer'
                  >
                    {[1, 2, 3, 4, 6, 12].map((n) => (
                      <option key={n} value={n} className='bg-[#111111]'>
                        {n} {n === 1 ? 'Cuota (Pago Único)' : 'Cuotas'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='group space-y-2'>
                  <label
                    htmlFor='dia_cobro'
                    className='text-xs font-bold text-gray-500 uppercase tracking-wider ml-1'
                  >
                    Día de cobro
                  </label>
                  <input
                    id='dia_cobro'
                    name='dia_cobro'
                    type='number'
                    min={1}
                    max={31}
                    required
                    className='block w-82 px-5 py-4 border border-white/5 rounded-2xl bg-white/[0.03] text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-white/[0.06] transition-all text-sm font-medium'
                    placeholder='1'
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className='text-red-400 text-xs bg-red-400/5 p-5 rounded-2xl border border-red-400/10 animate-in fade-in zoom-in duration-300'>
              {error}
            </div>
          )}

          <div className='pt-6'>
            <button
              type='submit'
              disabled={isPending}
              className='w-full flex justify-center items-center gap-3 py-5 px-4 bg-white text-black text-sm font-black rounded-2xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] uppercase tracking-[0.2em] active:scale-[0.98]'
            >
              {isPending ? (
                <Loader2 className='animate-spin h-5 w-5' />
              ) : (
                <>
                  Generar y Obtener Enlace
                  <Send size={18} strokeWidth={3} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
