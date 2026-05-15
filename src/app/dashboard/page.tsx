import { createClient } from '@/lib/supabase/server';
import DashboardView from '@/sections/dashboard/DashboardView';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: contracts } = await supabase
    .from('contratos')
    .select('*')
    .order('created_at', { ascending: false });

  return <DashboardView contracts={contracts} />;
}
