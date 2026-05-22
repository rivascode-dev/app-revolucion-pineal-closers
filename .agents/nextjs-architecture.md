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

## 4. Routing, Proxy & Auth (Next.js 16)
- **Proxy (`proxy.ts`)**: Actúa como el middleware principal para interceptar peticiones. Su alcance debe ser **estrictamente para control de acceso y verificación de sesión SSR de Supabase**. Está **prohibido** ejecutar consultas de base de datos directas (`select`, `insert`) dentro del proxy.

## 5. Data Fetching, Caching & State
- **Caching**: Al mutar datos en Supabase vía Server Actions, usar utilidades de Next.js (`revalidatePath`, `revalidateTag`) para actualizar la UI dinámicamente.
- **State Management**: Priorizar URL Search Params para estado compartible o SSR-friendly. Limitar el uso de contexto o `useState` a interactividad rica y aislada en `src/sections/`.
