'use client';

import { Search, Loader2 } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function ContractSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        placeholder="Buscar por nombre de cliente..."
        defaultValue={searchParams.get('search')?.toString() || ''}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full h-11 rounded-xl border border-border bg-background/50 pl-11 pr-10 text-sm font-medium transition-all placeholder:text-muted-foreground hover:bg-background/80 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
      {isPending && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
