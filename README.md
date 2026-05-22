# git 

Este repositorio contiene la plataforma oficial de gestión de acuerdos de acceso y automatización de onboarding para los Closers y Alumnos de **Revolución Pineal**. El ecosistema está diseñado bajo una arquitectura de alto rendimiento con **Next.js 16**, **Supabase SSR** y flujos avanzados de orquestación en **n8n**.

---

## 🚀 Características Clave

* **📊 Dashboard de Rendimiento**: Métricas y estadísticas en tiempo real sobre el volumen de cierres (totales, firmados, pendientes).
* **✍️ Firma Digitalizada**: Vista pública responsiva con lienzo táctil/ratón (`react-signature-canvas`) para firma de acuerdos en formato Base64 con validez legal.
* **🔄 Sincronización en Tiempo Real**: WebSocket nativo a través de Supabase Realtime (`useContractsRealtime`) para mantener el listado de contratos de Closers actualizado al segundo sin refrescos de página.
* **🛡️ Middleware de Seguridad Híbrido**: Control absoluto de cookies SSR mediante el enrutamiento protegido e inyección de sesiones en `src/proxy.ts`.
* **⚙️ Server Actions Seguras**: Lógica de base de datos aislada en el servidor para evitar la exposición directa de tokens API y base de datos Supabase.

---

## 🤖 Automatizaciones n8n (`n8n_workflows/`)

La aplicación interactúa directamente con los flujos de n8n configurados localmente en formato JSON:

1. **[Flujo 1: Enviar Acuerdo de Bienvenida](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/src/docs/flujos-n8n.md#-flujo-1-bienvenida-step_1_send_msg_welcomejson)**:
   * Reacciona al webhook `/welcome` cuando se emite una propuesta.
   * Envía un mensaje con el enlace de firma personalizado por WhatsApp utilizando la instancia WasenderAPI del Closer asignado.
2. **[Flujo 2: Post-procesamiento, CRM e IA](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/src/docs/flujos-n8n.md#-flujo-2-post-procesamiento-y-firma-step_2_send_msg_contractjson)**:
   * Reacciona al webhook `/sign` una vez completada la firma.
   * Convierte y guarda legalmente el PDF firmado en Google Drive.
   * Registra los datos del alumno secuencialmente en el libro central "CRM Escuela" (pestañas `alumnos`, `seguimiento`, `pagos`).
   * Añade al alumno a grupos de WhatsApp (`Alma`/`Alquimia`) dinámicamente si corresponde al plan.
   * **Agente AI (GPT-4o-mini)**: Lee la transcripción de su llamada de ventas y extrae en viñetas estructuradas sus **Objetivos, Dolores y Deseos** para su perfilado.
   * Envía resumen final de alumno y secuencia de onboarding (Calendly) desde el número del profesor **Raffaele**.

---

## 📂 Guía de Documentación Interna

Para un análisis técnico profundo de cada módulo del proyecto, consulta los siguientes manuales interactivos en [src/docs](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/src/docs):

* 📖 **[Portal de Inicio - Documentación](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/src/docs/index.md)**
* ⚙️ **[Arquitectura y Seguridad en Next.js & Supabase](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/src/docs/arquitectura-proyecto.md)**
* 🗄️ **[Esquema de BD, Plantillas de Contratos y Firma Digital](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/src/docs/base-datos-contratos.md)**
* 🤖 **[Detalle Paso a Paso de los Flujos de Automatización n8n](file:///d:/devWork/lucem/proyects/revolucion-pineal-closers-app/src/docs/flujos-n8n.md)**

---

## 🛠️ Configuración y Puesta en Marcha

### Prerrequisitos
* Node.js v20 o superior.
* Gestor de paquetes **pnpm**.

### 1. Variables de Entorno (`.env`)
Configura un archivo `.env` en la raíz del proyecto tomando como referencia las siguientes variables requeridas:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-de-supabase

# n8n Webhooks
N8N_WEBHOOK_URL_WELCOME=url-completa-webhook-welcome
N8N_WEBHOOK_URL_SIGN=url-completa-webhook-sign
```

### 2. Instalación de Dependencias
```bash
pnpm install
```

### 3. Servidor de Desarrollo
Inicia el entorno de desarrollo local en `http://localhost:3000`:
```bash
pnpm run dev
```

### 4. Compilación de Producción
Si requieres compilar y validar la aplicación para producción:
```bash
pnpm run build
pnpm start
```
