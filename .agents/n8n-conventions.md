# n8n Team Development Conventions (Lucem)

Este documento define los estándares obligatorios para la creación de flujos en n8n. El objetivo es garantizar que cualquier miembro del equipo (o agente de IA) pueda leer, mantener e invocar nodos sin errores de sintaxis.

## 1. Nomenclatura de Nodos (ID de Referencia)
Los nombres de los nodos deben ser técnicos, en **inglés**, usar **`snake_case`** y comenzar con un prefijo funcional. **Prohibido usar espacios o caracteres especiales (: / -).**

| Prefijo | Categoría | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `trig_` | **Trigger** | Nodos de inicio (Schedule, Webhook, Form). | `trig_daily_8am` |
| `get_` | **Read** | Consultas a APIs, Bases de Datos o Sheets. | `get_stripe_data` |
| `post_` | **Write** | Creación de registros o envío de mensajes. | `post_whatsapp_msg` |
| `calc_` | **Logic** | Transformaciones de datos (Code, Set, Edit). | `calc_date_params` |
| `flow_` | **Flow** | Control de ejecución (Wait, If, Loop, Switch). | `flow_wait_7s` |
| `sub_` | **Subflow** | Ejecución de flujos secundarios. | `sub_clean_lead` |

## 2. Nomenclatura de Variables (Datos Internos)
Dentro de los nodos de código (`Code`) y en las llaves de salida de los objetos JSON, se debe usar **`camelCase`** descriptivo en **inglés**.

- **Fechas:** Usar sufijo `Date` para strings formateados.
    - ✅ `yesterdayDate`, `eventTimestamp`
    - ❌ `fecha_ayer`, `yesterday` (ambiguo)
- **Booleanos:** Usar prefijos de estado.
    - ✅ `isPaymentValid`, `hasEmail`
- **Métricas:** Ser específico con el estado.
    - ✅ `totalCalls`, `cancelByCloser`, `noShowCount`

## 3. Mejores Prácticas de Resiliencia
- **Anti-Spam:** Todo nodo de envío (WhatsApp/Email) debe ir precedido por un `flow_wait` de al menos 5-7 segundos si está dentro de un bucle.
- **Invocación Segura:** Para referenciar datos de otros nodos, usa siempre la sintaxis de ID:
    - ✅ `{{ $('get_stripe_data').item.json.amount }}`
- **Descriptividad:** Si la lógica interna de un nodo es compleja, utiliza la propiedad **"Description"** del nodo o coloca una **"Sticky Note"** informativa.

## 4. Notas para Agentes de IA (Gemini/Cursor)
Al generar nuevos flujos o modificar existentes:
1. Lee siempre este archivo para aplicar la nomenclatura `prefix_name`.
2. Prioriza el uso de `DateTime` de Luxon para manejo de fechas.
3. Asegura que todas las conexiones (`connections`) coincidan con los nuevos nombres de los nodos.