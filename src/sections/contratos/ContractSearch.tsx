'use client'

import { Search } from 'lucide-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export function ContractSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="relative flex-1 w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
      <input 
        type="text" 
        placeholder="Buscar por nombre de cliente..." 
        defaultValue={searchParams.get('search')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-gray-700"
      />
      {isPending && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-white/10 border-t-white/50 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
