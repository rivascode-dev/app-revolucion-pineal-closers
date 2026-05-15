'use client';

import { LayoutDashboard, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Contratos', href: '/dashboard/contratos', icon: FileText },
];

const DRAWER_WIDTH = 256;
const MINI_DRAWER_WIDTH = 80;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: { xs: MINI_DRAWER_WIDTH, md: DRAWER_WIDTH },
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: { xs: MINI_DRAWER_WIDTH, md: DRAWER_WIDTH },
          boxSizing: 'border-box',
          overflowX: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'text.primary',
            color: 'background.paper',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" color="inherit">
            RP
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'left', display: { xs: 'none', md: 'block' } }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 900, lineHeight: 1.1 }}
          >
            REVOLUCIÓN PINEAL
          </Typography>
          <Typography variant="overline" color="text.secondary">
            Closers App
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 4, pt: 2, pb: 1, display: { xs: 'none', md: 'block' } }}>
        <Typography variant="overline" color="text.secondary">
          Navegación
        </Typography>
      </Box>

      <List sx={{ px: { xs: 1, md: 2 }, mt: { xs: 2, md: 0 }, flex: 1 }}>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={isActive}
                sx={{
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: { xs: 0, md: 2 },
                    color: 'inherit',
                    justifyContent: 'center',
                  }}
                >
                  <item.icon size={20} />
                </ListItemIcon>
                <ListItemText
                  sx={{ display: { xs: 'none', md: 'block' } }}
                  primary={
                    <Typography
                      sx={{
                        fontWeight: isActive ? 600 : 500,
                        fontSize: '0.95rem',
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2, display: { xs: 'none', md: 'block' } }}>
        <Box
          sx={{
            p: 2,
            bgcolor: 'action.hover',
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', mb: 1.5, display: 'block' }}
          >
            Revolución Pineal v1.0
          </Typography>
          <Box
            sx={{
              height: 4,
              width: '100%',
              bgcolor: 'divider',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: '66%',
                bgcolor: 'text.primary',
                borderRadius: 2,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
