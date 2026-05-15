/**
 * MUI custom variant and color declarations.
 * Extends MUI component prop interfaces to register all custom
 * variants defined in src/styles/theme.ts.
 */

import '@mui/material/Avatar';
import '@mui/material/Button';
import '@mui/material/Card';
import '@mui/material/Container';
import '@mui/material/Paper';
import '@mui/material/Typography';

// ─── Avatar ──────────────────────────────────────────────────────────────────
declare module '@mui/material/Avatar' {
  interface AvatarPropsVariantOverrides {
    empty: true;
  }
}

// ─── Button ──────────────────────────────────────────────────────────────────
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    link: true;
  }
}

// ─── Card ────────────────────────────────────────────────────────────────────
declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    dashboard: true;
    contract: true;
  }
}

// ─── Container ───────────────────────────────────────────────────────────────
declare module '@mui/material/Container' {
  interface ContainerPropsVariantOverrides {
    contract: true;
    'contract-page': true;
  }
}

// ─── Paper ───────────────────────────────────────────────────────────────────
declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    icon: true;
    row: true;
    info: true;
    filter: true;
  }
}

// ─── Typography ──────────────────────────────────────────────────────────────
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label: true;
  }
  interface TypographyPropsColorOverrides {
    step: true;
    label: true;
    portal: true;
    'contract-title': true;
    'contract-subtitle': true;
  }
}
