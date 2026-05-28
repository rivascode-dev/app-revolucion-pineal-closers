'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { contractTemplates } from '@/utils/contract-templates';
import { headers } from 'next/headers';

/**
 * Splits a full name into first name and last names.
 */
function splitFullName(fullName: string): {
  nombre: string;
  apellidos: string;
} {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) {
    return { nombre: '', apellidos: '' };
  }
  if (parts.length === 1) {
    return { nombre: parts[0], apellidos: '' };
  }
  const nombre = parts[0];
  const apellidos = parts.slice(1).join(' ');
  return { nombre, apellidos };
}

/**
 * Maps common international phone prefixes to country names.
 */
function getCountryByPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');

  const countryPrefixes = [
    { prefix: '34', country: 'España' },
    { prefix: '54', country: 'Argentina' },
    { prefix: '56', country: 'Chile' },
    { prefix: '52', country: 'México' },
    { prefix: '57', country: 'Colombia' },
    { prefix: '51', country: 'Perú' },
    { prefix: '58', country: 'Venezuela' },
    { prefix: '593', country: 'Ecuador' },
    { prefix: '595', country: 'Paraguay' },
    { prefix: '598', country: 'Uruguay' },
    { prefix: '591', country: 'Bolivia' },
    { prefix: '506', country: 'Costa Rica' },
    { prefix: '507', country: 'Panamá' },
    { prefix: '502', country: 'Guatemala' },
    { prefix: '503', country: 'El Salvador' },
    { prefix: '504', country: 'Honduras' },
    { prefix: '505', country: 'Nicaragua' },
    { prefix: '599', country: 'Antillas Holandesas' },
    { prefix: '53', country: 'Cuba' },
    { prefix: '509', country: 'Haití' },
    { prefix: '1', country: 'Estados Unidos / Canadá' },
  ];

  const sortedPrefixes = [...countryPrefixes].sort(
    (a, b) => b.prefix.length - a.prefix.length,
  );

  for (const item of sortedPrefixes) {
    if (cleanPhone.startsWith(item.prefix)) {
      return item.country;
    }
  }

  return 'Desconocido';
}

/**
 * Simple markdown parser to convert contract template text to HTML.
 */
function markdownToHtml(markdown: string): string {
  let html = markdown
    .trim()
    .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
    .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^\*\s+(.+)$/gm, '<li>$1</li>')
    .replace(/^-\s+(.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');

  html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, (match) => `<ul>${match}</ul>`);

  if (
    !html.startsWith('<h') &&
    !html.startsWith('<p') &&
    !html.startsWith('<ul')
  ) {
    html = `<p>${html}</p>`;
  }

  return html;
}

/**
 * Generates the complete HTML string for the signed contract.
 */
function generateContractHtml(
  contractText: string,
  nombre: string,
  fechaNacimiento: string,
  signatureData: string,
): string {
  const bodyHtml = markdownToHtml(contractText);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    h1 { font-size: 24px; font-weight: 900; color: #0f172a; margin-top: 30px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
    h2 { font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 24px; }
    h3 { font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 20px; }
    p { margin-bottom: 16px; text-align: justify; }
    strong { color: #0f172a; }
    ul { padding-left: 20px; margin-bottom: 16px; }
    li { margin-bottom: 8px; text-align: justify; }
    .header-logo {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 20px;
    }
    .signature-section {
      margin-top: 50px;
      border-top: 2px dashed #cbd5e1;
      padding-top: 30px;
      text-align: center;
      page-break-inside: avoid;
    }
    .signature-container {
      display: inline-block;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px;
      background-color: #f8fafc;
      margin: 16px 0;
    }
    .signature-image {
      max-height: 100px;
      display: block;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  
  <div>
    ${bodyHtml}
  </div>

  <div class="signature-section">
    <p style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; margin: 0;">Certificado de Firma Digital</p>
    <div class="signature-container">
      <img class="signature-image" src="${signatureData}" alt="Firma Digital" />
    </div>
    <p style="font-size: 15px; font-weight: bold; margin: 8px 0 4px 0; color: #0f172a;">Firmado por: ${nombre}</p>
    <p style="font-size: 13px; color: #475569; margin: 0;">Fecha de Nacimiento: ${fechaNacimiento}</p>
    <p style="font-size: 11px; color: #94a3b8; margin-top: 20px;">Documento firmado electrónicamente con plena validez legal conforme a la legislación aplicable.</p>
  </div>
</body>
</html>`;
}

const contractMapping: Record<string, { plan: string; grupo: string }> = {
  acuerdo_acceso_advanced_healers: {
    plan: 'Advanced Healers',
    grupo: 'Advanced Healers',
  },
  alquimia_vilal_eca: {
    plan: 'Alquimia Vilal (E.C.A)',
    grupo: 'Alma',
  },
  alquimia_vital_eca: {
    plan: 'Alquimia Vilal (E.C.A)',
    grupo: 'Alma',
  },
  alquimia_vilal_energy_master: {
    plan: 'Alquimia Vilal (Energy Master)',
    grupo: 'Alquimia',
  },
  oferta_iniciacion_vitalicio: {
    plan: 'Oferta Iniciación (Vitalicio)',
    grupo: 'Alquimia',
  },
};

/**
 * Update contract status to 'firmado' and save signature data.
 * Triggers n8n webhook after successful update.
 */
export async function signContractAction(
  id: string,
  signatureData: string,
  nombreClienteContrato: string,
  fechaNacimientoCliente: string,
) {
  const supabase = await createClient();

  const { data: contract, error: fetchError } = await supabase
    .from('contratos')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !contract) {
    return { success: false, error: 'Contrato no encontrado' };
  }

  if (contract.estado === 'firmado') {
    return { success: false, error: 'El contrato ya ha sido firmado' };
  }

  const { error: updateError } = await supabase
    .from('contratos')
    .update({
      estado: 'firmado',
      firma_data: signatureData,
      nombre_cliente_contrato: nombreClienteContrato,
      fecha_nacimiento_cliente: fechaNacimientoCliente,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  const calculateEndDate = (startDate: string, months: number) => {
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + months);
    return start;
  };

  // Phase 5: Trigger n8n Webhook
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_URL_SIGN;
    if (webhookUrl) {
      // Get the closer_name of the creator of the contract
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('closer_name')
        .eq('id', contract.user_id)
        .single();

      const { nombre, apellidos } = splitFullName(nombreClienteContrato);
      const pais = getCountryByPhone(contract.telefono_cliente);
      const planInfo = contractMapping[contract.tipo_contrato] || {
        plan: contract.tipo_contrato,
        grupo: 'Alquimia',
      };

      // Load template and replace placeholders
      const rawTemplate =
        contractTemplates[contract.tipo_contrato] ||
        contractTemplates['acuerdo_acceso_advanced_healers'] ||
        '';

      const contractText = rawTemplate
        .replace(/\[NOMBRE_CLIENTE\]/g, contract.nombre_cliente)
        .replace(/\[TELEFONO_CLIENTE\]/g, contract.telefono_cliente)
        .replace(/\[IMPORTE\]/g, contract.importe_cuotas)
        .replace(/\[NUMERO_CUOTAS\]/g, contract.numero_cuotas)
        .replace(/\[DIA_COBRO\]/g, contract.dia_cobro || '')
        .replace(/\[MONEDA\]/g, contract.moneda || '')
        .replace(
          /\[FECHA\]/g,
          new Date(contract.created_at).toLocaleDateString('es-ES'),
        );

      const htmlContrato = generateContractHtml(
        contractText,
        nombreClienteContrato,
        fechaNacimientoCliente,
        signatureData,
      );

      // Get absolute URL for the contract page
      const headersList = await headers();
      const host = headersList.get('host');
      const protocol = host?.includes('localhost') ? 'http' : 'https';
      const baseUrl = `${protocol}://${host}`;

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_cliente_contrato: nombreClienteContrato,
          nombre,
          apellidos,
          telefono_cliente: contract.telefono_cliente,
          email_cliente: contract.email_cliente,
          pais,
          fecha_contrato: new Date(contract.created_at).toLocaleDateString(
            'es-ES',
          ),
          fecha_fin: calculateEndDate(
            contract.created_at,
            contract.numero_cuotas,
          ).toLocaleDateString('es-ES'),
          closer_name: profile?.closer_name || 'Desconocido',
          plan: planInfo.plan,
          grupo: planInfo.grupo,
          tipo_contrato: contract.tipo_contrato,
          link_contrato: `${baseUrl}/contrato/${contract.id}`,
          pdf_name: `Contrato_${nombreClienteContrato.trim().replace(/\s+/g, '_')}_${new Date(contract.created_at).toLocaleDateString('es-ES')}.pdf`,
          importe_total: contract.importe_total,
          importe_pendiente:
            contract.numero_cuotas > 1
              ? contract.importe_total - contract.importe_cuotas
              : 0,
          moneda: contract.moneda,
          numero_cuotas: contract.numero_cuotas,
          cuotas_pendientes: contract.numero_cuotas - 1,
          importe_cuotas: contract.importe_cuotas,
          dia_cobro: contract.dia_cobro,
          html_contrato: htmlContrato,
          firma_data: signatureData,
        }),
      });
    }
  } catch (e) {
    console.error('Error triggering n8n webhook:', e);
  }

  revalidatePath(`/contrato/${id}`);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/contratos');
  return { success: true };
}
