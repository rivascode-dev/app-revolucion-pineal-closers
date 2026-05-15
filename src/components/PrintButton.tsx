'use client';

import { Printer } from 'lucide-react';
import { Button } from '@mui/material';

export function PrintButton() {
  return (
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<Printer size={18} />}
      onClick={() => window.print()}
      sx={{
        mt: 3,
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 'medium',
        py: 1,
        px: 3,
        borderColor: 'divider',
        '&:hover': {
          borderColor: 'text.primary',
          backgroundColor: 'action.hover',
        }
      }}
    >
      Descargar como PDF
    </Button>
  );
}
