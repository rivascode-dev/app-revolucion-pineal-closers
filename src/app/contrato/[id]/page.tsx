import { createClient } from '@/lib/supabase/server';
import { contractTemplates } from '@/utils/contract-templates';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { SignatureContainer } from '@/sections/contratos/SignatureContainer';
import ReactMarkdown from 'react-markdown';
import { PrintButton } from '@/components/PrintButton';
import { Box, Container, Typography, Card, Stack, Paper } from '@mui/material';
import { LightModeWrapper } from '@/sections/contratos/LightModeWrapper';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ContractPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: contract, error } = await supabase
    .from('contratos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !contract) {
    notFound();
  }

  const rawTemplate =
    contractTemplates[contract.tipo_contrato] ||
    contractTemplates['acuerdo_acceso_advanced_healers'] ||
    '';

  const contractText = rawTemplate
    .replace(/\[NOMBRE_CLIENTE\]/g, contract.nombre_cliente)
    .replace(/\[TELEFONO_CLIENTE\]/g, contract.telefono_cliente)
    .replace(/\[IMPORTE\]/g, contract.importe)
    .replace(/\[NUMERO_CUOTAS\]/g, contract.numero_cuotas)
    .replace(/\[DIA_COBRO\]/g, contract.dia_cobro || '')
    .replace(/\[MONEDA\]/g, contract.moneda || '')
    .replace(
      /\[FECHA\]/g,
      new Date(contract.created_at).toLocaleDateString('es-ES'),
    );

  return (
    <LightModeWrapper>
      <Container>
        {/* Background patterns */}
        {/* <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            opacity: 0.4,
            '@media print': { display: 'none' },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '50%',
              height: '50%',
              bgcolor: 'primary.light',
              borderRadius: '50%',
              filter: 'blur(120px)',
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '-10%',
              left: '-10%',
              width: '50%',
              height: '50%',
              bgcolor: 'secondary.light',
              borderRadius: '50%',
              filter: 'blur(120px)',
              opacity: 0.5,
            }}
          />
        </Box> */}

        <Container
          maxWidth='md'
          sx={{
            position: 'relative',
            zIndex: 10,
            '@media print': { boxShadow: 'none', maxWidth: 'none', px: 0 },
          }}
        >
          <Stack
            spacing={{ xs: 5, md: 10 }}
            sx={{ '@media print': { spacing: 2 }, mt: { xs: 2, md: 2 } }}
          >
            {/* Header */}
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                textAlign: 'center',
                '@media print': { spacing: 1 },
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 0.5,
                  borderRadius: 10,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: 1,
                  '@media print': { display: 'none' },
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                  }}
                />
                <Typography variant='overline' color='portal'>
                  Portal Seguro de Firma
                </Typography>
              </Box>
              <Typography variant='h2' component='h1' color='contract-title'>
                Revolución Pineal
              </Typography>
              <Typography variant='subtitle1' color='contract-subtitle'>
                Contrato de Formación Académica
              </Typography>
            </Stack>

            {/* Contract Content */}
            <Card>
              <Box
                sx={{
                  p: { xs: 3, md: 6 },
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '@media print': { border: 'none', p: 0 },
                }}
              >
                <Box
                  sx={{
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                      color: 'text.primary',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      mb: 2,
                      mt: 4,
                    },
                    '& p': {
                      color: 'text.primary',
                      lineHeight: 1.8,
                      mb: 2,
                      opacity: 0.8,
                    },
                    '& strong': { color: 'text.primary', fontWeight: 'bold' },
                    '& li': { color: 'text.primary', mb: 1, opacity: 0.8 },
                    '& ul, & ol': { pl: 3, mb: 2 },
                    '& ::selection': {
                      bgcolor: 'text.primary',
                      color: 'background.paper',
                    },
                    fontFamily: 'serif',
                  }}
                >
                  <ReactMarkdown>{contractText}</ReactMarkdown>
                </Box>
              </Box>

              {/* Signature Section */}
              <Box
                sx={{
                  p: { xs: 4, md: 8 },
                  bgcolor: 'action.hover',
                  '@media print': { bgcolor: 'transparent', p: 0, mt: 4 },
                }}
              >
                {contract.estado === 'firmado' ? (
                  <Stack
                    spacing={3}
                    sx={{
                      py: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        '@media print': { display: 'none' },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: -16,
                          bgcolor: 'success.main',
                          opacity: 0.1,
                          borderRadius: '50%',
                          filter: 'blur(20px)',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'relative',
                          bgcolor: 'success.main',
                          opacity: 0.2,
                          p: 2,
                          borderRadius: '50%',
                          border: '1px solid',
                          borderColor: 'success.light',
                        }}
                      >
                        <CheckCircle2
                          size={56}
                          style={{ color: '#000' }}
                          strokeWidth={3}
                        />
                      </Box>
                    </Box>
                    <Stack
                      spacing={1}
                      sx={{
                        textAlign: 'center',
                        '@media print': { display: 'none' },
                      }}
                    >
                      <Typography variant='h5' color='text.primary'>
                        ¡Contrato Firmado!
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ maxWidth: '320px', mx: 'auto', lineHeight: 1.6 }}
                      >
                        Tu inscripción se ha procesado con éxito. En breve
                        recibirás los accesos por WhatsApp.
                      </Typography>
                    </Stack>
                    {contract.firma_data && (
                      <Box
                        sx={{
                          mt: 5,
                          pt: 5,
                          borderTop: '1px solid',
                          borderColor: 'divider',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          '@media print': { mt: 2, pt: 2 },
                        }}
                      >
                        <Typography
                          variant='overline'
                          color='text.secondary'
                          sx={{ mb: 3, '@media print': { mb: 1 } }}
                        >
                          Certificado de Firma
                        </Typography>
                        <Box
                          component={Paper}
                          variant='info'
                          sx={{
                            bgcolor: 'background.paper',
                            p: 3,
                            boxShadow: 1,
                            '@media print': {
                              border: 'none',
                              p: 0,
                              boxShadow: 'none',
                            },
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={contract.firma_data}
                            alt='Firma Digital'
                            style={{
                              maxHeight: 128,
                              filter: 'grayscale(100%) brightness(0%)',
                              opacity: 0.9,
                            }}
                          />
                        </Box>
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                          <Typography
                            variant='body2'
                            color='text.primary'
                            sx={{
                              fontWeight: 600,
                              '@media print': { color: 'black' },
                            }}
                          >
                            Firmado por: {contract.nombre_cliente_contrato}
                          </Typography>
                          <Typography
                            variant='caption'
                            color='text.secondary'
                            sx={{
                              fontWeight: 'medium',
                              '@media print': { color: 'black' },
                            }}
                          >
                            Fecha de Nacimiento:{' '}
                            {contract.fecha_nacimiento_cliente}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    <Box sx={{ '@media print': { display: 'none' } }}>
                      <PrintButton />
                    </Box>
                  </Stack>
                ) : (
                  <Box sx={{ '@media print': { display: 'none' } }}>
                    <SignatureContainer id={id} />
                  </Box>
                )}
              </Box>
            </Card>

            {/* Footer */}
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                textAlign: 'center',
                '@media print': { mt: 5 },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: 'text.disabled',
                }}
              >
                <Typography variant='overline'>SECURE ENCRYPTION</Typography>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: 'divider',
                  }}
                />
                <Typography variant='overline'>
                  ID: {id.split('-')[0].toUpperCase()}
                </Typography>
              </Box>
              <Typography
                variant='caption'
                color='text.disabled'
                sx={{ fontWeight: 'medium', maxWidth: 'sm' }}
              >
                Este documento tiene plena validez legal conforme a la Ley de
                Servicios de la Sociedad de la Información y de Comercio
                Electrónico.
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Container>
    </LightModeWrapper>
  );
}
