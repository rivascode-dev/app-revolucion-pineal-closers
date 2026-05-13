# Next.js Architecture Standards

> [!WARNING]
> **Esta versión de Next.js tiene cambios disruptivos.** 
> Las APIs, convenciones y estructura de archivos pueden diferir de los datos de entrenamiento estándar de la IA. Consulta siempre `node_modules/next/dist/docs/` y respeta los avisos de depreciación.

## 1. Project Structure
The project follows a modified Clean Architecture adapted for Next.js App Router:

- **`src/app/`**: Exclusive for routing, layouts, and Server Components. Minimal logic here.
- **`src/actions/`**: Centralized Server Actions. Contains business logic, database mutations (Supabase), and external integrations (n8n).
- **`src/sections/`**: "Smart" Client Components specific to a route or feature. Isolates `'use client'` from the routing layer.
- **`src/components/`**: Global, atomic, and reusable UI components.
- **`src/lib/`**: Shared utilities, API clients, and core services.
- **`src/hooks/`**: Custom React hooks.
- **`src/docs/`**: Documentation for the project.

## 2. Server Actions Rules
- Use `'use server'` at the top of the file.
- All network requests or database operations must be wrapped in `try/catch`.
- Return a standard response object: `{ success: boolean, data?: any, error?: string }`.
- Never execute network requests directly within UI components; delegate to this layer.

## 3. Component Guidelines
- **Server Components (Default)**: Use for data fetching and static structure in `src/app`.
- **Sections**: Move client-side interactive logic (forms, states, effects) to `src/sections/[feature]`.
- **Props**: Use strict TypeScript interfaces for all component props.
