## BRIEFING TÉCNICO

### Plataforma de Gestión de Contratos con Firma Digital

* * *

### Recursos
1. Supabase:
- NEXT_PUBLIC_SUPABASE_URL=https://jnjnrapkwbulhipmqfam.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuam5yYXBrd2J1bGhpcG1xZmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTA2MDUsImV4cCI6MjA4ODMyNjYwNX0.Mod1akONSmFPG_ATG5-qzPM4fQagqCDBSrgSIdHZD9w
- ID proyecto: jnjnrapkwbulhipmqfam


### Instrucciones Generales
- El proyecto debe ser responsive y adaptable a diferentes tamaños de pantalla.
- El proyecto inicialmente sera para los contratos de los estudiantes de Revolucion Pineal, la idea es que en el futuro se puedan seguir agregando otras funcionalidades para los closers y la escuela, para ello su estructura debe ser escalable y modular.
- Usaremos la estructura base actual que es una instalacion limpia con nextjs 16 y Tailwind CSS v4.
- La estructura de carpetas será la siguiente:
  - /app: rutas publicas y autenticación
  - /components: componentes reutilizables
  - /sections: secciones de la aplicación
  - /context: contextos de la aplicación
  - /hooks: hooks personalizados
  - /lib: funciones auxiliares
  - /types: tipos de TypeScript
  - /utils: utilidades de la aplicación
- Usaremos la autenticación de Supabase para el login de usuarios.
- Usaremos la base de datos de Supabase para almacenar los datos de los contratos, la tabla debe llamarse "contratos" y debe tener los siguientes campos: 
  - id: UUID
  - nombre_cliente: string
  - numero_cuotas: number
  - importe: number
  - estado: string
  - fechaCreacion: date
  - fechaActualizacion: date
- Usaremos una plantilla de contrato que sera la misma para todos los contratos. debes generar una plantilla base que sea modificable en los campos variables como el nombre del cliente, el numero de cuotas, el importe, la fecha, etc. la plantilla debe ser un archivo de texto plano y sera insertado en el HTML del contrato.







### 1. Contexto y objetivo

Se necesita desarrollar una plataforma web interna para la gestión de contratos con clientes. La herramienta debe permitir a los **Closers** del equipo crear contratos, enviarlos por enlace y recoger la firma digital del cliente de forma remota.

Una vez firmado el contrato, el sistema disparará automáticamente una automatización en **n8n** que enviará un mensaje de bienvenida al cliente desde el número de teléfono de la escuela.

* * *

### 2. Usuarios del sistema

Inicialmente utilizaremos el usuario y clave del usuario existente:
email: revolucionpineal@gmail.com
contraseña: @@Aqc0n2zka@@


Acceso con correo electrónico y contraseña. Los usuarios iniciales son:
- Dan (Closer)
- Natalia (Closer)
- Albert (Closer)

* * *

### 3. Estructura de la aplicación

#### 3.1 Pantalla de inicio de sesión

Formulario de login con campo de correo electrónico y contraseña. Acceso restringido únicamente a los usuarios registrados.

#### 3.2 Página principal — Listado de contratos

Vista principal tras el login. Muestra todos los contratos creados en formato tabla o listado, con al menos los siguientes datos por contrato:

- **Nombre del cliente**
- **Número de cuotas**
- **Importe**
- **Estado del contrato** (pendiente de firma / firmado)
- **Fecha de creación**

#### 3.3 Pestaña / pantalla — Crear contrato

Formulario accesible desde la navegación principal.

| **Campo** | **Descripción** | **Tipo** |
| --- | --- | --- |
| **Nombre del cliente** | Nombre completo del cliente | Texto |
| **Número de cuotas** | Cantidad de pagos acordados | Número entero |
| **Importe** | Importe total o por cuota (a definir) | Número decimal / € |

> 
> Al enviar el formulario se genera automáticamente la vista del contrato (ver sección 3.4).

#### 3.4 Vista del contrato (página pública con firma)

Página generada automáticamente al crear el contrato. Sus características son:

- Muestra los datos del contrato de forma estructurada y legible.
- Incluye un **recuadro de firma digital** donde el cliente puede firmar con el dedo (móvil) o con el ratón (escritorio).
- Botón de **"Aceptar y firmar"** para confirmar la firma.
- Accesible mediante un **enlace único y público** (sin necesidad de login), pensado para compartir por WhatsApp.

* * *

### 4. Flujo completo de uso

1. El **Closer** inicia sesión en la plataforma.
2. Hace clic en **"Crear contrato"** y rellena el formulario con los datos del cliente.
3. El sistema genera el contrato y proporciona un **enlace único**.
4. El Closer envía ese enlace al cliente por WhatsApp desde el número del Closer.
5. El cliente accede al enlace, revisa el contrato y **firma digitalmente**.
6. Al aceptar, se dispara automáticamente la **automatización en n8n**: se envía un mensaje de bienvenida al cliente desde el número de teléfono del profesor.

* * *

### 5. Integración con n8n

Cuando el cliente firma y acepta el contrato, la plataforma debe realizar una llamada (**webhook**) hacia n8n para disparar el flujo de bienvenida. Dicho flujo enviará un mensaje de WhatsApp desde el número oficial de la escuela al cliente.

Los datos que se pasarán en el webhook son, como mínimo:

- Nombre del cliente.
- Teléfono del cliente (campo a añadir en el formulario si no estaba previsto).
- Fecha y hora de la firma.

* * *

### 6. Notas y consideraciones abiertas

- Decidir si el **importe** en el formulario representa el total del contrato o el importe por cuota.
- Definir el **texto o plantilla** del contrato que se mostrará al cliente (puede ser fijo o parametrizable).
- Confirmar si se necesita almacenar la **firma como imagen** y/o el contrato firmado como **PDF**.
- Confirmar el **texto exacto** del mensaje de bienvenida que enviará n8n.


