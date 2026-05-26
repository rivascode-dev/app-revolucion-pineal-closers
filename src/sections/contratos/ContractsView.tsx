'use client';

import { Plus, FileText, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { CopyButton } from '@/components/CopyButton';
import { ContractSearch } from '@/sections/contratos/ContractSearch';
import { Button } from '@/components/ui/button';
import { Contract } from '@/types/contract';
import { useContractsRealtime } from '@/hooks/useContractsRealtime';
import { useSearchParams } from 'next/navigation';

interface ContractsViewProps {
  contracts: Contract[] | null;
  isCloser: boolean;
  userId: string;
}

export default function ContractsView({
  contracts: initialContracts,
  isCloser,
  userId,
}: ContractsViewProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || undefined;
  const contracts = useContractsRealtime(
    initialContracts,
    isCloser,
    userId,
    search,
  );
  console.log('🚀 ~ ContractsView ~ contracts:', contracts);
  return (
    <div className='space-y-8 animate-fade-in'>
      {/* Header Section */}
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
        <div className='space-y-1 mt-10'>
          <h2 className='text-3xl font-extrabold tracking-tight text-foreground'>
            Contratos
          </h2>
          <p className='text-sm text-muted-foreground'>
            Gestiona, crea y comparte contratos con tus clientes.
          </p>
        </div>
        <Button asChild>
          <Link href='/dashboard/contratos/nuevo'>
            <Plus className='h-5 w-5' strokeWidth={3} />
            Nuevo Contrato
          </Link>
        </Button>
      </div>

      {/* Search Filter */}
      <div className='p-1.5 rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)]'>
        <ContractSearch />
      </div>

      {/* Table Container */}
      <div className='overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)]'>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-left'>
            <thead>
              <tr className='border-b border-border bg-muted/40 text-muted-foreground text-xs font-bold uppercase tracking-wider'>
                <th className='px-6 py-4'>Cliente</th>
                <th className='px-6 py-4'>Finanzas</th>
                <th className='px-6 py-4'>Estado</th>
                <th className='px-6 py-4'>Closer</th>

                <th className='px-6 py-4'>Creación</th>

                <th className='px-6 py-4 text-right'>Acciones</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border text-sm'>
              {contracts?.map((contract) => (
                <tr
                  key={contract.id}
                  className='hover:bg-muted/30 transition-colors duration-200 group'
                >
                  {/* Cliente */}
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shadow-inner'>
                        <FileText className='h-5 w-5' />
                      </div>
                      <div>
                        <span className='block font-bold text-foreground group-hover:translate-x-1 transition-transform duration-200'>
                          {contract.nombre_cliente}
                        </span>
                        <span className='block text-xs text-muted-foreground mt-0.5'>
                          {contract.telefono_cliente}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Finanzas */}
                  <td className='px-6 py-4'>
                    <div>
                      <span className='block font-bold text-foreground'>
                        {contract.numero_cuotas === 1
                          ? '1 Cuota'
                          : contract.numero_cuotas + ' Cuotas'}
                      </span>
                      <span className='block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5'>
                        {contract.numero_cuotas === 1
                          ? contract.importe_cuotas + ' ' + contract.moneda
                          : contract.importe_cuotas +
                            ' ' +
                            contract.moneda +
                            ' c/u'}
                      </span>
                    </div>
                  </td>

                  {/* Estado */}
                  <td className='px-6 py-4'>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                        contract.estado === 'firmado'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}
                    >
                      {contract.estado === 'firmado' ? (
                        <CheckCircle2 className='h-3.5 w-3.5' strokeWidth={3} />
                      ) : (
                        <Clock className='h-3.5 w-3.5' strokeWidth={3} />
                      )}
                      {contract.estado}
                    </span>
                  </td>

                  {/* Closer */}
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div>
                        <span className='block font-bold text-foreground group-hover:translate-x-1 transition-transform duration-200'>
                          {contract.user_profiles?.closer_name || 'Sin asignar'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Creación */}
                  <td className='px-6 py-4'>
                    <div>
                      <span className='block font-medium text-foreground'>
                        {new Date(contract.created_at).toLocaleDateString(
                          'es-ES',
                        )}
                      </span>
                      <span className='block text-xs text-muted-foreground mt-0.5'>
                        {new Date(contract.created_at).toLocaleTimeString(
                          'es-ES',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )}
                      </span>
                    </div>
                  </td>

                  {/* Acciones */}
                  <td className='px-6 py-4 text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      <CopyButton id={contract.id} />
                      <Link
                        href={`/contrato/${contract.id}`}
                        target='_blank'
                        className='p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
                        title='Ver Contrato'
                      >
                        <FileText className='h-[18px] w-[18px]' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {(!contracts || contracts.length === 0) && (
                <tr>
                  <td colSpan={5} className='px-6 py-16 text-center'>
                    <div className='flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto'>
                      <div className='w-16 h-16 rounded-2xl bg-muted text-muted-foreground/40 flex items-center justify-center shadow-inner'>
                        <FileText className='h-8 w-8' />
                      </div>
                      <div className='space-y-1'>
                        <p className='font-bold text-foreground'>
                          No se encontraron contratos registrados
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Comienza creando un contrato personalizado para tu
                          cliente.
                        </p>
                      </div>
                      <Button asChild variant='outline' className='mt-2'>
                        <Link href='/dashboard/contratos/nuevo'>
                          Crear el primero ahora
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
