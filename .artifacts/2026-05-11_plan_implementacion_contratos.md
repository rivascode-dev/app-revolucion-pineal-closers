# Plan de Implementación: Plataforma de Gestión de Contratos

## Fase 1: Configuración Base y Base de Datos (Supabase)
**Objetivo:** Establecer la conexión con Supabase, configurar la autenticación y preparar el esquema de base de datos.

1. **Integración Supabase:** Configurar cliente SSR para Next.js 16 (`@supabase/ssr`).
***NOTA USUARIO:*** Usaremos la base de datos de Supabase del proyecto existente: 
- NEXT_PUBLIC_SUPABASE_URL=https://jnjnrapkwbulhipmqfam.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuam5yYXBrd2J1bGhpcG1xZmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTA2MDUsImV4cCI6MjA4ODMyNjYwNX0.Mod1akONSmFPG_ATG5-qzPM4fQagqCDBSrgSIdHZD9w
- ID proyecto: jnjnrapkwbulhipmqfam


2. **Autenticación:** Crear usuario base (`revolucionpineal@gmail.com`).
***NOTA USUARIO:*** 
- email: revolucionpineal@gmail.com
- contraseña: @@Aqc0n2zka@@

3. **Esquema de Base de Datos:**
   - Crear tabla `contratos`.
   - Campos: `id` (UUID), `nombre_cliente` (string), `telefono_cliente` (string - *adición para n8n*), `numero_cuotas` (number), `importe` (number), `estado` (string: 'pendiente' | 'firmado'), `firma_data` (text/base64 - para guardar la firma), `fechaCreacion` (timestamptz), `fechaActualizacion` (timestamptz).
4. **Seguridad (RLS):** Configurar políticas para permitir lectura/escritura a usuarios autenticados, y lectura/actualización parcial (firma) a usuarios anónimos con el UUID del contrato.
5. **Tipado:** Generar y configurar los tipos TypeScript desde Supabase.

## Fase 2: Autenticación y Estructura UI
**Objetivo:** Proteger la aplicación y proveer navegación básica.

1. **Pantalla de Login:** Crear ruta `/login` con formulario de acceso.
2. **Middleware:** Proteger rutas bajo `/` (redirigir no autenticados a `/login`).
3. **Layout Principal:** Crear el cascarón de la aplicación (Sidebar/Navbar) para Closers.

## Fase 3: Gestión de Contratos (Dashboard)
**Objetivo:** Permitir a los Closers ver y crear nuevos contratos.

1. **Listado de Contratos (`/` o `/dashboard`):**
   - Tabla iterando sobre contratos existentes.
   - Columnas: Nombre, Cuotas, Importe, Estado, Fecha.
2. **Creación de Contrato (`/nuevo`):**
   - Formulario con campos: Nombre del cliente, Teléfono, Número de cuotas, Importe.
   - Acción de guardado en Supabase.
   - Retorno del enlace público generado (`/contrato/[id]`).

## Fase 4: Vista Pública de Contrato y Firma Digital
**Objetivo:** Permitir al cliente revisar el contrato y firmarlo remotamente.

1. **Página Pública (`/contrato/[id]`):**
   - Obtención de datos del contrato vía Supabase SSR.
   - Renderizado de la **Plantilla de Contrato** sustituyendo variables (Nombre, Cuotas, Importe, etc.).
2. **Módulo de Firma:**
   - Integración de lienzo de firma (ej. `react-signature-canvas`).
   - Botón "Aceptar y firmar".
3. **Actualización de Estado:**
   - Al firmar, actualizar registro en BD: `estado = 'firmado'`, `firma_data = [imagen base64]`, `fechaActualizacion = now()`.

## Fase 5: Integración con n8n
**Objetivo:** Automatizar la mensajería post-firma enviando datos precisos al flujo de n8n.

**Requisitos para la Implementación:**
1. **Variables de Entorno:** Configurar `N8N_WEBHOOK_URL` en el archivo `.env` para no exponer la URL públicamente.
2. **Server Action (Backend):** Modificar la función que guarda la firma (actualización en Supabase) para que, una vez confirmada la persistencia en la base de datos, dispare la petición al webhook de n8n.
3. **Construcción del Payload:** Recolectar y formatear los datos extraídos del contrato (`nombre_cliente`, `telefono`, `plantilla_id`) para estructurar el JSON:
   - `nombre_cliente_contrato`: Extraído de la DB.
   - `telefono_cliente`: Extraído de la DB.
   - `tipo_contrato`: Nombre o ID de la plantilla seleccionada.
   - `fecha`: Extraída de `updated_at` (formato YYYY-MM-DD).
   - `hora`: Extraída de `updated_at` (formato HH:MM).
4. **Petición HTTP (Fetch):** Ejecutar un `POST` con cabeceras `Content-Type: application/json`.
5. **Manejo de Errores Resiliente:** Envolver la llamada en un `try/catch` "silencioso". Si el webhook de n8n está caído o hay timeout, **no debe afectar** la experiencia del cliente ni evitar que el contrato se marque como firmado. Solo se debe registrar el error en los logs del servidor.

## Fase 6: Refinamiento
**Objetivo:** Pulido visual y técnico.

1. **Estilos:** Aplicar diseño Mobile-First con Tailwind CSS v4.
2. **Feedback UI:** Estados de carga (loading, success, error) usando `sonner` o similar.
3. **Validaciones:** Validar formularios con `zod` y `react-hook-form`.
