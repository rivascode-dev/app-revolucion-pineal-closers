'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function createContract(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('No autorizado');
  }

  // Obtener el closer_name del perfil del usuario actual
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('closer_name')
    .eq('id', user.id)
    .single();

  const rawData = {
    nombre_cliente: formData.get('nombre_cliente') as string,
    telefono_cliente: formData.get('telefono_cliente') as string,
    email_cliente: formData.get('email_cliente') as string,
    numero_cuotas: parseInt(formData.get('numero_cuotas') as string),
    importe_cuotas: parseFloat(formData.get('importe_cuotas') as string),
    importe_total: parseFloat(formData.get('importe_total') as string),
    dia_cobro: parseInt(formData.get('dia_cobro') as string),
    moneda: formData.get('moneda') as string,
    tipo_contrato: formData.get('tipo_contrato') as string,
    estado: 'pendiente',
    user_id: user.id,
  };

  // Validaciones de campos obligatorios
  if (
    !rawData.nombre_cliente ||
    !rawData.telefono_cliente ||
    !rawData.email_cliente ||
    isNaN(rawData.numero_cuotas) ||
    isNaN(rawData.importe_cuotas) ||
    isNaN(rawData.importe_total) ||
    isNaN(rawData.dia_cobro)
  ) {
    return { error: 'Todos los campos son obligatorios y deben ser válidos' };
  }

  const { data: newContract, error } = await supabase
    .from('contratos')
    .insert([rawData])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Notificación a n8n (Flujo de Bienvenida)
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    const linkContrato = `${baseUrl}/contrato/${newContract.id}`;

    // Intentar usar una URL específica para bienvenida o la general de n8n
    const webhookUrl = process.env.N8N_WEBHOOK_URL_WELCOME;

    if (webhookUrl) {
      // Si la URL es la base de n8n.srv..., y el flujo espera "step_1",
      // podrías necesitar ajustar la URL según cómo esté configurado n8n.
      // Por ahora usamos la URL configurada directamente.
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_cliente: newContract.nombre_cliente,
          telefono_cliente: newContract.telefono_cliente,
          link_contrato: linkContrato,
          closer_name: profile?.closer_name || 'Desconocido',
        }),
      });
    }
  } catch (e) {
    console.error('Error al enviar webhook de bienvenida a n8n:', e);
  }

  revalidatePath('/dashboard/contratos');
  redirect('/dashboard/contratos');
}
