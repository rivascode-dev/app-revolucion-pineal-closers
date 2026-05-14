import { createClient } from '@/lib/supabase/server'
import { Plus, FileText, CheckCircle2, Clock, Filter } from 'lucide-react'
import Link from 'next/link'
import { CopyButton } from '@/components/CopyButton'
import { ContractSearch } from '@/sections/contratos/ContractSearch'
import { cn } from '@/lib/utils'

interface PageProps {
  searchParams: Promise<{ search?: string }>
}

export default async function ContractsPage({ searchParams }: PageProps) {
  const { search } = await searchParams
  const supabase = await createClient()
  
  let query = supabase
    .from('contratos')
    .select('*')
    .order('created_at', { ascending: false })

  if (search) {
    query = query.ilike('nombre_cliente', `%${search}%`)
  }

  const { data: contracts } = await query

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Contratos</h1>
          <p className="text-secondary mt-2">Gestiona, crea y comparte contratos con tus clientes.</p>
        </div>
        <Link 
          href="/dashboard/contratos/nuevo" 
          className="flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          Nuevo Contrato
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface border border-border p-4 rounded-2xl">
        <ContractSearch />
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 bg-surface-hover border border-border px-4 py-3 rounded-xl text-xs font-bold text-secondary hover:text-foreground transition-all">
            <Filter size={16} />
            Filtros
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-foreground/[0.02]">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Cliente</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Finanzas</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Estado</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Creación</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contracts?.map((contract) => (
                <tr key={contract.id} className="hover:bg-surface-hover transition-all group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-secondary group-hover:text-foreground transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-foreground group-hover:translate-x-1 transition-transform">{contract.nombre_cliente}</div>
                        <div className="text-xs text-secondary font-medium">{contract.telefono_cliente}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="font-bold text-foreground">€{contract.importe}</div>
                    <div className="text-[10px] text-secondary font-bold uppercase tracking-widest">{contract.numero_cuotas} cuotas</div>
                  </td>
                  <td className="p-6">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      contract.estado === 'firmado' 
                        ? "bg-green-400/5 text-green-500 border-green-500/20" 
                        : "bg-amber-400/5 text-amber-500 border-amber-500/20"
                    )}>
                      {contract.estado === 'firmado' ? <CheckCircle2 size={12} strokeWidth={3} /> : <Clock size={12} strokeWidth={3} />}
                      {contract.estado}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-sm text-foreground/80 font-medium">{new Date(contract.created_at).toLocaleDateString('es-ES')}</div>
                    <div className="text-[10px] text-secondary font-bold uppercase tracking-tight">{new Date(contract.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-end gap-2">
                      <CopyButton id={contract.id} />
                      <Link 
                        href={`/contrato/${contract.id}`} 
                        target="_blank"
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-hover text-secondary hover:text-foreground transition-all border border-transparent hover:border-border"
                        title="Ver Contrato"
                      >
                        <FileText size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {(!contracts || contracts.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-3xl bg-surface-hover flex items-center justify-center text-secondary/30">
                        <FileText size={32} />
                      </div>
                      <p className="text-secondary font-medium">No se encontraron contratos registrados.</p>
                      <Link href="/dashboard/contratos/nuevo" className="text-foreground font-bold text-sm underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground transition-all">
                        Crear el primero ahora
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
