import { createTheme, alpha } from '@mui/material/styles';

export const brand = {
  0: '#FFFFFF',
  50: '#E6F0FA',
  100: '#B3D1F2',
  200: '#80B2EB',
  300: '#4D93E3',
  400: '#1A74DB',
  500: '#1355A1',
  600: '#10488A',
  700: '#0D3B73',
  800: '#0A2E5C',
  900: '#072145',
};

export const secondary = {
  50: '#E6F2F0',
  100: '#B3D9D3',
  200: '#80C0B6',
  300: '#4DA799',
  400: '#1A8E7C',
  500: '#4a8175',
  600: '#3A665D',
  700: '#2A4B45',
  800: '#1A302D',
  900: '#0A1515',
};

export const gray = {
  50: '#FBFCFE',
  100: '#EAF0F5',
  200: '#D6E2EB',
  300: '#BFCCD9',
  400: '#94A6B8',
  500: '#5B6B7C',
  600: '#4C5967',
  700: '#364049',
  800: '#131B20',
  900: '#090E10',
};

export const green = {
  50: '#F6FEF6',
  100: '#E3FBE3',
  200: '#C7F7C7',
  300: '#A1E8A1',
  400: '#51BC51',
  500: '#1F7A1F',
  600: '#136C13',
  700: '#0A470A',
  800: '#042F04',
  900: '#021D02',
};

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#FFFFFF',
          paper: gray[50],
        },
        primary: {
          light: brand[200],
          main: brand[500],
          dark: brand[800],
          contrastText: brand[50],
        },
        secondary: {
          light: secondary[300],
          main: secondary[500],
          dark: secondary[800],
        },
        warning: {
          main: '#F7B538',
          dark: '#F79F00',
        },
        error: {
          light: '#FFEBEE',
          main: '#F44336',
          dark: '#D32F2F',
        },
        success: {
          light: green[300],
          main: green[400],
          dark: green[800],
        },
        grey: gray,
        divider: alpha(gray[300], 0.5),
        text: {
          primary: gray[800],
          secondary: gray[600],
        },
        action: {
          selected: alpha(brand[200], 0.2),
        },
        // Variable CSS para Avatar.defaultBg en modo claro
        Avatar: {
          defaultBg: gray[300],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          light: brand[300],
          main: brand[400],
          dark: brand[800],
          contrastText: brand[100],
        },
        secondary: {
          light: secondary[400],
          main: secondary[500],
          dark: secondary[900],
        },
        warning: {
          main: '#F7B538',
          dark: '#F79F00',
        },
        error: {
          light: '#D32F2F',
          main: '#D32F2F',
          dark: '#B22A2A',
        },
        success: {
          light: green[400],
          main: green[500],
          dark: green[700],
        },
        grey: gray,
        divider: alpha(gray[600], 0.3),
        background: {
          default: gray[900],
          paper: gray[800],
        },
        text: {
          primary: '#fff',
          secondary: gray[400],
        },
        action: {
          selected: alpha(brand[800], 0.2),
        },
        // Variable CSS para Avatar.defaultBg en modo oscuro
        Avatar: {
          defaultBg: alpha(gray[700], 0.8),
        },
      },
    },
  },
  typography: {
    fontFamily: ['"Roboto"', '"Arial"', 'sans-serif'].join(','),
    h1: {
      fontSize: '5rem',
      fontWeight: 900,
      lineHeight: 1.167,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '3.75rem',
      fontWeight: 900,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '3rem',
      fontWeight: 900,
      lineHeight: 1.167,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontSize: '2.125rem',
      fontWeight: 900,
      lineHeight: 1.235,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 900,
      lineHeight: 1.334,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1.6,
      letterSpacing: '-0.02em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.625rem',
      fontWeight: 800,
      lineHeight: 2.66,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiAccordion: {
      defaultProps: { elevation: 0, disableGutters: true },
      styleOverrides: {
        root: ({ theme }) => ({
          padding: 8,
          overflow: 'clip',
          backgroundColor: '#fff',
          border: '1px solid',
          borderColor: gray[100],
          ':before': { backgroundColor: 'transparent' },
          '&:first-of-type': {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          '&:last-of-type': {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          },
          ...theme.applyStyles('dark', {
            backgroundColor: gray[900],
            borderColor: gray[800],
          }),
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: 'none',
          borderRadius: 8,
          '&:hover': { backgroundColor: gray[100] },
          ...theme.applyStyles('dark', {
            '&:hover': { backgroundColor: gray[800] },
          }),
        }),
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: { mb: 20, border: 'none' },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '10px',
          boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
          '& .Mui-selected': { color: brand[500] },
          ...theme.applyStyles('dark', {
            '& .Mui-selected': { color: '#fff' },
            boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
          }),
        }),
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '12px 16px',
          textTransform: 'none',
          borderRadius: '10px',
          fontWeight: 500,
          ...theme.applyStyles('dark', {
            color: gray[400],
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
            '&.Mui-selected': { color: brand[300] },
          }),
        }),
      },
    },
    MuiButtonBase: {
      defaultProps: { disableTouchRipple: true, disableRipple: true },
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
          transition: 'all 100ms ease-in',
          '&:focus-visible': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          boxSizing: 'border-box',
          boxShadow: 'none',
          borderRadius: '100px',
          textTransform: 'none',
          fontWeight: 600,
          '&:active': { transform: 'scale(0.98)' },
          ...(ownerState.size === 'small' && { maxHeight: '32px' }),
          ...(ownerState.size === 'medium' && { height: '40px' }),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              color: theme.palette.background.default,
              background: theme.palette.text.primary,
              paddingLeft: theme.spacing(4),
              paddingRight: theme.spacing(4),
              paddingTop: theme.spacing(2),
              paddingBottom: theme.spacing(2),
              borderRadius: '16px',
              fontWeight: 'bold',
              boxShadow: theme.shadows[3],
              '&:hover': {
                background: theme.palette.text.secondary,
                backgroundImage: 'none',
              },
            }),
          ...(ownerState.variant === 'outlined' && {
            backgroundColor: alpha(brand[300], 0.1),
            borderColor: brand[300],
            color: brand[500],
            '&:hover': {
              backgroundColor: alpha(brand[300], 0.3),
              borderColor: brand[200],
            },
          }),
          ...(ownerState.variant === 'text' && {
            color: brand[500],
            '&:hover': {
              backgroundColor: alpha(brand[300], 0.3),
              borderColor: brand[200],
            },
          }),
          ...theme.applyStyles('dark', {
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                color: brand[900],
                background: '#fff',
                '&:hover': {
                  background: gray[100],
                },
              }),
            ...(ownerState.variant === 'outlined' && {
              backgroundColor: alpha(brand[600], 0.1),
              borderColor: brand[700],
              color: brand[300],
              '&:hover': {
                backgroundColor: alpha(brand[600], 0.3),
                borderColor: brand[700],
              },
            }),
            ...(ownerState.variant === 'text' && {
              color: brand[300],
              '&:hover': {
                backgroundColor: alpha(brand[600], 0.3),
                borderColor: brand[700],
              },
            }),
          }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: gray[50],
          borderRadius: theme.spacing(4),
          border: `1px solid ${alpha(gray[200], 0.8)}`,
          boxShadow: 'none',
          transition: 'background-color, border, 80ms ease',
          overflow: 'hidden',
          ...theme.applyStyles('dark', {
            backgroundColor: alpha(gray[800], 0.6),
            border: `1px solid ${alpha(gray[700], 0.3)}`,
          }),
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          '& .MuiChip-icon': {
            color: 'inherit',
            marginLeft: '8px',
            marginRight: '-4px',
          },
          ...(ownerState.color === 'success' && {
            backgroundColor: alpha(green[400], 0.1),
            color: green[600],
            border: `1px solid ${alpha(green[400], 0.2)}`,
            ...theme.applyStyles('dark', {
              backgroundColor: alpha(green[400], 0.1),
              color: green[300],
              borderColor: alpha(green[400], 0.3),
            }),
          }),
          ...(ownerState.color === 'warning' && {
            backgroundColor: alpha('#F7B538', 0.1),
            color: '#B27B00',
            border: `1px solid ${alpha('#F7B538', 0.2)}`,
            ...theme.applyStyles('dark', {
              backgroundColor: alpha('#F7B538', 0.1),
              color: '#F7B538',
              borderColor: alpha('#F7B538', 0.3),
            }),
          }),
          ...(ownerState.color === 'primary' && {
            background: `linear-gradient(to bottom right, ${brand[50]}, ${brand[100]})`,
            border: '1px solid',
            borderColor: `${alpha(brand[500], 0.3)}`,
            '&:hover': { backgroundColor: brand[500] },
            '& .MuiChip-label': { color: brand[500] },
            '& .MuiChip-icon': { color: brand[500] },
            ...theme.applyStyles('dark', {
              background: `linear-gradient(to bottom right, ${brand[700]}, ${brand[900]})`,
              borderColor: `${alpha(brand[500], 0.5)}`,
              '&:hover': { backgroundColor: brand[600] },
              '& .MuiChip-label': { color: brand[200] },
              '& .MuiChip-icon': { color: brand[200] },
            }),
          }),
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '12px',
          border: '1px solid transparent',
          '&:hover': {
            backgroundColor: 'action.hover',
            borderColor: 'divider',
            color: 'text.primary',
          },
          ...theme.applyStyles('dark', {
            '&:hover': {
              backgroundColor: alpha(gray[700], 0.3),
              borderColor: alpha(gray[600], 0.5),
            },
          }),
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: `${alpha(gray[200], 0.8)}`,
          ...theme.applyStyles('dark', {
            borderColor: `${alpha(gray[700], 0.4)}`,
          }),
        }),
      },
    },
    MuiLink: {
      defaultProps: { underline: 'none' },
      styleOverrides: {
        root: ({ theme }) => ({
          color: brand[600],
          fontWeight: 500,
          position: 'relative',
          textDecoration: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 0,
            height: '1px',
            bottom: 0,
            left: 0,
            backgroundColor: brand[200],
            opacity: 0.7,
            transition: 'width 0.3s ease, opacity 0.3s ease',
          },
          '&:hover::before': { width: '100%', opacity: 1 },
          ...theme.applyStyles('dark', { color: brand[200] }),
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
          color: theme.palette.text.secondary,
          fontWeight: 500,
          margin: theme.spacing(0.5, 1),
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.text.primary,
          },
          ...theme.applyStyles('dark', { color: theme.palette.grey[300] }),
        }),
      },
    },
    MuiMenu: {
      defaultProps: {
        elevation: 0,
        disableScrollLock: true,
        slotProps: {
          paper: {
            variant: 'outlined',
            sx: (theme) => ({
              mt: 1.5,
              minWidth: 180,
              boxShadow: `0px 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
              ...theme.applyStyles('dark', {
                boxShadow: `0px 4px 20px ${alpha(theme.palette.common.black, 0.4)}`,
              }),
            }),
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'sticky',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
          zIndex: theme.zIndex.drawer + 1,
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: 80,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          backgroundColor: 'white',
          borderRadius: '16px',
          ...theme.applyStyles('dark', {
            backgroundColor: alpha(gray[900], 0.6),
          }),
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        overline: ({ theme }) => ({
          color: theme.palette.grey[800],
          display: 'inline-block',
          ...theme.applyStyles('dark', {
            color: theme.palette.grey[400],
          }),
        }),
      },
      variants: [
        {
          props: { variant: 'overline', color: 'step' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.grey[100],
            padding: theme.spacing(0.5, 1.5),
            borderRadius: Number(theme.shape.borderRadius) * 10,
            width: 'fit-content',
            ...theme.applyStyles('dark', {
              backgroundColor: theme.palette.grey[800],
              color: theme.palette.grey[300],
            }),
          }),
        },
        {
          props: { variant: 'overline', color: 'label' },
          style: ({ theme }) => ({
            marginLeft: theme.spacing(0.5),
            color: theme.palette.text.secondary,
            display: 'inline-block',
            marginBottom: theme.spacing(0.5),
          }),
        },
        {
          props: { variant: 'overline', color: 'portal' },
          style: ({ theme }) => ({
            lineHeight: 1,
            color: theme.palette.text.secondary,
          }),
        },
        {
          props: { color: 'contract-title' },
          style: ({ theme }) => ({
            color: theme.palette.text.primary,
            '@media print': {
              color: 'black',
              fontSize: '2rem',
            },
          }),
        },
        {
          props: { color: 'contract-subtitle' },
          style: ({ theme }) => ({
            fontWeight: 500,
            color: theme.palette.text.secondary,
            '@media print': {
              color: 'black',
            },
          }),
        },
      ],
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiInputBase-root': {
            backgroundColor: 'rgba(249, 250, 251, 0.5)',
            borderRadius: Number(theme.shape.borderRadius) * 2,
            transition: 'all 0.2s',
            fontSize: '0.875rem',
            fontWeight: 500,
            '& fieldset': {
              borderColor: theme.palette.grey[200],
              transition: 'border-color 0.2s',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.grey[300],
            },
            '&.Mui-focused': {
              backgroundColor: theme.palette.common.white,
              '& fieldset': {
                borderColor: theme.palette.grey[200],
                borderWidth: '1px',
              },
            },
            ...theme.applyStyles('dark', {
              backgroundColor: 'rgba(30, 41, 59, 0.5)',
              '& fieldset': {
                borderColor: theme.palette.grey[800],
              },
              '&:hover fieldset': {
                borderColor: theme.palette.grey[700],
              },
              '&.Mui-focused': {
                backgroundColor: theme.palette.grey[900],
              },
            }),
          },
        }),
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          //border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxSizing: 'border-box',
          width: 36,
          height: 24,
          padding: 0,
          transition: 'background-color 100ms ease-in',
          '&:hover': { '& .MuiSwitch-track': { backgroundColor: brand[600] } },
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': { transform: 'translateX(13px)' },
          },
          '& .MuiSwitch-track': { borderRadius: 50 },
          '& .MuiSwitch-thumb': {
            boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#FFF',
            width: 16,
            height: 16,
            margin: 2,
          },
          ...theme.applyStyles('dark', {
            width: 36,
            height: 24,
            padding: 0,
            transition: 'background-color 100ms ease-in',
            '&:hover': {
              '& .MuiSwitch-track': { backgroundColor: brand[600] },
            },
            '& .MuiSwitch-switchBase': {
              '&.Mui-checked': { transform: 'translateX(13px)' },
            },
            '& .MuiSwitch-thumb': {
              boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#FFF',
              width: 16,
              height: 16,
              margin: 2,
            },
          }),
        }),
        switchBase: {
          height: 24,
          width: 24,
          padding: 0,
          color: '#fff',
          '&.Mui-checked + .MuiSwitch-track': { opacity: 1 },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: gray[50],
          ...theme.applyStyles('dark', {
            backgroundColor: alpha(gray[800], 0.4),
          }),
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '16px 24px',
          borderColor: alpha(gray[200], 0.5),
          ...theme.applyStyles('dark', {
            borderColor: alpha(gray[700], 0.3),
          }),
        }),
        head: ({ theme }) => ({
          ...theme.typography.overline,
          color: gray[600],
          ...theme.applyStyles('dark', {
            color: gray[400],
          }),
        }),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:last-child td': { borderBottom: 0 },
          transition: 'background-color 0.2s',
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          border: `1px solid ${alpha(gray[400], 0.5)}`,
          color: gray[600],
          ...theme.applyStyles('dark', {
            borderColor: alpha(gray[600], 0.4),
            color: gray[400],
          }),
          ...(ownerState.variant === 'empty' && {
            width: 64,
            height: 64,
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.text.secondary,
            opacity: 0.3,
            borderRadius: theme.spacing(3),
          }),
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-checked': {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.875rem',
          fontWeight: 500,
          userSelect: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRight: '1px solid',
          borderColor: theme.palette.divider,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
          margin: theme.spacing(0.5, 0),
          transition: 'all 0.2s',
          '&.Mui-selected': {
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.background.paper,
            '&:hover': {
              backgroundColor: theme.palette.text.primary,
            },
            '& .MuiListItemIcon-root': {
              color: 'inherit',
            },
          },
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            '& .MuiListItemIcon-root': {
              color: theme.palette.text.primary,
            },
          },
        }),
      },
    },
  },
});
