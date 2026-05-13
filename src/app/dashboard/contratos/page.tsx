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
          <h1 className="text-4xl font-black tracking-tight text-white">Contratos</h1>
          <p className="text-gray-500 mt-2">Gestiona, crea y comparte contratos con tus clientes.</p>
        </div>
        <Link 
          href="/dashboard/contratos/nuevo" 
          className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          Nuevo Contrato
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#0a0a0a] border border-white/5 p-4 rounded-2xl">
        <ContractSearch />
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-3 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all">
            <Filter size={16} />
            Filtros
          </button>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Cliente</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Finanzas</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Estado</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Creación</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {contracts?.map((contract) => (
                <tr key={contract.id} className="hover:bg-white/[0.01] transition-all group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:translate-x-1 transition-transform">{contract.nombre_cliente}</div>
                        <div className="text-xs text-gray-500 font-medium">{contract.telefono_cliente}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="font-bold text-white">€{contract.importe}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{contract.numero_cuotas} cuotas</div>
                  </td>
                  <td className="p-6">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      contract.estado === 'firmado' 
                        ? "bg-green-400/5 text-green-400 border-green-400/10" 
                        : "bg-amber-400/5 text-amber-400 border-amber-400/10"
                    )}>
                      {contract.estado === 'firmado' ? <CheckCircle2 size={12} strokeWidth={3} /> : <Clock size={12} strokeWidth={3} />}
                      {contract.estado}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-sm text-gray-400 font-medium">{new Date(contract.created_at).toLocaleDateString('es-ES')}</div>
                    <div className="text-[10px] text-gray-600 font-bold uppercase tracking-tight">{new Date(contract.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-end gap-2">
                      <CopyButton id={contract.id} />
                      <Link 
                        href={`/contrato/${contract.id}`} 
                        target="_blank"
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-all border border-transparent hover:border-white/5"
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
                      <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-gray-700">
                        <FileText size={32} />
                      </div>
                      <p className="text-gray-500 font-medium">No se encontraron contratos registrados.</p>
                      <Link href="/dashboard/contratos/nuevo" className="text-white font-bold text-sm underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all">
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
