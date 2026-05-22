# Arquitectura del Proyecto — Next.js & Supabase SSR

Esta sección detalla los pilares técnicos sobre los cuales se ha estructurado la aplicación de Closers de **Revolución Pineal**. El proyecto aprovecha las capacidades de **Next.js 16** junto con la suite de autenticación, tiempo real y almacenamiento relacional de **Supabase SSR**.

---

## 🛠️ Estructura del Framework y Rutas

La aplicación está construida utilizando el **App Router** de Next.js 16 con soporte nativo de **React Server Components (RSC)** y **Server Actions** para la lógica del lado del servidor.

### Mapa de Rutas Principales
* `/` (Página de Inicio): Enrutamiento dinámico dependiendo del estado de la sesión.
* `/login` (Página de Acceso): Formulario de autenticación para los Closers y administradores.
* `/contrato/[id]` (*Puta Pública*): Página autogenerada para que el cliente final pueda leer y firmar el acuerdo de forma digital mediante un lienzo de firma táctil/ratón (`react-signature-canvas`).
* `/dashboard` (*Ruta Protegida*): Resumen estadístico del rendimiento general de cierres.
* `/dashboard/contratos` (*Ruta Protegida*): Listado y buscador de todos los contratos emitidos por el Closer o administrador actual.
* `/dashboard/contratos/nuevo` (*Ruta Protegida*): Panel de creación rápida de nuevos contratos mediante formulario dinámico.

---

## 🛡️ Control de Acceso y Gestión de Sesión (Middleware)

El control de sesión se implementa a través de un patrón de Proxy en el middleware de Next.js. Toda la lógica reside en el archivo [src/proxy.ts](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/src/proxy.ts), el cual se encarga de interceptar las peticiones entrantes:

1. **Gestión de Cookies Supabase SSR (`createServerClient`)**:
   * El cliente de Supabase SSR inicializa las cookies directamente sobre las cabeceras HTTP de Next.js mediante `getAll()` y `setAll()`. Esto garantiza que el estado de sesión esté sincronizado de forma instantánea entre el servidor de Next.js y el navegador, resolviendo posibles inconsistencias de hidratación.
2. **Protección de Rutas**:
   * Determina si la ruta actual es pública. Son públicas `/login` y cualquier subruta de `/contrato` (para permitir la firma del cliente sin requerir inicio de sesión).
   * Si no hay un usuario activo (`user`) y la ruta no es pública, redirige automáticamente a `/login`.
   * Si hay un usuario activo e intenta ingresar a `/login`, lo redirige al `/dashboard`.

---

## ⚡ Server Actions (Acciones de Servidor)

Toda la lógica asíncrona de interacción con la base de datos Supabase se realiza mediante **Server Actions**, asegurando un puente seguro y aislado sin necesidad de exponer endpoints REST públicos directamente.

### 1. `createContract`
Ubicación: [src/app/dashboard/contratos/nuevo/actions.ts](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/src/app/dashboard/contratos/nuevo/actions.ts#L8)

* **Propósito**: Emite un nuevo acuerdo legal legalmente vinculante con estado inicial `pendiente`.
* **Proceso**:
  1. Recupera el usuario autenticado y su perfil de closer (`user_profiles`).
  2. Valida los campos obligatorios del formulario (datos de cliente, cuotas, plan e importe).
  3. Inserta el registro en la tabla `contratos` de Supabase.
  4. **Notificación n8n**: Lanza una llamada POST de forma asíncrona a la variable de entorno `N8N_WEBHOOK_URL_WELCOME` enviando los datos del cliente, el enlace generado `/contrato/[id]` y el nombre del closer responsable.
  5. Revalida la ruta `/dashboard/contratos` para forzar la actualización del listado en el cliente y redirige a la vista general.

### 2. `signContract`
Ubicación: [src/actions/contracts.ts](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/src/actions/contracts.ts#L198)

* **Propósito**: Registra legalmente la firma digital del cliente y lanza el procesamiento de automatización.
* **Proceso**:
  1. Verifica que el contrato exista y no se encuentre previamente `firmado`.
  2. Actualiza el estado a `firmado`, inyecta la firma en formato Base64 (`firma_data`), registra la fecha de nacimiento y el nombre legal certificado.
  3. **Generación de Contrato HTML**: Construye dinámicamente el código HTML que emula el documento legal final combinando la plantilla del tipo de contrato (`contract-templates`) con la firma Base64 inyectada en una etiqueta `<img>` y metadatos de validación (IP, hora).
  4. **Notificación n8n (Procesamiento)**: Envía una llamada POST a la variable de entorno `N8N_WEBHOOK_URL_SIGN` con la estructura de metadatos completa, incluyendo el código HTML listo para ser convertido a PDF, datos de pago y plan del estudiante.
  5. Fuerza la revalidación de las rutas públicas y de control administrativo (`/contrato/[id]`, `/dashboard`, `/dashboard/contratos`).

---

## 🔄 Sincronización en Tiempo Real (`useContractsRealtime`)
Ubicación: [src/hooks/useContractsRealtime.ts](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/src/hooks/useContractsRealtime.ts)

Para mantener a los Closers actualizados sin requerir recargas constantes de página, la aplicación implementa el Hook personalizado `useContractsRealtime`.
* Escucha activamente sobre la tabla `contratos` de Supabase usando WebSockets de Supabase Realtime.
* Recibe eventos de inserción (`INSERT`), actualización (`UPDATE`) y borrado (`DELETE`).
* Realiza filtrados dinámicos del lado del cliente:
  * Si el usuario es un Closer regular, solo se le notifican y actualizan los contratos creados por su propio `user_id`.
  * Si el usuario posee privilegios administrativos, tiene visibilidad completa sobre los eventos de todos los contratos en tiempo real.
