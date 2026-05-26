# Design Standards and Best Practices: Tailwind CSS v4 and Shadcn/ui

This document defines the development guidelines and standards for the presentation layer using **Tailwind CSS v4** and **Shadcn/ui** in **Next.js 16** applications with **React 19**.

---

## 1. Styling Philosophy

We prioritize fluid, lightweight interfaces with a premium aesthetic that creates a strong visual impact upon first load.

1. **Static Compilation**: All style processing must be delegated to the compiler at build time. The use of runtime CSS-in-JS libraries (such as Emotion or Styled Components) is strictly prohibited.
2. **Strict Mobile-First**: All layouts and component classes must be structured thinking first of mobile devices, applying responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`) only to progressively adapt the layout to larger screens.
3. **Semantic Consistency**: The use of colors, borders, and typography must be strictly based on the design system's semantic CSS variables (avoid hardcoded classes like `bg-[#123456]` for key branding colors).

---

## 2. Dynamic Class Management (`cn` Utility)

To combine Tailwind classes dynamically and intelligently, always use the `cn` utility (built on `clsx` and `tailwind-merge`) located in `src/lib/utils.ts`.

### Guidelines:
- Use `cn` for any component that accepts an external `className` prop.
- Ensure `tailwind-merge` resolves utility class collisions instead of relying on simple string concatenation.

```tsx
// Correct (Clean Implementation)
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

## 3. Configuration and Themes in Tailwind CSS v4

In **Tailwind CSS v4**, theme configuration is not defined in a `tailwind.config.js` file. Instead, it is configured declaratively inside the global CSS file (`src/app/globals.css`) using the `@theme` directive.

### Structure of `src/app/globals.css`:
```css
@import "tailwindcss";

@theme {
  /* Extension and redefinition of the token system */
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
  --primary: 262.1 83.3% 57.8%; /* Premium Violet */
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

## 4. Standards for Shadcn/ui Components

Shadcn/ui components are the atomic foundation of our user interface. They must always reside in `src/components/ui/` and strictly follow these rules:

1. **Radix UI Integration**: Maintain the accessibility primitives of Radix UI without altering their default `aria-*` attributes.
2. **`asChild` Prop**: Use Radix UI's `asChild` property when nesting interactive elements (e.g., rendering a Shadcn Button component as a Next.js `Link` to avoid invalid HTML nesting like `<a><button>`).
3. **React 19 Ref Passing**: In React 19, DOM and component `refs` are passed directly as a conventional prop (`ref={ref}`). The use of `React.forwardRef` is no longer required or recommended.

```tsx
// Example of a premium button aligned with React 19 and Shadcn
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

## 5. Premium Aesthetics and Animations

To ensure a user experience that feels state-of-the-art, interactive, and fluid:

- **Glassmorphism Effect**: Use on headers (`Topbar`) or modals to blend them seamlessly over the background.
  ```css
  /* Example utility classes */
  bg-background/80 backdrop-blur-md border-b border-border/50
  ```
- **Subtle Shadows**: Avoid harsh or dark drop shadows. Use diffused shadows with very low opacity.
  ```css
  shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
  ```
- **Fluid Transitions**: Always apply transition times (`duration-300` or `duration-200`) coupled with `ease-in-out` on all hover states and visual transformations.
  ```css
  transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md
  ```

---

## 6. Dark Mode Integration

- Theme management must strictly leverage CSS HSL custom variables.
- We recommend using App Router-compatible packages like `next-themes`, applying the `.dark` class directly to the `html` element to prevent hydration mismatches.

## 7. Responsive Design (Breakpoints)

- **Strict Mobile-First**: Define the base layout and utilities targeting mobile devices without screen-size prefixes.
- **Standardized Step Breakpoints**: To reduce visual fragmentation, scale layouts primarily using logical breakpoints (`md:` for tablets and `lg:` for desktop screens), avoiding intermediate breakpoint overrides unless strictly required by the design context.
