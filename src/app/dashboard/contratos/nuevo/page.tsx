'use client';

import { useTransition, useState } from 'react';
import { createContract } from './actions';
import {
  User,
  Hash,
  Send,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { 
  Box, 
  Stack, 
  Typography, 
  TextField, 
  MenuItem, 
  Button, 
  Divider, 
  Alert,
  Paper,
  CircularProgress
} from '@mui/material';

const CURRENCIES = ['EUR', 'USD', 'MXN', 'ARS', 'PEN'];

const TYPE_OF_CONTRACTS = [
  {
    name: 'Acuerdo de Acceso (ADVANCED HEALERS)',
    value: 'acuerdo_acceso_advanced_healers',
  },
  { name: 'Alquimia Vilal (E.C.A)', value: 'alquimia_vilal_eca' },
  {
    name: 'Alquimia Vilal (ENERGY MASTER)',
    value: 'alquimia_vilal_energy_master',
  },
  {
    name: 'Oferta Iniciación (CON ACCESO VITALICIO)',
    value: 'oferta_iniciacion_vitalicio',
  },
];

export default function NewContractPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await createContract(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <Box sx={{ maxWidth: 'md', mx: 'auto', py: 4 }}>
      {/* Header */}
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 5 }}>
        <Button
          component={Link}
          href="/dashboard/contratos"
          startIcon={
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <ArrowLeft size={18} />
            </Box>
          }
          sx={{
            color: 'text.secondary',
            '&:hover': { 
              color: 'text.primary', 
              bgcolor: 'transparent',
              '& .MuiBox-root': {
                bgcolor: 'action.hover',
                borderColor: 'text.primary',
              }
            },
            fontSize: '0.875rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Volver
        </Button>
        
        <Divider sx={{ flex: 1, mx: 3, display: { xs: 'none', sm: 'block' } }} />
        
        <Typography 
          variant="caption" 
          sx={{ 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: '0.3em', 
            color: 'text.secondary' 
          }}
        >
          Paso 01 / Generación
        </Typography>
      </Stack>

      <Stack spacing={2} sx={{ mb: 6 }}>
        <Typography variant="h3" color="text.primary">
          Nuevo Contrato
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Completa los detalles para generar el enlace de firma digital.
        </Typography>
      </Stack>

      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 4, md: 6 }, 
          borderRadius: 6, 
          position: 'relative', 
          overflow: 'hidden',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Decorative element */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: 128, 
            height: 128, 
            bgcolor: 'action.hover', 
            borderBottomLeftRadius: 80,
            borderLeft: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'divider',
            opacity: 0.5
          }} 
        />

        <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mb: 4 }}>
            
            {/* Cliente */}
            <Stack spacing={3}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', color: 'text.secondary', mb: 1 }}>
                <User size={16} />
                <Typography variant="overline">
                  Información del Cliente
                </Typography>
              </Stack>
              
              <TextField
                id="nombre_cliente"
                name="nombre_cliente"
                label="Nombre Completo"
                placeholder="Ej: Juan Antonio Pérez"
                required
                fullWidth
                variant="outlined"
                slotProps={{ inputLabel: { shrink: true } }}
              />

              <TextField
                id="telefono_cliente"
                name="telefono_cliente"
                label="WhatsApp (con prefijo)"
                placeholder="+34 600 000 000"
                type="tel"
                required
                fullWidth
                variant="outlined"
                slotProps={{ inputLabel: { shrink: true } }}
              />

              <TextField
                id="tipo_contrato"
                name="tipo_contrato"
                select
                label="Tipo de Contrato"
                required
                fullWidth
                variant="outlined"
                slotProps={{ inputLabel: { shrink: true } }}
                defaultValue={TYPE_OF_CONTRACTS[0].value}
              >
                {TYPE_OF_CONTRACTS.map((contract) => (
                  <MenuItem key={contract.value} value={contract.value}>
                    {contract.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {/* Condiciones */}
            <Stack spacing={3}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', color: 'text.secondary', mb: 1 }}>
                <Hash size={16} />
                <Typography variant="overline">
                  Condiciones Económicas
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={2}>
                <TextField
                  id="moneda"
                  name="moneda"
                  select
                  label="Moneda"
                  required
                  variant="outlined"
                  slotProps={{ inputLabel: { shrink: true } }}
                  defaultValue={CURRENCIES[0]}
                  sx={{ width: '40%' }}
                >
                  {CURRENCIES.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id="importe"
                  name="importe"
                  type="number"
                  slotProps={{ htmlInput: { step: '0.01' }, inputLabel: { shrink: true } }}
                  label="Importe Total"
                  placeholder="0.00"
                  required
                  fullWidth
                  variant="outlined"
                />
              </Stack>

              <TextField
                id="numero_cuotas"
                name="numero_cuotas"
                select
                label="Número de Cuotas"
                required
                fullWidth
                variant="outlined"
                slotProps={{ inputLabel: { shrink: true } }}
                defaultValue={1}
              >
                {[1, 2, 3, 4, 6, 12].map((n) => (
                  <MenuItem key={n} value={n}>
                    {n} {n === 1 ? 'Cuota (Pago Único)' : 'Cuotas'}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="dia_cobro"
                name="dia_cobro"
                type="number"
                variant="outlined"
                label="Día de cobro"
                placeholder="1"
                required
                fullWidth
                slotProps={{ htmlInput: { min: 1, max: 31 }, inputLabel: { shrink: true } }}
                defaultValue={1}
              />
            </Stack>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ pt: 3 }}>
            <Button
              type="submit"
              disabled={isPending}
              variant="contained"
              fullWidth
              size="large"
              endIcon={!isPending && <Send size={18} strokeWidth={3} />}
              sx={{
                py: 2,
                borderRadius: 4,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                boxShadow: 4,
                bgcolor: 'text.primary',
                color: 'background.paper',
                '&:hover': {
                  bgcolor: 'text.secondary',
                }
              }}
            >
              {isPending ? <CircularProgress size={24} color="inherit" /> : 'Generar y Obtener Enlace'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

