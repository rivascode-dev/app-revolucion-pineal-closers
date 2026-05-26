# Next.js Architecture Standards

> [!WARNING]
> **This Next.js version contains breaking changes.**
> APIs, conventions, and file structures may differ from standard AI training data. Always consult `node_modules/next/dist/docs/` and respect deprecation warnings.

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
- **Proxy (`proxy.ts`)**: Acts as the main middleware to intercept requests. Its scope is **strictly for access control and Supabase SSR session verification**. Executing direct database queries (`select`, `insert`) within the proxy is **strictly prohibited**.

## 5. Data Fetching, Caching & State
- **Caching**: When mutating data in Supabase via Server Actions, use Next.js utilities (`revalidatePath`, `revalidateTag`) to update the UI dynamically.
- **State Management**: Prioritize URL Search Params for shareable or SSR-friendly state. Limit the use of Context or `useState` to rich, isolated interactivity in `src/sections/`.
