'use client';

import { useState } from 'react';
import { SignaturePad } from '@/components/SignaturePad';
import { signContractAction } from '@/actions/contracts';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signatureSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre completo es requerido'),
  fecha: z.string()
    .min(1, 'La fecha de nacimiento es requerida')
    .refine((val) => {
      const parsedDate = new Date(val);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return !isNaN(parsedDate.getTime()) && parsedDate <= today;
    }, 'La fecha de nacimiento no puede ser en el futuro'),
});

type SignatureFormValues = z.infer<typeof signatureSchema>;

export function SignatureContainer({ id }: { id: string }) {
  const router = useRouter();
  const [chkNombre, setChkNombre] = useState(false);
  const [chkCompleta, setChkCompleta] = useState(false);

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<SignatureFormValues>({
    resolver: zodResolver(signatureSchema),
    mode: 'onTouched',
    defaultValues: {
      nombre: '',
      fecha: '',
    },
  });

  const nombre = watch('nombre');
  const fecha = watch('fecha');
  const isFormValid = isValid;

  const handleSign = async (signatureData: string) => {
    const result = await signContractAction(id, signatureData, nombre, fecha);

    if (!result.success && result.error) {
      toast.error(result.error);
    } else {
      toast.success('Contrato firmado correctamente');
      router.refresh();
    }
  };

  const getInputClassName = (fieldName: keyof SignatureFormValues) => {
    const base = 'w-full px-4 py-3 rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 text-sm';
    const hasError = !!errors[fieldName];
    return `${base} ${hasError ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200'}`;
  };

  return (
    <div className="space-y-8 text-left">
      {/* Paso 1 */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-800 leading-tight">
            A continuación completa los pasos para firmar el acuerdo:
          </h3>
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-2">
            PASO 1: Ingrese sus datos personales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="nombre_cliente_contrato"
              className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider"
            >
              Nombre Completo
            </label>
            <input
              id="nombre_cliente_contrato"
              type="text"
              placeholder="Ej: Juan Antonio Pérez"
              className={getInputClassName('nombre')}
              {...register('nombre')}
            />
            {errors.nombre && (
              <span className="text-[11px] font-semibold text-red-500 mt-1 block">
                {errors.nombre.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="fecha_nacimiento_cliente"
              className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider"
            >
              Fecha de nacimiento
            </label>
            <input
              id="fecha_nacimiento_cliente"
              type="date"
              className={getInputClassName('fecha')}
              style={{ colorScheme: 'light' }}
              {...register('fecha')}
            />
            {errors.fecha && (
              <span className="text-[11px] font-semibold text-red-500 mt-1 block">
                {errors.fecha.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Paso 2 */}
      <div className="space-y-4">
        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
          PASO 2: Revise y valide que sus datos están correctos
        </p>
        {nombre && fecha ? (
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3">
            <p className="text-xs font-medium text-slate-600 leading-relaxed">
              Yo, <span className="font-extrabold text-slate-800">{nombre}</span> nacido el{' '}
              <span className="font-extrabold text-slate-800">{fecha}</span> prometo guardarme una copia de este acuerdo una vez lo haya firmado.
            </p>
            <p className="text-xs font-medium text-slate-600 leading-relaxed">
              Yo, <span className="font-extrabold text-slate-800">{nombre}</span> al firmar este acuerdo confirmo haber leído y ser consciente de cada uno de los puntos mencionados en él y doy mi palabra de cumplir con ellos con total firmeza e integridad.
            </p>
            <p className="text-[11px] font-bold italic text-slate-400">
              Firmo a continuación como prueba de mi compromiso con cada uno de ellos.
            </p>
          </div>
        ) : (
          <div className="p-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/30 text-center py-6">
            <p className="text-xs text-slate-400 font-medium">
              Por favor, complete sus datos en el Paso 1 para generar la declaración de firma.
            </p>
          </div>
        )}
      </div>

      {/* Paso 3 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
              PASO 3: Aceptación y Firma
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Por favor, estampa tu firma a continuación para formalizar el acuerdo.
            </p>
          </div>
          <div className="hidden md:block flex-1 h-px bg-slate-100" />
        </div>

        <SignaturePad
          onSign={handleSign}
          disabled={!isFormValid || !chkNombre || !chkCompleta}
        />

        <div className="space-y-3.5 pt-2">
          <label
            className={`flex items-start gap-3 cursor-pointer select-none group text-xs font-bold text-slate-600 leading-relaxed transition-opacity duration-200 ${
              !isFormValid ? 'opacity-40 cursor-not-allowed' : 'hover:text-slate-800'
            }`}
          >
            <input
              id="firma_nombre"
              type="checkbox"
              checked={chkNombre}
              onChange={(e) => setChkNombre(e.target.checked)}
              disabled={!isFormValid}
              className="mt-0.5 h-4.5 w-4.5 rounded border border-slate-300 bg-white text-primary focus:ring-primary/20 focus:ring-offset-0 focus:ring-2 cursor-pointer transition-all accent-primary"
              style={{ colorScheme: 'light' }}
            />
            <span>
              He ingresado mi/s nombre/s y apellido/s tal como aparecen en mi documento de identidad
            </span>
          </label>

          <label
            className={`flex items-start gap-3 cursor-pointer select-none group text-xs font-bold text-slate-600 leading-relaxed transition-opacity duration-200 ${
              !isFormValid ? 'opacity-40 cursor-not-allowed' : 'hover:text-slate-800'
            }`}
          >
            <input
              id="firma_completa"
              type="checkbox"
              checked={chkCompleta}
              onChange={(e) => setChkCompleta(e.target.checked)}
              disabled={!isFormValid}
              className="mt-0.5 h-4.5 w-4.5 rounded border border-slate-300 bg-white text-primary focus:ring-primary/20 focus:ring-offset-0 focus:ring-2 cursor-pointer transition-all accent-primary"
              style={{ colorScheme: 'light' }}
            />
            <span>He introducido mi firma completa</span>
          </label>
        </div>
      </div>
    </div>
  );
}
