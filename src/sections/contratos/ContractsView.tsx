'use client';

import { Plus, FileText, CheckCircle2, Clock, Filter } from 'lucide-react';
import Link from 'next/link';
import { CopyButton } from '@/components/CopyButton';
import { ContractSearch } from '@/sections/contratos/ContractSearch';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Stack,
  IconButton,
  Link as MuiLink,
} from '@mui/material';

interface ContractsViewProps {
  contracts: any[] | null;
}

export default function ContractsView({ contracts }: ContractsViewProps) {
  return (
    <Stack spacing={4}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{ alignItems: { md: 'flex-end' }, justifyContent: 'space-between' }}
        spacing={3}
      >
        <Box>
          <Typography variant='h4'>Contratos</Typography>
          <Typography variant='body1' color='text.secondary' sx={{ mt: 1 }}>
            Gestiona, crea y comparte contratos con tus clientes.
          </Typography>
        </Box>
        <Button
          component={Link}
          href='/dashboard/contratos/nuevo'
          variant='contained'
          startIcon={<Plus size={20} strokeWidth={3} />}
        >
          Nuevo Contrato
        </Button>
      </Stack>

      <Paper>
        <ContractSearch />
      </Paper>

      <TableContainer component={Paper} elevation={4}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {['Cliente', 'Finanzas', 'Estado', 'Creación'].map((head) => (
                <TableCell key={head}>{head}</TableCell>
              ))}
              <TableCell align='right'>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts?.map((contract) => (
              <TableRow key={contract.id} hover>
                <TableCell sx={{ p: 3 }}>
                  <Stack
                    direction='row'
                    spacing={2}
                    sx={{ alignItems: 'center' }}
                  >
                    <Avatar sx={{ width: 40, height: 40, borderRadius: 3 }}>
                      <FileText size={20} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant='subtitle2'
                        color='text.primary'
                        sx={{
                          transition: 'transform 0.2s',
                          '&:hover': { transform: 'translateX(4px)' },
                        }}
                      >
                        {contract.nombre_cliente}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {contract.telefono_cliente}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2' color='text.primary'>
                    €{contract.importe_cuotas}
                  </Typography>
                  <Typography variant='overline' color='text.secondary'>
                    {contract.numero_cuotas} cuotas
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={
                      contract.estado === 'firmado' ? (
                        <CheckCircle2 size={12} strokeWidth={3} />
                      ) : (
                        <Clock size={12} strokeWidth={3} />
                      )
                    }
                    label={contract.estado}
                    color={
                      contract.estado === 'firmado' ? 'success' : 'warning'
                    }
                  />
                </TableCell>
                <TableCell>
                  <Typography variant='body2' color='text.primary'>
                    {new Date(contract.created_at).toLocaleDateString('es-ES')}
                  </Typography>
                  <Typography variant='caption' sx={{ mb: 0 }}>
                    {new Date(contract.created_at).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <Stack
                    direction='row'
                    spacing={1}
                    sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
                  >
                    <CopyButton id={contract.id} />
                    <IconButton
                      component={Link}
                      href={`/contrato/${contract.id}`}
                      target='_blank'
                      title='Ver Contrato'
                    >
                      <FileText size={18} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {(!contracts || contracts.length === 0) && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Stack
                    spacing={2}
                    sx={{ alignItems: 'center', justifyContent: 'center', py: 10 }}
                  >
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: 'action.hover',
                        color: 'text.secondary',
                        opacity: 0.3,
                        borderRadius: 3,
                      }}
                    >
                      <FileText size={32} />
                    </Avatar>
                    <Typography variant='body1' color='text.secondary'>
                      No se encontraron contratos registrados.
                    </Typography>
                    <MuiLink component={Link} href='/dashboard/contratos/nuevo'>
                      Crear el primero ahora
                    </MuiLink>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
