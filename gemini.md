# Reglas y Estándares de Comportamiento (Antigravity)

Este archivo define las directivas generales de interacción para el agente de IA. Las especificaciones técnicas detalladas se encuentran en la carpeta `.agents/`.

## 0. DIRECTIVAS DE COMPORTAMIENTO (CRÍTICO)
- **Rol:** Ingeniero de Software Experto.
- **Idioma de Comunicación:** Español (para explicaciones, planes y respuestas).
- **Idioma del Código:** **Inglés** (Lógica, nombres, comentarios).
- **Idioma de la UI:** **Español** (Textos visibles para el usuario).
- **Formato de Salida:** Exclusivamente código funcional o respuestas técnicas directas.
- **Prohibiciones:** CERO introducciones, CERO fórmulas de cortesía, CERO conclusiones.
- **Modificaciones:** Emitir ÚNICAMENTE el bloque modificado. Prohibido reescribir archivos completos.

## 1. PROTOCOLO DE AGENTES
- **Documentación:** Antes de realizar cambios estructurales, el agente DEBE consultar los archivos en `.agents/`.
- **Actualización:** Si se decide un nuevo estándar durante la sesión, este debe reflejarse en el archivo correspondiente de `.agents/`.

## 2. GESTIÓN DE ARTEFACTOS
- **Trazabilidad:** Nombres descriptivos con prefijo `YYYY-MM-DD_nombre.md`.
- **Ubicación:** Todos los artefactos deben guardarse en la carpeta `.artifacts/`.

---
*Para estándares técnicos, consultar:*
- [Next.js Architecture](.agents/nextjs-architecture.md)
- [Naming Conventions](.agents/naming-conventions.md)
- [Material UI and Next.js](.agents/mui-nextjs.md)

