'use client';

import { FileText, CheckCircle2, Clock, Euro, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Contract } from '@/types/contract';
import { useContractsRealtime } from '@/hooks/useContractsRealtime';

export default function DashboardView({
  contracts: initialContracts,
  isCloser,
  userId,
}: {
  contracts: Contract[] | null;
  isCloser: boolean;
  userId: string;
}) {
  const contracts = useContractsRealtime(initialContracts, isCloser, userId);

  const stats = {
    total: contracts?.length || 0,
    signed: contracts?.filter((c) => c.estado === 'firmado').length || 0,
    pending: contracts?.filter((c) => c.estado === 'pendiente').length || 0,
    totalRevenue:
      contracts
        ?.filter((c) => c.estado === 'firmado')
        .reduce((acc, c) => acc + (Number(c.importe_cuotas) || 0), 0) || 0,
  };

  const cards = [
    {
      name: 'Total Contratos',
      value: stats.total,
      icon: FileText,
      colorClass:
        'text-blue-500 bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20',
    },
    {
      name: 'Firmados',
      value: stats.signed,
      icon: CheckCircle2,
      colorClass:
        'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20',
    },
    {
      name: 'Pendientes',
      value: stats.pending,
      icon: Clock,
      colorClass:
        'text-amber-500 bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20',
    },
    // {
    //   name: 'Ingresos Totales',
    //   value: `€${stats.totalRevenue.toLocaleString('es-ES')}`,
    //   icon: Euro,
    //   colorClass: 'text-purple-500 bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/20',
    // },
  ];

  const completionPercentage = Math.min((stats.signed / 20) * 100, 100);

  return (
    <div className='space-y-8 animate-fade-in'>
      {/* Header */}
      <div className='space-y-1 mt-10'>
        <h2 className='text-3xl font-extrabold tracking-tight text-foreground'>
          Dashboard
        </h2>
        <p className='text-sm text-muted-foreground'>
          Resumen general del rendimiento de cierres.
        </p>
      </div>

      {/* Tarjetas Estadísticas */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {cards.map((card) => (
          <div
            key={card.name}
            className='p-6 rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
          >
            <div className='flex items-start justify-between mb-4'>
              <div className={`p-3 rounded-xl border ${card.colorClass}`}>
                <card.icon className='h-6 w-6' />
              </div>
              <TrendingUp className='h-4 w-4 text-muted-foreground/40' />
            </div>
            <div>
              <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
                {card.name}
              </p>
              <h3 className='text-2xl font-black text-foreground mt-1'>
                {card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Inferior: Actividad Reciente + Objetivo Mensual */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* Actividad Reciente */}
        <div className='lg:col-span-8 p-6 rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex flex-col'>
          <h3 className='text-lg font-bold text-foreground mb-4'>
            Actividad Reciente
          </h3>
          <div className='space-y-3 flex-1'>
            {contracts?.slice(0, 5).map((contract) => (
              <div
                key={contract.id}
                className='flex items-center justify-between p-4 rounded-xl border border-border bg-accent/30 dark:bg-accent/10 hover:border-muted-foreground/30 transition-all duration-300 group'
              >
                <div className='flex items-center gap-4'>
                  <div className='w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold shadow-inner'>
                    <FileText className='h-5 w-5' />
                  </div>
                  <div>
                    <h4 className='text-sm font-bold text-foreground leading-tight'>
                      {contract.nombre_cliente}
                    </h4>
                    <p className='text-xs text-muted-foreground mt-0.5'>
                      {contract.numero_cuotas === 1
                        ? '1 Cuota'
                        : contract.numero_cuotas + ' Cuotas'}{' '}
                      •{' '}
                      {contract.numero_cuotas === 1
                        ? contract.importe_cuotas + ' ' + contract.moneda
                        : contract.importe_cuotas +
                          ' ' +
                          contract.moneda +
                          ' c/u'}{' '}
                    </p>
                  </div>
                </div>
                <div className='text-right flex flex-col items-end gap-1.5'>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                      contract.estado === 'firmado'
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}
                  >
                    {contract.estado}
                  </span>
                  <span className='text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80'>
                    {new Date(contract.created_at).toLocaleDateString('es-ES')}
                  </span>
                </div>
              </div>
            ))}
            {(!contracts || contracts.length === 0) && (
              <div className='flex flex-col items-center justify-center py-12 text-center'>
                <FileText className='h-10 w-10 text-muted-foreground/30 mb-2' />
                <p className='text-sm text-muted-foreground'>
                  No hay actividad reciente.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Objetivo Mensual */}
        <div className='lg:col-span-4 p-6 rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex flex-col'>
          <h3 className='text-lg font-bold text-foreground'>
            Objetivo Mensual
          </h3>
          <p className='text-xs text-muted-foreground mt-0.5 mb-6'>
            Progreso basado en contratos firmados.
          </p>

          {/* SVG Progreso Circular */}
          <div className='relative w-48 h-48 mx-auto mb-6 flex items-center justify-center'>
            <svg className='w-full h-full -rotate-90'>
              {/* Círculo de fondo */}
              <circle
                cx='96'
                cy='96'
                r='80'
                stroke='currentColor'
                strokeWidth='10'
                fill='transparent'
                className='text-muted/40'
              />
              {/* Círculo de progreso */}
              <circle
                cx='96'
                cy='96'
                r='80'
                stroke='currentColor'
                strokeWidth='10'
                fill='transparent'
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={
                  2 * Math.PI * 80 * (1 - completionPercentage / 100)
                }
                className='text-primary transition-all duration-1000 ease-out'
              />
            </svg>
            <div className='absolute flex flex-col items-center justify-center'>
              <span className='text-3xl font-black text-foreground'>
                {Math.round(completionPercentage)}%
              </span>
              <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1'>
                Completado
              </span>
            </div>
          </div>

          {/* Estado de la meta */}
          <div className='mt-auto space-y-4'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-bold text-foreground'>
                Meta: 20 cierres
              </span>
              <span className='text-muted-foreground'>
                {stats.signed} de 20
              </span>
            </div>
            <Button asChild className='w-full py-2.5 rounded-xl font-bold'>
              <Link href='/dashboard/contratos'>Gestionar Contratos</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
