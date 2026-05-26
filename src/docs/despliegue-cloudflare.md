# 🚀 Despliegue en Cloudflare Workers (OpenNext)

Este documento detalla el proceso completo, la arquitectura de empaquetamiento y las consideraciones técnicas para desplegar la aplicación **Revolución Pineal Closers App** en la plataforma global de **Cloudflare Workers** utilizando la herramienta **OpenNext** (`@opennextjs/cloudflare`).

---

## 🛠️ Arquitectura de Despliegue

La aplicación se ejecuta como un **Serverless Worker** en la red de borde de Cloudflare. Para lograr compatibilidad absoluta con Next.js 16, la infraestructura utiliza:
* **OpenNext** como adaptador para empaquetar Next.js.
* **Compatibilidad Node.js (`nodejs_compat`)** habilitada en los Workers para ejecutar APIs estándar de Node de forma nativa.
* **Compilador Webpack** para evadir errores de compatibilidad de archivos en Windows.

---

## 📁 Estructura de Configuración del Despliegue

El despliegue está compuesto y orquestado por tres archivos de configuración clave en la raíz del proyecto:

### 1. [wrangler.jsonc](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/wrangler.jsonc)
Es el archivo oficial de configuración del Worker de Cloudflare.
```json
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "revolucion-pineal-closers-app",
  "keep_names": false,
  "main": ".open-next/worker.js",
  "compatibility_date": "2026-05-25",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "vars": {
    "NEXT_PUBLIC_SUPABASE_URL": "https://jnjnrapkwbulhipmqfam.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "ey...",
    "NEXT_PRIVATE_MINIMAL_MODE": "1"
  }
}
```

### 2. [open-next.config.ts](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/open-next.config.ts)
Establece los ajustes iniciales para el adaptador de OpenNext.
```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
```

### 3. [.dev.vars](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/.dev.vars) *(Excluido de Git)*
Almacena de forma local y segura todas las variables de entorno de simulación (incluyendo las llaves privadas de n8n) para pruebas en el entorno Wrangler local. **Nunca debe subirse a Git**.

---

## ⚠️ Solución a Desafíos de Compatibilidad (Next.js 16 vs Cloudflare)

Durante la implementación, se resolvieron tres limitaciones cruciales de compatibilidad tecnológica:

### A. Middleware clásico vs Proxy de Next.js 16
* **El Reto:** Next.js 16 depreca la convención `middleware.ts` en favor de `proxy.ts`, forzando a `proxy.ts` a ejecutarse obligatoriamente bajo el runtime de Node.js. Sin embargo, el adaptador OpenNext de Cloudflare aún no tiene soporte completo para interceptores bajo Node.js.
* **La Solución:** Mantuvimos el archivo clásico `src/middleware.ts` (Next.js 16 aún lo soporta) y forzamos la compilación al Edge Runtime experimental:
  ```typescript
  export const runtime = 'experimental-edge'
  ```
  Esto permite que Next.js compile un middleware compatible con el motor de Cloudflare.

### B. Evitar el error de Dynamic Require (`middleware-manifest.json`)
* **El Reto:** Next.js a nivel interno intenta cargar dinámicamente el manifiesto de middleware utilizando `require()`, lo cual arroja un error `500` en Cloudflare Workers al ser un entorno puramente estático.
* **La Solución:** Inyectamos la variable `NEXT_PRIVATE_MINIMAL_MODE=1` para forzar a Next.js a ejecutarse en un modo minimalista serverless que evita esa comprobación dinámica.

### C. Solución al Bug de Rutas en Windows (Forzar Webpack)
* **El Reto:** Next.js 16 utiliza **Turbopack** de forma predeterminada para compilar. Al compilar bajo Windows, Turbopack genera rutas con barras invertidas (`\`) que causan un error `ChunkLoadError` al ejecutarse el bundle en el simulador del Worker de Cloudflare.
* **La Solución:** Desactivamos Turbopack para el build de producción agregando la bandera `--webpack` en `package.json`, obligando a usar Webpack (que procesa perfectamente las rutas bajo Windows):
  ```json
  "build": "next build --webpack"
  ```

### D. Solución al error de minificación `__name is not defined`
* **El Reto:** Librerías como `next-themes` o `react-signature-canvas` serializan scripts a texto o utilizan referencias internas de nombres de funciones. Al empaquetar, el minificador por defecto de Wrangler (`esbuild`) introduce una función de utilidad llamada `__name` para retener los nombres de funciones durante el desarrollo, pero no inyecta su definición en el alcance global de los scripts inline del navegador, lo que causa errores fatales en el cliente al intentar firmar el contrato.
* **La Solución:** Desactivamos explícitamente esta funcionalidad de esbuild agregando la directiva `"keep_names": false` en la raíz de `wrangler.jsonc`:
  ```json
  "keep_names": false
  ```

---

## 🚀 Proceso de Ejecución de Comandos

Los siguientes comandos automatizan todo el flujo de trabajo:

### 1. Previsualizar Localmente (Simulación de Workers)
Compila y lanza un servidor local en `http://127.0.0.1:8787` emulando el comportamiento exacto de Cloudflare Workers y leyendo las variables seguras de tu archivo `.dev.vars`:
```bash
pnpm run preview
```

### 2. Desplegar Directo a Producción
Compila el bundle en limpio utilizando Webpack y lo sube directamente a los servidores globales de Cloudflare del cliente:
```bash
pnpm run deploy
```

---

## 🔒 Variables y Secretos en Producción

Las variables de entorno se gestionan bajo un modelo de segregación de seguridad:

1. **Variables Públicas (Configuradas en `wrangler.jsonc`):**
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `NEXT_PRIVATE_MINIMAL_MODE` (con valor `1`)
   Estas variables se inyectan automáticamente en cada despliegue de forma nativa.

2. **Variables Privadas y Sensibles (Configuradas como "Secrets" en Cloudflare):**
   * `N8N_WEBHOOK_URL_SIGN`
   * `N8N_WEBHOOK_URL_WELCOME`
   
   **¿Cómo agregarlas en producción?**
   Para evitar que se expongan y que `wrangler deploy` las sobreescriba, se deben añadir como **Secrets** (Secretos) en el Panel de Cloudflare:
   * Ir a **Workers & Pages** -> **`revolucion-pineal-closers-app`** -> pestaña **Settings** -> sección **Variables**.
   * Agregar cada una seleccionando el tipo **Secret** y presionar **Save and Deploy**.
