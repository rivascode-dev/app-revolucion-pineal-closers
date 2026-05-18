# Plan de Implementación: Roles de Usuario y Modificaciones en Base de Datos

## 1. Modificaciones en el Código (Completado)
Se han actualizado los siguientes archivos en el repositorio para soportar la nueva lógica:

- **Formulario de Contratos (`src/app/dashboard/contratos/nuevo/page.tsx`)**:
  - Añadido el campo obligatorio de `email_cliente`.
  - Reemplazada la etiqueta "Importe total" por "Importe de Cuota".
  - Añadida lógica para bloquear el botón "Generar y Obtener Enlace" si falta algún dato del formulario.
  - Sincronizado el modelo de estado de React con el `FormData`.

- **Acciones del Servidor (`src/app/dashboard/contratos/nuevo/actions.ts`)**:
  - Inserción de los campos mapeados correctamente: `importe_cuotas` (desde el campo importe del formulario), `email_cliente` y `user_id` (vinculado a la sesión actual).

- **Gestión de Accesos por Rol (`src/app/dashboard/page.tsx` y `src/app/dashboard/contratos/page.tsx`)**:
  - Se consulta la tabla `user_profiles` usando el ID del usuario autenticado.
  - Si el rol es `closers`, las consultas a `contratos` se filtran aplicando `.eq('user_id', user.id)`. Los administradores (o usuarios sin este rol específico) verán toda la data por defecto.

- **Vistas UI (`src/sections/...`)**:
  - Actualizadas las referencias de `importe` a `importe_cuotas` en la tabla de vista de contratos, las tarjetas estadísticas del dashboard y en el generador de la plantilla del contrato firmado.

## 2. Ejecución en Base de Datos (Acción Requerida)
Actualmente no hay acceso directo mediante MCP a tu instancia de Supabase. Para aplicar los cambios en el esquema, debes ejecutar el siguiente código en el **SQL Editor** de tu panel de Supabase:

```sql
-- 1. Modificar tabla contratos
ALTER TABLE public.contratos RENAME COLUMN importe TO importe_cuotas;
ALTER TABLE public.contratos ADD COLUMN email_cliente TEXT;
ALTER TABLE public.contratos ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- 2. Crear tabla user_profiles si no existe
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  closer_name TEXT,
  role TEXT DEFAULT 'closers'
);

-- Habilitar RLS en user_profiles si se desea (opcional pero recomendado)
-- ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
```

## 3. Creación de Usuarios (Closers)
Para crear a los usuarios solicitados (Nathalia, Daniel y Albert) con la clave compartida (`RevolucionPinealCloser`):

1. Dirígete a la sección **Authentication > Users** en Supabase.
2. Haz clic en **Add user > Create new user**.
3. Añade los correos indicados y la contraseña compartida (`RevolucionPinealCloser`). **Desmarca la casilla de auto-confirmación** si ya tienes correos configurados o confirma los usuarios si es tu flujo habitual.
4. Tras crear los usuarios, copia sus respectivos `UID` generados por Supabase y ejecuta este SQL para asignarles su perfil (reemplaza `<UUID_AQUI>` por los identificadores reales):

```sql
INSERT INTO public.user_profiles (id, full_name, closer_name, role)
VALUES 
  ('<UUID_NATHALIA>', 'Nathalia', 'Nathalia', 'closers'),
  ('<UUID_DANIEL>', 'Daniel', 'Daniel', 'closers'),
  ('<UUID_ALBERT>', 'Albert', 'Albert', 'closers');
```

---

## Preguntas para Feedback de Implementación

1. **Gestión de Permisos:** ¿Deseas que los "closers" tampoco puedan editar o eliminar contratos existentes de otros usuarios a nivel de base de datos (mediante políticas RLS) o es suficiente con la restricción visual en el Dashboard que acabamos de implementar?
Respuesta: Es suficiente con la restricción visual en el Dashboard que acabamos de implementar
2. **Definición de Admin:** Actualmente, cualquier usuario que no tenga el rol `closers` tiene visibilidad de todo (comportamiento de Admin). ¿Es necesario crear un rol explícito `admin` para bloquear el acceso a futuros roles que no sean ni admin ni closers?
Respuesta: Actualmente hay dos usuarios en la tabla users_profiles con role admin
3. **Flujos N8N:** Al cambiar el campo `importe` por `importe_cuotas` y añadir `email_cliente`, ¿necesitas que también modifiquemos la carga útil (payload) del Webhook que se envía a n8n en el archivo `src/actions/contracts.ts` para incluir estos nuevos datos?
Respuesta: Si
