# Plan de Implementación: Flujo de Contratos y UI

He analizado los elementos que has introducido y el nuevo flujo propuesto. Para mantener los estándares de Clean Architecture y asegurar que la interfaz sea reactiva (que los inputs habiliten los checkboxes en tiempo real), debemos realizar los siguientes ajustes paso a paso.

## 1. Actualización de Base de Datos (Supabase)
Ejecutaremos un comando SQL para agregar los nuevos campos requeridos en la tabla `contratos`:
- `moneda` (TEXT)
- `nombre_cliente_contrato` (TEXT)
- `fecha_nacimiento_cliente` (DATE)
- `tipo_contrato` (TEXT)
- `dia_cobro` (INTEGER)

## 2. Refactorización del Flujo de Creación (`nuevo/page.tsx` y `actions.ts`)
- **UI**: Cambiaremos el `name="type_of_contract"` a `name="tipo_contrato"` en el formulario para que coincida con la base de datos.
- **Acción**: Actualizaremos `createContract` en `actions.ts` para que procese e inserte los nuevos campos (`moneda`, `dia_cobro`, `tipo_contrato`).

## 3. Refactorización de la Vista de Firma (`contrato/[id]`)
Actualmente, colocaste los inputs interactivos y el texto directamente en `page.tsx` (que es un Server Component). Esto impide usar estados (`useState`) para validar si están llenos. 
**La solución óptima:**
- Limpiar `page.tsx` dejando solo la visualización estática del contrato.
- Mover toda la lógica interactiva (Inputs -> Texto de Juramento -> Checkboxes -> Firma) a `SignatureContainer.tsx` (que es un Client Component).

## 4. Mejoras de UI en `SignatureContainer` (La propuesta)
Diseñaremos el contenedor para que guíe al usuario progresivamente:
1. **Paso 1: Identificación.** Mostramos los inputs de `Nombre` y `Fecha de nacimiento` con validación visual.
2. **Paso 2: Juramento.** El texto debajo se actualizará en tiempo real a medida que el cliente escribe su nombre.
3. **Paso 3: Consentimiento.** Los checkboxes de consentimiento (`firma_nombre`, `firma_completa`) estarán **deshabilitados** hasta que el Paso 1 esté completo.
4. **Paso 4: Firma.** El componente `SignaturePad` y su botón "Finalizar y Firmar" estarán desactivados hasta que los checkboxes del Paso 3 sean marcados.

Para lograr esto, moveremos los checkboxes fuera de `SignaturePad` y los pondremos en `SignatureContainer` para tener un estado centralizado.

## 5. Nueva Funcionalidad: Descargar PDF
En la vista final (cuando el contrato está firmado):
- Agregaremos un botón flotante o destacado "Descargar como PDF".
- Para la implementación técnica, usaremos la API nativa del navegador (`window.print()`) acompañada de clases CSS especiales (`@media print`) que oculten botones, fondos oscuros y elementos innecesarios, garantizando un PDF de aspecto profesional y limpio sin necesidad de instalar librerías pesadas.
