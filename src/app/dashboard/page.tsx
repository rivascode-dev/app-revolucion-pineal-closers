import { createClient } from '@/lib/supabase/server'
import { FileText, CheckCircle2, Clock, Euro, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: contracts } = await supabase
    .from('contratos')
    .select('*')
    .order('created_at', { ascending: false })

  const stats = {
    total: contracts?.length || 0,
    signed: contracts?.filter(c => c.estado === 'firmado').length || 0,
    pending: contracts?.filter(c => c.estado === 'pendiente').length || 0,
    totalRevenue: contracts?.filter(c => c.estado === 'firmado').reduce((acc, c) => acc + (Number(c.importe) || 0), 0) || 0
  }

  const cards = [
    { name: 'Total Contratos', value: stats.total, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Firmados', value: stats.signed, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10' },
    { name: 'Pendientes', value: stats.pending, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { name: 'Ingresos Totales', value: `€${stats.totalRevenue.toLocaleString()}`, icon: Euro, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ]

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-foreground">Dashboard</h1>
        <p className="text-secondary">Resumen general del rendimiento de cierres.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.name} className="bg-surface border border-border p-6 rounded-[2rem] hover:bg-surface-hover transition-all group shadow-sm hover:shadow-md">
            <div className="flex items-start justify-between mb-4">
              <div className={cn("p-3 rounded-2xl", card.bg)}>
                <card.icon className={card.color} size={24} />
              </div>
              <TrendingUp size={16} className="text-secondary group-hover:text-foreground transition-colors" />
            </div>
            <p className="text-sm font-medium text-secondary">{card.name}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border p-8 rounded-[2rem] shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-foreground">Actividad Reciente</h3>
          <div className="space-y-6">
            {contracts?.slice(0, 5).map((contract) => (
              <div key={contract.id} className="flex items-center justify-between p-4 bg-surface-hover rounded-2xl border border-border hover:border-foreground/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border">
                    <FileText size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{contract.nombre_cliente}</p>
                    <p className="text-xs text-secondary">€{contract.importe} • {contract.numero_cuotas} cuotas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border",
                    contract.estado === 'firmado' 
                      ? "bg-green-400/5 text-green-500 border-green-500/20" 
                      : "bg-amber-400/5 text-amber-500 border-amber-500/20"
                  )}>
                    {contract.estado}
                  </p>
                  <p className="text-[10px] text-secondary mt-1">{new Date(contract.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {(!contracts || contracts.length === 0) && (
              <p className="text-center py-10 text-secondary italic">No hay actividad reciente.</p>
            )}
          </div>
        </div>

        <div className="bg-surface border border-border p-8 rounded-[2rem] flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-lg font-bold mb-2 text-foreground">Objetivo Mensual</h3>
            <p className="text-sm text-secondary mb-6">Progreso basado en contratos firmados.</p>
            
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-foreground/5"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={2 * Math.PI * 80 * (1 - Math.min(stats.signed / 20, 1))}
                  className="text-foreground transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-black text-foreground">{Math.round((stats.signed / 20) * 100)}%</p>
                <p className="text-[10px] text-secondary uppercase tracking-widest font-bold">Completado</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-xs">
              <span className="text-secondary font-medium">Meta: 20 cierres</span>
              <span className="text-foreground font-bold">{stats.signed} de 20</span>
            </div>
            <Link href="/dashboard/contratos" className="block w-full py-3 text-center bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-xl hover:opacity-90 transition-all uppercase tracking-widest shadow-lg">
              Gestionar Contratos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

