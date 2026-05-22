import { createClient } from '@/lib/supabase/server';
import DashboardView from '@/sections/dashboard/DashboardView';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();

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
    .order('created_at', { ascending: false });

  if (isCloser) {
    query = query.eq('user_id', user.id);
  }

  const { data: contracts } = await query;

  return <DashboardView contracts={contracts} isCloser={isCloser} userId={user.id} />;
}
