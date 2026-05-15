'use client';

import { FileText, CheckCircle2, Clock, Euro, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Stack,
  Card,
  Chip,
  Button,
  Avatar,
  Grid,
} from '@mui/material';

export default function DashboardView({
  contracts,
}: {
  contracts: any[] | null;
}) {
  const stats = {
    total: contracts?.length || 0,
    signed: contracts?.filter((c) => c.estado === 'firmado').length || 0,
    pending: contracts?.filter((c) => c.estado === 'pendiente').length || 0,
    totalRevenue:
      contracts
        ?.filter((c) => c.estado === 'firmado')
        .reduce((acc, c) => acc + (Number(c.importe) || 0), 0) || 0,
  };

  const cards = [
    {
      name: 'Total Contratos',
      value: stats.total,
      icon: FileText,
      color: 'info.main',
      bg: 'info.light',
    },
    {
      name: 'Firmados',
      value: stats.signed,
      icon: CheckCircle2,
      color: 'success.main',
      bg: 'success.light',
    },
    {
      name: 'Pendientes',
      value: stats.pending,
      icon: Clock,
      color: 'warning.main',
      bg: 'warning.light',
    },
    {
      name: 'Ingresos Totales',
      value: `€${stats.totalRevenue.toLocaleString('es-ES')}`,
      icon: Euro,
      color: 'secondary.main',
      bg: 'secondary.light',
    },
  ];

  const completionPercentage = Math.min((stats.signed / 20) * 100, 100);

  return (
    <Stack spacing={5} sx={{ animation: 'fadeIn 0.7s ease-in-out' }}>
      <Stack spacing={0.5}>
        <Typography variant='h3'>Dashboard</Typography>
        <Typography variant='body1' color='text.secondary'>
          Resumen general del rendimiento de cierres.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={card.name}>
            <Card sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.paper',
              borderColor: 'divider',
            }}>
              <Stack
                direction='row'
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? `${card.color}20`
                        : card.bg,
                    color: card.color,
                  }}
                >
                  <card.icon size={24} />
                </Box>
                <TrendingUp size={16} style={{ opacity: 0.5 }} />
              </Stack>
              <Typography variant='body2' color='text.secondary'>
                {card.name}
              </Typography>
              <Typography variant='h4' sx={{ mt: 0.5 }}>
                {card.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.paper',
              borderColor: 'divider',
            }}>
            <Typography variant='h6' sx={{ mb: 3 }}>
              Actividad Reciente
            </Typography>
            <Stack spacing={2}>
              {contracts?.slice(0, 5).map((contract) => (
                <Box
                  key={contract.id}
                  sx={{
                    display: 'flex',
                    direction: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'action.hover',
                    borderRadius: 1.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    p: 2,
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: 'text.disabled' },
                  }}
                >
                  <Stack
                    direction='row'
                    sx={{ alignItems: 'center' }}
                    spacing={2}
                  >
                    <Avatar>
                      <FileText size={18} />
                    </Avatar>
                    <Box>
                      <Typography variant='subtitle2'>
                        {contract.nombre_cliente}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        €{contract.importe} • {contract.numero_cuotas} cuotas
                      </Typography>
                    </Box>
                  </Stack>
                  <Box sx={{ textAlign: 'right' }}>
                    <Chip
                      label={contract.estado}
                      color={
                        contract.estado === 'firmado' ? 'success' : 'warning'
                      }
                      size='small'
                    />
                    <Typography
                      variant='caption'
                      sx={{
                        display: 'block',
                        mb: 0,
                        mt: 0.5,
                        fontSize: '0.625rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: 'text.secondary',
                      }}
                    >
                      {new Date(contract.created_at).toLocaleDateString(
                        'es-ES',
                      )}
                    </Typography>
                  </Box>
                </Box>
              ))}
              {(!contracts || contracts.length === 0) && (
                <Typography
                  variant='body2'
                  color='text.secondary'
                  align='center'
                  sx={{ py: 5 }}
                >
                  No hay actividad reciente.
                </Typography>
              )}
            </Stack>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.paper',
              borderColor: 'divider',
            }}
          >
            <Typography variant='h6' sx={{ mb: 1 }}>
              Objetivo Mensual
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
              Progreso basado en contratos firmados.
            </Typography>

            {/* Círculo SVG con texto centrado */}
            <Box
              sx={{
                position: 'relative',
                width: 192,
                height: 192,
                mx: 'auto',
                mb: 3,
                color: 'text.primary',
              }}
            >
              <svg
                style={{
                  width: '100%',
                  height: '100%',
                  transform: 'rotate(-90deg)',
                }}
              >
                <circle
                  cx='96'
                  cy='96'
                  r='80'
                  stroke='currentColor'
                  strokeWidth='12'
                  fill='transparent'
                  style={{ opacity: 0.1 }}
                />
                <circle
                  cx='96'
                  cy='96'
                  r='80'
                  stroke='currentColor'
                  strokeWidth='12'
                  fill='transparent'
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={
                    2 * Math.PI * 80 * (1 - completionPercentage / 100)
                  }
                  style={{ transition: 'all 1s ease-in-out' }}
                />
              </svg>
              {/* Overlay centrado sobre el SVG */}
              <Stack
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant='h4'
                  sx={{ lineHeight: 1, fontWeight: 900 }}
                >
                  {Math.round(completionPercentage)}%
                </Typography>
                <Typography
                  variant='overline'
                  color='text.secondary'
                  sx={{ lineHeight: 1.2, mt: 0.5, fontWeight: 700 }}
                >
                  Completado
                </Typography>
              </Stack>
            </Box>

            {/* Meta y botón al fondo */}
            <Stack spacing={2} sx={{ mt: 'auto' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant='body2' sx={{ fontWeight: 700 }}>
                  Meta: 20 cierres
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {stats.signed} de 20
                </Typography>
              </Box>
              <Button
                component={Link}
                href='/dashboard/contratos'
                variant='contained'
                fullWidth
              >
                Gestionar Contratos
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
