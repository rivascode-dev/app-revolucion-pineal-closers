import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-[#050505]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar userEmail={user.email || ''} />
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
