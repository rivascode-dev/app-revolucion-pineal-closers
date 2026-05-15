'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useColorScheme } from '@mui/material/styles';
import { IconButton, Skeleton } from '@mui/material';

export function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 2 }} />;
  }

  return (
    <IconButton
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      aria-label='Cambiar tema'
      sx={{
        width: 40,
        height: 40,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'action.hover',
        },
        transition: 'all 0.2s',
      }}
    >
      {mode === 'dark' ? (
        <Sun size={20} color="#f59e0b" />
      ) : (
        <Moon size={20} color="#60a5fa" />
      )}
    </IconButton>
  );
}
