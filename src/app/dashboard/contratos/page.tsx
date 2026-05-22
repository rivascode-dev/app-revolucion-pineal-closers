import { createClient } from '@/lib/supabase/server'
import ContractsView from '@/sections/contratos/ContractsView'
import { redirect } from 'next/navigation'

interface PageProps {
  searchParams: Promise<{ search?: string }>
}

export default async function ContractsPage({ searchParams }: PageProps) {
  const { search } = await searchParams
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isCloser = profile?.role === 'closers'
  
  let query = supabase
    .from('contratos')
    .select('*')
    .order('created_at', { ascending: false })

  if (isCloser) {
    query = query.eq('user_id', user.id)
  }

  if (search) {
    query = query.ilike('nombre_cliente', `%${search}%`)
  }

  const { data: contracts } = await query

  return <ContractsView contracts={contracts} isCloser={isCloser} userId={user.id} />
}
