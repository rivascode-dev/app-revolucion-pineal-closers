import { createClient } from '@/lib/supabase/server'
import ContractsView from '@/sections/contratos/ContractsView'

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

  return <ContractsView contracts={contracts} />
}
