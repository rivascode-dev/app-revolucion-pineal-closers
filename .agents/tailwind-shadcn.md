# Estándares de Diseño y Buenas Prácticas: Tailwind CSS v4 y Shadcn/ui

Este documento define las directrices y estándares de desarrollo para la capa de presentación utilizando **Tailwind CSS v4** y **Shadcn/ui** en aplicaciones **Next.js 16** con **React 19**.

---

## 1. Filosofía de Estilizado

Priorizamos interfaces fluidas, ligeras y con una estética premium que resulte atractiva en el primer impacto visual.

1. **Compilación Estática:** Se debe delegar todo el procesamiento de estilos al compilador en tiempo de compilación. Prohibido el uso de librerías CSS-in-JS que procesen estilos en tiempo de ejecución (runtime) como Emotion o Styled Components.
2. **Mobile-First Estricto:** Todos los diseños y clases de componentes deben estructurarse pensando primero en dispositivos móviles, aplicando los breakpoints (`sm:`, `md:`, `lg:`, `xl:`) únicamente para adaptar el layout progresivamente a pantallas más grandes.
3. **Consistencia Semántica:** El uso de colores, bordes y fuentes debe basarse exclusivamente en las variables CSS semánticas del sistema de diseño (evitar clases fijas como `bg-[#123456]` para colores clave).

---

## 2. Gestión de Clases Dinámicas (`cn` Utility)

Para combinar clases de Tailwind de forma dinámica e inteligente, se debe usar la utilidad `cn` (basada en `clsx` y `tailwind-merge`) ubicada en `src/lib/utils.ts`.

### Directrices:
- Usar `cn` para cualquier componente que acepte un `className` externo.
- Asegurar que `tailwind-merge` resuelva colisiones de clases en lugar de concatenar cadenas simples.

```tsx
// Correcto (Implementación Limpia)
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

export function Card({ className, isActive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card p-6 transition-all duration-300',
        isActive && 'border-primary shadow-lg scale-[1.02]',
        className
      )}
      {...props}
    />
  );
}
```

---

## 3. Configuración y Temas en Tailwind CSS v4

En **Tailwind CSS v4**, la configuración del tema no se realiza en un archivo `tailwind.config.js`. Se define de manera declarativa directamente en el archivo CSS global (`src/app/globals.css`) usando la directiva `@theme`.

### Estructura de `src/app/globals.css`:
```css
@import "tailwindcss";

@theme {
  /* Extensión y redefinición del sistema de tokens */
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));

  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));

  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));

  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));

  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --primary: 262.1 83.3% 57.8%; /* Violeta Premium */
  --primary-foreground: 210 20% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --radius: 0.75rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --primary: 263.4 70% 50.4%;
  --primary-foreground: 210 20% 98%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 240 5% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 240 5% 98%;
}
```

---

## 4. Estándares para Componentes Shadcn/ui

Los componentes de Shadcn/ui son la base atómica de la interfaz. Deben residir siempre en `src/components/ui/` y seguir estrictamente estas pautas:

1. **Uso de Radix UI:** Mantener las primitivas de accesibilidad de Radix UI sin alterar sus atributos `aria-*`.
2. **Prop `asChild`:** Utilizar la propiedad `asChild` de Radix UI cuando se requiera anidar elementos interactivos (por ejemplo, renderizar un botón de Shadcn como un componente `Link` de Next.js para evitar etiquetas anidadas inválidas en HTML como `<a><button>`).
3. **Paso de Props de React 19:** Con React 19, las `refs` se pasan directamente como una prop convencional (`ref={ref}`). No se requiere el uso de `React.forwardRef`.

```tsx
// Ejemplo de botón premium alineado a React 19 y Shadcn
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg',
        outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ref, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
}
```

---

## 5. Principios de Estética y Animaciones Premium

Para garantizar una experiencia de usuario que se sienta premium, interactiva y fluida:

- **Efecto de Cristal (Glassmorphism):** Úsalo en paneles superiores (`Topbar`) o modales para integrarlos armónicamente sobre el fondo.
  ```tailwind
  bg-background/80 backdrop-blur-md border-b border-border/50
  ```
- **Sombras sutiles:** Evita sombras duras u oscuras. Utiliza sombras difusas con opacidad baja.
  ```tailwind
  shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
  ```
- **Transiciones fluidas:** Aplica siempre tiempos de transición lógicos (`duration-300` o `duration-200`) junto con `ease-in-out` en todas las interacciones de hover o transformaciones.
  ```tailwind
  transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md
  ```

---

## 6. Integración de Modo Oscuro (Dark Mode)

- El manejo del tema debe respetar las variables CSS.
- Se recomienda el uso de dependencias compatibles con App Router como `next-themes`, aplicando la clase `.dark` al elemento `html` para prevenir desajustes de hidratación.

## 7. Responsive Design (Breakpoints)

- **Mobile-First Estricto:** Define el layout base para móviles sin utilizar prefijos de breakpoint en primer nivel.
- **Estandarización de Saltos:** Para reducir fragmentación visual, escala preferentemente usando saltos lógicos (`md:` para tablets y `lg:` para escritorio), evitando sobrecargar de breakpoints si no es necesario semánticamente.
