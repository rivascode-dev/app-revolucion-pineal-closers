'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { SignaturePad } from '@/components/SignaturePad';
import { signContract } from '@/actions/contracts';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function SignatureContainer({ id }: { id: string }) {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [chkNombre, setChkNombre] = useState(false);
  const [chkCompleta, setChkCompleta] = useState(false);

  const isFormValid = nombre.trim() !== '' && fecha.trim() !== '';

  const handleSign = async (signatureData: string) => {
    const result = await signContract(id, signatureData, nombre, fecha);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Contrato firmado correctamente');
      router.refresh();
    }
  };

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4'>
        <div className='space-y-1'>
          <h2 className='text-xl font-black text-gray-900 tracking-tight'>
            A continuación completa los pasos para firmar el acuerdo:
          </h2>
          <h3 className='text-md font-black text-gray-800 tracking-tight mt-4 uppercase text-[10px] bg-gray-100 w-fit px-3 py-1 rounded-full'>
            PASO 1: Ingrese sus datos personales
          </h3>
        </div>
        <div className='group space-y-2'>
          <label
            htmlFor='nombre_cliente_contrato'
            className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1'
          >
            Nombre Completo
          </label>
          <div className='relative'>
            <input
              id='nombre_cliente_contrato'
              name='nombre_cliente_contrato'
              type='text'
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className='block w-full px-6 py-5 border border-gray-200 rounded-2xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all text-sm font-medium hover:border-gray-300'
              placeholder='Ej: Juan Antonio Pérez'
            />
          </div>
        </div>
        <div className='group space-y-2'>
          <label
            htmlFor='fecha_nacimiento_cliente'
            className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1'
          >
            Fecha de nacimiento
          </label>
          <div className='relative'>
            <input
              id='fecha_nacimiento_cliente'
              name='fecha_nacimiento_cliente'
              type='date'
              required
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className='block w-full px-6 py-5 border border-gray-200 rounded-2xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all text-sm font-medium hover:border-gray-300 [color-scheme:light]'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <h3 className='text-md font-black text-gray-800 tracking-tight flex items-center gap-2 uppercase text-[10px] bg-gray-100 w-fit px-3 py-1 rounded-full'>
          PASO 2: Revise y valide que sus datos estan correctos
        </h3>
        {nombre && fecha && (
          <div className='space-y-4 bg-gray-50 border border-gray-100 p-6 rounded-3xl'>
            <p className='text-xs text-gray-600 font-medium leading-relaxed'>
              Yo, <span className='text-gray-900 font-bold'>{nombre}</span>{' '}
              nacido el <span className='text-gray-900 font-bold'>{fecha}</span>{' '}
              prometo guardarme una copia de este acuerdo una vez lo haya
              firmado.
            </p>
            <p className='text-xs text-gray-600 font-medium leading-relaxed'>
              Yo,{' '}
              <span className='text-gray-900 font-bold'>
                {nombre || '[Nombre]'}
              </span>{' '}
              al firmar este acuerdo confirmo haber leído y ser consciente de
              cada uno de los puntos mencionados en él y doy mi palabra de
              cumplir con ellos con total firmeza e integridad.
            </p>
            <p className='text-xs text-gray-500 font-medium leading-relaxed italic opacity-80'>
              Firmo a continuación como prueba de mi compromiso con cada uno de
              ellos.
            </p>
          </div>
        )}
      </div>

      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='space-y-1'>
          <h3 className='text-md font-black text-gray-800 tracking-tight flex items-center gap-2 uppercase text-[10px] bg-gray-100 w-fit px-3 py-1 rounded-full'>
            PASO 3: Aceptación y Firma
          </h3>
          <p className='text-xs text-gray-500 font-medium'>
            Por favor, estampa tu firma a continuación para formalizar el
            acuerdo.
          </p>
        </div>
        <div className='h-px flex-1 bg-gray-100 hidden md:block mx-8'></div>
      </div>

      <SignaturePad
        onSign={handleSign}
        disabled={!isFormValid || !chkNombre || !chkCompleta}
      />

      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            className='h-4 w-4 accent-gray-900 rounded border-gray-300 bg-white focus:ring-gray-900 disabled:opacity-50 [color-scheme:light]'
            id='firma_nombre'
            checked={chkNombre}
            onChange={(e) => setChkNombre(e.target.checked)}
            disabled={!isFormValid}
          />
          <label
            htmlFor='firma_nombre'
            className={cn(
              'text-sm font-medium text-gray-700 select-none cursor-pointer',
              !isFormValid && 'opacity-50 cursor-not-allowed',
            )}
          >
            He ingresado mi/s nombre/s y apellido/s tal como aparecen en mi
            documento de identidad
          </label>
        </div>

        <div className='flex items-center gap-2'>
          <input
            className='h-4 w-4 accent-gray-900 rounded border-gray-300 bg-white focus:ring-gray-900 disabled:opacity-50 [color-scheme:light]'
            type='checkbox'
            id='firma_completa'
            checked={chkCompleta}
            onChange={(e) => setChkCompleta(e.target.checked)}
            disabled={!isFormValid}
          />
          <label
            htmlFor='firma_completa'
            className={cn(
              'text-sm font-medium text-gray-700 select-none cursor-pointer',
              !isFormValid && 'opacity-50 cursor-not-allowed',
            )}
          >
            He introducido mi firma completa
          </label>
        </div>
      </div>
    </div>
  );
}
