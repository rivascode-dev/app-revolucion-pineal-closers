import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar - Componente estático/navegación lateral */}
      <Sidebar />

      {/* Contenedor Principal */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 pl-20 md:pl-64">
        {/* Topbar - Navegación superior */}
        <Topbar userEmail={user.email || ''} />

        {/* Contenido Principal con Padding superior para compensar el Topbar fijo */}
        <main className="flex-1 p-4 md:p-8 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
