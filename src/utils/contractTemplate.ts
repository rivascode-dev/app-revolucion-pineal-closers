export const CONTRACT_TEMPLATE = `
CONTRATO DE PRESTACIÓN DE SERVICIOS DE FORMACIÓN

En la ciudad de [CIUDAD], a fecha de [FECHA], se celebra el presente contrato entre:

DE UNA PARTE: ESCUELA REVOLUCIÓN PINEAL, (en adelante, "LA ESCUELA").

Y DE OTRA PARTE: [NOMBRE_CLIENTE], con teléfono [TELEFONO_CLIENTE], (en adelante, "EL CLIENTE").

OBJETO DEL CONTRATO
El presente contrato tiene por objeto la formación del CLIENTE en los programas impartidos por LA ESCUELA.

CONDICIONES ECONÓMICAS
El importe total del servicio asciende a la cantidad de [IMPORTE] €, que será abonado en [CUOTAS] cuotas mensuales.

COMPROMISOS DE LAS PARTES
1. LA ESCUELA se compromete a facilitar todo el material y soporte necesario para la correcta formación del CLIENTE.
2. EL CLIENTE se compromete al pago puntual de las cuotas acordadas y a hacer un uso responsable de los recursos facilitados.

POLÍTICA DE PRIVACIDAD
Los datos de carácter personal facilitados por el CLIENTE serán tratados conforme al Reglamento General de Protección de Datos (RGPD).

Y en prueba de conformidad, EL CLIENTE firma el presente contrato de forma digital.
`;

// export function getContractText(data: {
//   nombre: string;
//   telefono: string;
//   importe: number;
//   cuotas: number;
//   fecha: string;
// }) {
//   return CONTRACT_TEMPLATE
//     .replace('[NOMBRE_CLIENTE]', data.nombre)
//     .replace('[TELEFONO_CLIENTE]', data.telefono)
//     .replace('[IMPORTE]', data.importe.toString())
//     .replace('[CUOTAS]', data.cuotas.toString())
//     .replace('[FECHA]', data.fecha)
//     .replace('[CIUDAD]', 'Barcelona'); // Opcional
// }
