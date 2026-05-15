'use client'

import { useTransition, useState } from 'react'
import { login } from '@/actions/auth'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import { Box, Typography, TextField, Button, Card, InputAdornment, CircularProgress } from '@mui/material'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#050505',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '40%',
          height: '40%',
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          filter: 'blur(120px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '40%',
          height: '40%',
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          filter: 'blur(120px)',
        }}
      />

      <Box sx={{ width: '100%', maxWidth: 448, p: 2, position: 'relative', zIndex: 10 }}>
        <Card
          sx={{
            bgcolor: '#0a0a0a',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            p: 5,
            borderRadius: '2.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(24px)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box
              sx={{
                display: 'inline-flex',
                width: 64,
                height: 64,
                bgcolor: 'white',
                borderRadius: '1rem',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                boxShadow: '0 0 40px rgba(255,255,255,0.15)',
              }}
            >
              <Typography variant="h5" sx={{ color: 'black', fontWeight: 900 }}>
                RP
              </Typography>
            </Box>
            <Typography variant="h5" color="white">
              Bienvenido de nuevo
            </Typography>
            <Typography variant="body2" color="grey.500" sx={{ mt: 1 }}>
              Gestiona tus contratos con Revolución Pineal
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: error ? 2 : 4 }}>
              <TextField
                id="email"
                name="email"
                type="email"
                required
                placeholder="Tu correo electrónico"
                variant="outlined"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} color="grey" />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      borderRadius: '1rem',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&.Mui-focused': {
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                      },
                    }
                  }
                }}
              />

              <TextField
                id="password"
                name="password"
                type="password"
                required
                placeholder="Tu contraseña"
                variant="outlined"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} color="grey" />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      borderRadius: '1rem',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&.Mui-focused': {
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                      },
                    }
                  }
                }}
              />
            </Box>

            {error && (
              <Box
                sx={{
                  color: '#f87171',
                  fontSize: '0.75rem',
                  bgcolor: 'rgba(248, 113, 113, 0.05)',
                  p: 2,
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(248, 113, 113, 0.1)',
                  mb: 4,
                  animation: 'fadeIn 0.3s ease-out',
                  '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(-8px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                {error}
              </Box>
            )}

            <Button
              type="submit"
              disabled={isPending}
              fullWidth
              sx={{
                bgcolor: 'white',
                color: 'black',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                borderRadius: '1rem',
                py: 2,
                textTransform: 'none',
                boxShadow: '0 10px 30px rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'grey.200',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
                '&.Mui-disabled': {
                  opacity: 0.5,
                  bgcolor: 'white',
                  color: 'black',
                }
              }}
            >
              {isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Entrar al Panel
                  <ArrowRight size={18} />
                </Box>
              )}
            </Button>
          </form>

          <Box
            sx={{
              mt: 4,
              pt: 4,
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: 'grey.600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
              }}
            >
              Exclusivo para Closers
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}
