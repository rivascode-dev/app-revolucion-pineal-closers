'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createContract(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('No autorizado');
  }

  const rawData = {
    nombre_cliente: formData.get('nombre_cliente') as string,
    telefono_cliente: formData.get('telefono_cliente') as string,
    numero_cuotas: parseInt(formData.get('numero_cuotas') as string),
    importe: parseFloat(formData.get('importe') as string),
    dia_cobro: parseInt(formData.get('dia_cobro') as string),
    moneda: formData.get('moneda') as string,
    tipo_contrato: formData.get('tipo_contrato') as string,
    estado: 'pendiente',
  };

  const { error } = await supabase.from('contratos').insert([rawData]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard/contratos');
  redirect('/dashboard/contratos');
}
