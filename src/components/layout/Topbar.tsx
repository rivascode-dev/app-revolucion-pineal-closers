'use client';

import { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { signOut } from '@/actions/auth';
import { ThemeToggle } from '../ThemeToggle';
import { AppBar, Toolbar, Box, Typography, Menu, MenuItem, Avatar, Fade } from '@mui/material';

export function Topbar({ userEmail }: { userEmail: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    signOut();
  };

  return (
    <AppBar
      color='inherit'
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ThemeToggle />
          
          <Box
            onClick={handleClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1,
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <Avatar sx={{ width: 40, height: 40 }}>
              <User size={20} />
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left' }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                Mi cuenta
              </Typography>
              <Typography variant='caption' sx={{ display: 'block', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', color: 'text.secondary' }}>
                {userEmail}
              </Typography>
            </Box>
            <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slots={{ transition: Fade }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">Conectado como</Typography>
              <Typography variant="subtitle2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {userEmail}
              </Typography>
            </Box>
            <MenuItem onClick={handleSignOut} sx={{ color: 'error.main', py: 1.5, px: 2, gap: 1.5 }}>
              <LogOut size={16} />
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
