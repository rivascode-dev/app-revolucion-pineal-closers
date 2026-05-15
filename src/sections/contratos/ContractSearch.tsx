'use client';

import { Search } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

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
    <Box>
      <TextField
        placeholder='Buscar por nombre de cliente...'
        defaultValue={searchParams.get('search')?.toString() || ''}
        onChange={(e) => handleSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <Search size={18} />
              </InputAdornment>
            ),
            endAdornment: isPending ? (
              <InputAdornment position='end'>
                <CircularProgress size={16} color='inherit' />
              </InputAdornment>
            ) : null,
          },
        }}
      />
    </Box>
  );
}
