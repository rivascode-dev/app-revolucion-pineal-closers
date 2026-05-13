'use client';

import { useState } from 'react';
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
          <h2 className='text-xl font-black text-white tracking-tight'>
            A continuación completa los pasos para firmar el acuerdo:
          </h2>
          <h3 className='text-md font-black text-white tracking-tight mt-4'>
            PASO 1: Ingrese sus datos personales
          </h3>
        </div>
        <div className='group space-y-2'>
          <label
            htmlFor='nombre_cliente_contrato'
            className='text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1'
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
              className='block w-full px-6 py-5 border border-white/5 rounded-2xl bg-white/[0.02] text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-white/[0.04] transition-all text-sm font-medium hover:border-white/10'
              placeholder='Ej: Juan Antonio Pérez'
            />
          </div>
        </div>
        <div className='group space-y-2'>
          <label
            htmlFor='fecha_nacimiento_cliente'
            className='text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1'
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
              className='block w-full px-6 py-5 border border-white/5 rounded-2xl bg-white/[0.02] text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-white/[0.04] transition-all text-sm font-medium hover:border-white/10 [color-scheme:dark]'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <h3 className='text-md font-black text-white tracking-tight flex items-center gap-2'>
          PASO 2: Revise y valide que sus datos estan correctos
        </h3>
        {nombre && fecha && (
          <div className='space-y-4 bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-sm'>
            <p className='text-xs text-gray-400 font-medium leading-relaxed'>
              Yo, <span className='text-white font-bold'>{nombre}</span> nacido
              el <span className='text-white font-bold'>{fecha}</span> prometo
              guardarme una copia de este acuerdo una vez lo haya firmado.
            </p>
            <p className='text-xs text-gray-400 font-medium leading-relaxed'>
              Yo,{' '}
              <span className='text-white font-bold'>
                {nombre || '[Nombre]'}
              </span>{' '}
              al firmar este acuerdo confirmo haber leído y ser consciente de
              cada uno de los puntos mencionados en él y doy mi palabra de
              cumplir con ellos con total firmeza e integridad.
            </p>
            <p className='text-xs text-gray-400 font-medium leading-relaxed italic opacity-60'>
              Firmo a continuación como prueba de mi compromiso con cada uno de
              ellos.
            </p>
          </div>
        )}
      </div>

      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='space-y-1'>
          <h3 className='text-md font-black text-white tracking-tight'>
            PASO 3: Aceptación y Firma
          </h3>
          <p className='text-xs text-gray-500 font-medium'>
            Por favor, estampa tu firma a continuación para formalizar el
            acuerdo.
          </p>
        </div>
        <div className='h-px flex-1 bg-white/5 hidden md:block mx-8'></div>
        {/* <p className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-700'>
          Digital ID Verification
        </p> */}
      </div>

      <SignaturePad
        onSign={handleSign}
        disabled={!isFormValid || !chkNombre || !chkCompleta}
      />

      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            className='h-4 w-4 text-white rounded border-white/20 bg-[#1a1a1a] focus:ring-white disabled:opacity-50'
            id='firma_nombre'
            checked={chkNombre}
            onChange={(e) => setChkNombre(e.target.checked)}
            disabled={!isFormValid}
          />
          <label
            htmlFor='firma_nombre'
            className={!isFormValid ? 'opacity-50' : ''}
          >
            He ingresado mi/s nombre/s y apellido/s tal como aparecen en mi
            documento de identidad
          </label>
        </div>

        <div className='flex items-center gap-2'>
          <input
            className='h-4 w-4 text-white rounded border-white/20 bg-[#1a1a1a] focus:ring-white disabled:opacity-50'
            type='checkbox'
            id='firma_completa'
            checked={chkCompleta}
            onChange={(e) => setChkCompleta(e.target.checked)}
            disabled={!isFormValid}
          />
          <label
            htmlFor='firma_completa'
            className={!isFormValid ? 'opacity-50' : ''}
          >
            He introducido mi firma completa
          </label>
        </div>
      </div>
    </div>
  );
}
