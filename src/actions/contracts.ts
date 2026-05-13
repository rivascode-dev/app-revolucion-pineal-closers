'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Update contract status to 'firmado' and save signature data.
 * Triggers n8n webhook after successful update.
 */
export async function signContract(
  id: string,
  signatureData: string,
  nombreClienteContrato: string,
  fechaNacimientoCliente: string
) {
  const supabase = await createClient()

  const { data: contract, error: fetchError } = await supabase
    .from('contratos')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !contract) {
    return { error: 'Contrato no encontrado' }
  }

  if (contract.estado === 'firmado') {
    return { error: 'El contrato ya ha sido firmado' }
  }

  const { error: updateError } = await supabase
    .from('contratos')
    .update({
      estado: 'firmado',
      firma_data: signatureData,
      nombre_cliente_contrato: nombreClienteContrato,
      fecha_nacimiento_cliente: fechaNacimientoCliente,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)

  if (updateError) {
    return { error: updateError.message }
  }

  // Phase 5: Trigger n8n Webhook
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_cliente: contract.nombre_cliente,
          nombre_cliente_contrato: nombreClienteContrato,
          fecha_nacimiento_cliente: fechaNacimientoCliente,
          telefono_cliente: contract.telefono_cliente,
          fecha_firma: new Date().toISOString(),
          importe: contract.importe,
          cuotas: contract.numero_cuotas,
          moneda: contract.moneda,
          dia_cobro: contract.dia_cobro,
          tipo_contrato: contract.tipo_contrato
        })
      })
    }
  } catch (e) {
    console.error('Error triggering n8n webhook:', e)
  }

  revalidatePath(`/contrato/${id}`)
  return { success: true }
}
