export interface Contract {
  id: string;
  nombre_cliente: string;
  email_cliente?: string;
  telefono_cliente?: string;
  numero_cuotas: number;
  importe_cuotas: string | number;
  estado: 'pendiente' | 'firmado';
  created_at: string;
  tipo_contrato?: string;
  user_id?: string;
  firma_data?: string;
  nombre_cliente_contrato?: string;
  fecha_nacimiento_cliente?: string;
  closer_name?: string;
  signer_ip?: string;
  signed_at?: string;
  moneda?: string;
}
