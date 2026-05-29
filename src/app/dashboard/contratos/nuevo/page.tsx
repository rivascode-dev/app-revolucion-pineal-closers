'use client';

import { useTransition, useState } from 'react';
import { createContract } from './actions';
import {
  User,
  Hash,
  Send,
  ArrowLeft,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const CURRENCIES = ['EUR', 'USD', 'MXN', 'ARS', 'PEN'];

const TYPE_OF_CONTRACTS = [
  {
    name: 'Seleccione un tipo de contrato',
    value: '',
  },
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

const contractSchema = z.object({
  nombre_cliente: z.string().min(1, 'El nombre completo es requerido'),
  telefono_cliente: z
    .string()
    .min(1, 'El teléfono es requerido')
    .regex(
      /^\d+$/,
      'El WhatsApp debe contener solo números, sin espacios ni prefijos (+)',
    ),
  email_cliente: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('El formato de correo no es válido'),
  tipo_contrato: z.string().min(1, 'El tipo de contrato es requerido'),
  moneda: z.string().min(1, 'La moneda es requerida'),
  importe_total: z
    .string()
    .min(1, 'El importe es requerido')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      'El importe debe ser mayor a 0',
    ),
  importe_cuotas: z
    .string()
    .min(1, 'El importe es requerido')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      'El importe debe ser mayor a 0',
    ),
  numero_cuotas: z.coerce
    .number()
    .int('El número de cuotas debe ser un número entero')
    .min(1, 'Mínimo 1 cuota'),
  dia_cobro: z.coerce
    .number()
    .min(1, 'El día de cobro debe ser al menos 1')
    .max(31, 'El día de cobro no puede ser mayor a 31'),
});
// .refine(
//   (data) => {
//     const importe_total = Number(data.importe_total);
//     const numero_cuotas = Number(data.numero_cuotas);
//     const importe_cuotas = Number(data.importe_cuotas);
//     if (isNaN(importe_total) || isNaN(numero_cuotas) || isNaN(importe_cuotas))
//       return true;
//     return Math.abs(importe_total - numero_cuotas * importe_cuotas) < 0.01;
//   },
//   {
//     message:
//       'El importe total debe ser igual al número de cuotas por el importe de cuota',
//     path: ['importe_cuotas'],
//   },
// );

type ContractFormValues = z.infer<typeof contractSchema>;

export default function NewContractPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: zodResolver(contractSchema),
    mode: 'onTouched',
    defaultValues: {
      nombre_cliente: '',
      telefono_cliente: '',
      email_cliente: '',
      tipo_contrato: TYPE_OF_CONTRACTS[0].value,
      moneda: CURRENCIES[0],
      importe_total: '',
      importe_cuotas: '',
      numero_cuotas: 1,
      dia_cobro: 1,
    },
  });

  const handleEconomicFieldsChange = () => {
    trigger(['importe_total', 'importe_cuotas', 'numero_cuotas']);
  };

  const onSubmit = (data: ContractFormValues) => {
    setError(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, String(val));
    });

    startTransition(async () => {
      const result = await createContract(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  const getInputClassName = (fieldName: keyof ContractFormValues) => {
    const base =
      'w-full h-11 bg-background border rounded-xl px-4 text-sm font-medium transition-all placeholder:text-muted-foreground hover:bg-background/80 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary';
    const hasError = !!errors[fieldName];
    return `${base} ${hasError ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20' : 'border-border'}`;
  };

  return (
    <div className='max-w-4xl mx-auto py-8 px-4 animate-fade-in font-sans'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <Link
          href='/dashboard/contratos'
          className='flex items-center gap-2 group text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider'
        >
          <div className='w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all group-hover:bg-muted group-hover:border-foreground'>
            <ArrowLeft className='h-4.5 w-4.5' />
          </div>
          <span>Volver</span>
        </Link>

        <div className='hidden sm:block flex-1 h-[1px] bg-border mx-6' />

        <span className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground'>
          Paso 01 / Generación
        </span>
      </div>

      <div className='space-y-2 mb-8'>
        <h1 className='text-3xl font-extrabold tracking-tight text-foreground'>
          Nuevo Contrato
        </h1>
        <p className='text-sm text-muted-foreground'>
          Completa los detalles para generar el enlace de firma digital.
        </p>
      </div>

      <div className='relative bg-card border border-border rounded-[2rem] p-6 md:p-10 shadow-lg overflow-hidden'>
        {/* Decorative background element */}
        <div className='absolute top-0 right-0 w-32 h-32 bg-muted/30 border-l border-b border-border rounded-bl-[5rem] pointer-events-none opacity-50' />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='relative z-10 space-y-6'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Cliente */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-muted-foreground border-b border-border pb-2 mb-4'>
                <User className='h-4 w-4' />
                <span className='text-xs font-black uppercase tracking-wider'>
                  Información del Cliente
                </span>
              </div>

              <div className='space-y-1'>
                <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                  Nombre Completo
                </label>
                <input
                  id='nombre_cliente'
                  type='text'
                  placeholder='Ej: Juan Antonio Pérez'
                  className={getInputClassName('nombre_cliente')}
                  {...register('nombre_cliente')}
                />
                {errors.nombre_cliente && (
                  <span className='text-[11px] font-semibold text-red-500 mt-1 block'>
                    {errors.nombre_cliente.message}
                  </span>
                )}
              </div>

              <div className='space-y-1'>
                <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                  WhatsApp (con prefijo numérico y sin espacios)
                </label>
                <input
                  id='telefono_cliente'
                  type='tel'
                  placeholder='34600000000'
                  className={getInputClassName('telefono_cliente')}
                  {...register('telefono_cliente')}
                />
                {errors.telefono_cliente && (
                  <span className='text-[11px] font-semibold text-red-500 mt-1 block'>
                    {errors.telefono_cliente.message}
                  </span>
                )}
              </div>

              <div className='space-y-1'>
                <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                  Correo Electrónico
                </label>
                <input
                  id='email_cliente'
                  type='email'
                  placeholder='cliente@email.com'
                  className={getInputClassName('email_cliente')}
                  {...register('email_cliente')}
                />
                {errors.email_cliente && (
                  <span className='text-[11px] font-semibold text-red-500 mt-1 block'>
                    {errors.email_cliente.message}
                  </span>
                )}
              </div>

              <div className='space-y-1'>
                <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                  Tipo de Contrato
                </label>
                <div className='relative'>
                  <select
                    id='tipo_contrato'
                    className='w-full h-11 bg-background border border-border rounded-xl px-4 pr-10 text-foreground text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer'
                    {...register('tipo_contrato')}
                  >
                    {TYPE_OF_CONTRACTS.map((contract) => (
                      <option key={contract.value} value={contract.value}>
                        {contract.name}
                      </option>
                    ))}
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground'>
                    <ChevronDown className='h-4 w-4' />
                  </div>
                </div>
              </div>
            </div>

            {/* Condiciones */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-muted-foreground border-b border-border pb-2 mb-4'>
                <Hash className='h-4 w-4' />
                <span className='text-xs font-black uppercase tracking-wider'>
                  Condiciones Económicas
                </span>
              </div>

              <div className='grid grid-cols-3 gap-3'>
                <div className='space-y-1 col-span-2'>
                  <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                    Importe Total
                  </label>
                  <input
                    id='importe_total'
                    type='number'
                    step='0.01'
                    placeholder='0.00'
                    className={getInputClassName('importe_total')}
                    {...register('importe_total', {
                      onChange: handleEconomicFieldsChange,
                    })}
                  />
                  {errors.importe_total && (
                    <span className='text-[11px] font-semibold text-red-500 mt-1 block'>
                      {errors.importe_total.message}
                    </span>
                  )}
                </div>
                <div className='space-y-1 col-span-1'>
                  <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                    Moneda
                  </label>
                  <div className='relative'>
                    <select
                      id='moneda'
                      className='w-full h-11 bg-background border border-border rounded-xl px-3 pr-8 text-foreground text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer'
                      {...register('moneda')}
                    >
                      {CURRENCIES.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground'>
                      <ChevronDown className='h-3.5 w-3.5' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div className='space-y-1 col-span-1'>
                  <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                    Número de Cuotas
                  </label>
                  <input
                    id='numero_cuotas'
                    type='number'
                    placeholder='1'
                    className={getInputClassName('numero_cuotas')}
                    {...register('numero_cuotas', {
                      onChange: handleEconomicFieldsChange,
                    })}
                  />
                  {errors.numero_cuotas && (
                    <span className='text-[11px] font-semibold text-red-500 mt-1 block'>
                      {errors.numero_cuotas.message}
                    </span>
                  )}
                </div>
                <div className='space-y-1 col-span-1'>
                  <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                    Importe Cuota
                  </label>
                  <input
                    id='importe_cuotas'
                    type='number'
                    step='0.01'
                    placeholder='0.00'
                    className={getInputClassName('importe_cuotas')}
                    {...register('importe_cuotas', {
                      onChange: handleEconomicFieldsChange,
                    })}
                  />
                  {errors.importe_cuotas && (
                    <span className='text-[11px] font-semibold text-red-500 mt-1 block'>
                      {errors.importe_cuotas.message}
                    </span>
                  )}
                </div>
              </div>

              <div className='space-y-1'>
                <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                  Día de cobro
                </label>
                <input
                  id='dia_cobro'
                  type='number'
                  placeholder='1'
                  className={getInputClassName('dia_cobro')}
                  {...register('dia_cobro')}
                />
                {errors.dia_cobro && (
                  <span className='text-[11px] font-semibold text-red-500 mt-1 block'>
                    {errors.dia_cobro.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className='text-red-400 text-xs bg-red-400/5 p-4 rounded-xl border border-red-400/10'>
              {error}
            </div>
          )}

          <div className='pt-4'>
            <button
              type='submit'
              disabled={isPending || !isValid}
              className='w-full h-12 bg-foreground text-background text-sm font-black uppercase tracking-widest rounded-xl transition-all shadow-md hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2'
            >
              {isPending ? (
                <Loader2 className='h-5 w-5 animate-spin text-background' />
              ) : (
                <>
                  <span>Generar y Enviar Contrato</span>
                  <Send className='h-4 w-4' strokeWidth={3} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
