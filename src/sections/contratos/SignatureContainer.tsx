'use client';

import { useState } from 'react';
import { SignaturePad } from '@/components/SignaturePad';
import { signContract } from '@/actions/contracts';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Box, Paper, Typography, Stack, TextField, Divider, Checkbox, FormControlLabel } from '@mui/material';

export function SignatureContainer({ id }: { id: string }) {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [chkNombre, setChkNombre] = useState(false);
  const [chkCompleta, setChkCompleta] = useState(false);

  const isFormValid = nombre.trim() !== '' && fecha.trim() !== '';

  const handleSign = async (signatureData: string) => {
    const result = await signContract(id, signatureData, nombre, fecha);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Contrato firmado correctamente');
      router.refresh();
    }
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6">
            A continuación completa los pasos para firmar el acuerdo:
          </Typography>
          <Typography variant="overline" color="step" sx={{ mt: 2 }}>
            PASO 1: Ingrese sus datos personales
          </Typography>
        </Box>

        <Stack spacing={1}>
          <Typography
            variant="overline"
            component="label"
            htmlFor="nombre_cliente_contrato"
            color="label"
          >
            Nombre Completo
          </Typography>
          <TextField
            id="nombre_cliente_contrato"
            name="nombre_cliente_contrato"
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan Antonio Pérez"
          />
        </Stack>

        <Stack spacing={1}>
          <Typography
            variant="overline"
            component="label"
            htmlFor="fecha_nacimiento_cliente"
            color="label"
          >
            Fecha de nacimiento
          </Typography>
          <TextField
            id="fecha_nacimiento_cliente"
            name="fecha_nacimiento_cliente"
            type="date"
            required
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </Stack>
      </Stack>

      <Stack spacing={3}>
        <Typography variant="overline" color="step">
          PASO 2: Revise y valide que sus datos estan correctos
        </Typography>
        {nombre && fecha && (
          <Box component={Paper} variant="info">
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Yo, <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>{nombre}</Box>{' '}
              nacido el <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>{fecha}</Box>{' '}
              prometo guardarme una copia de este acuerdo una vez lo haya firmado.
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Yo,{' '}
              <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
                {nombre || '[Nombre]'}
              </Box>{' '}
              al firmar este acuerdo confirmo haber leído y ser consciente de cada uno de los puntos mencionados en él y doy mi palabra de cumplir con ellos con total firmeza e integridad.
            </Typography>
            <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic' }}>
              Firmo a continuación como prueba de mi compromiso con cada uno de ellos.
            </Typography>
          </Box>
        )}
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ alignItems: { md: 'center' }, justifyContent: 'space-between' }} spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="overline" color="step">
            PASO 3: Aceptación y Firma
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Por favor, estampa tu firma a continuación para formalizar el acuerdo.
          </Typography>
        </Stack>
        <Divider sx={{ flex: 1, display: { xs: 'none', md: 'block' }, mx: 4 }} />
      </Stack>

      <SignaturePad
        onSign={handleSign}
        disabled={!isFormValid || !chkNombre || !chkCompleta}
      />

      <Stack spacing={2}>
        <FormControlLabel
          control={
            <Checkbox
              id="firma_nombre"
              checked={chkNombre}
              onChange={(e) => setChkNombre(e.target.checked)}
              disabled={!isFormValid}
            />
          }
          label="He ingresado mi/s nombre/s y apellido/s tal como aparecen en mi documento de identidad"
          sx={{ opacity: !isFormValid ? 0.5 : 1 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              id="firma_completa"
              checked={chkCompleta}
              onChange={(e) => setChkCompleta(e.target.checked)}
              disabled={!isFormValid}
            />
          }
          label="He introducido mi firma completa"
          sx={{ opacity: !isFormValid ? 0.5 : 1 }}
        />
      </Stack>
    </Stack>
  );
}
