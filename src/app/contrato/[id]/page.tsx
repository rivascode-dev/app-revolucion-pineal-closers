import { createClient } from '@/lib/supabase/server';
import { contractTemplates } from '@/utils/contract-templates';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { SignatureContainer } from '@/sections/contratos/SignatureContainer';
import ReactMarkdown from 'react-markdown';
import { PrintButton } from '@/components/PrintButton';
import { LightModeWrapper } from '@/sections/contratos/LightModeWrapper';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ContractPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: contract, error } = await supabase
    .from('contratos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !contract) {
    notFound();
  }

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

  const isFirmado = contract.estado === 'firmado';

  return (
    <LightModeWrapper>
      <div className="relative min-h-screen bg-slate-50/50 print:bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 print:p-0">
        
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30 print:hidden">
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-violet-400/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto z-10 print:max-w-none print:p-0">
          <div className="space-y-8 md:space-y-12 print:space-y-6">
            
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-3 print:space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm print:hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Portal Seguro de Firma
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Revolución Pineal
              </h1>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Contrato de Formación Académica
              </p>
            </div>

            {/* Document Card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden print:border-none print:shadow-none print:rounded-none">
              
              {/* Document Text */}
              <div className="p-6 sm:p-12 border-b border-slate-100 print:border-none print:p-0">
                <div className="font-serif text-slate-800 leading-loose text-sm md:text-base space-y-4 
                  [&_h1]:text-2xl [&_h1]:font-black [&_h1]:tracking-tight [&_h1]:text-slate-900 [&_h1]:mt-8 [&_h1]:mb-4
                  [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h2]:mb-3
                  [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-2
                  [&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:opacity-90
                  [&_strong]:text-slate-900 [&_strong]:font-bold
                  [&_li]:text-slate-700 [&_li]:mb-1.5 [&_li]:opacity-90 [&_li]:list-disc
                  [&_ul]:pl-6 [&_ul]:mb-4
                  [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal"
                >
                  <ReactMarkdown>{contractText}</ReactMarkdown>
                </div>
              </div>

              {/* Signature / Actions Pad Section */}
              <div className="p-6 sm:p-12 bg-slate-50/50 border-t border-slate-100 print:bg-transparent print:border-none print:p-0 print:mt-8">
                {isFirmado ? (
                  <div className="py-2 flex flex-col items-center justify-center space-y-6">
                    
                    {/* Status Badge */}
                    <div className="relative print:hidden">
                      <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-xl opacity-50" />
                      <div className="relative w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm">
                        <CheckCircle2 className="h-8 w-8" strokeWidth={3} />
                      </div>
                    </div>

                    <div className="text-center space-y-2 print:hidden">
                      <h3 className="text-xl font-extrabold text-slate-800">
                        ¡Contrato Firmado!
                      </h3>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Tu inscripción se ha procesado con éxito. En breve recibirás los accesos por WhatsApp.
                      </p>
                    </div>

                    {/* Signature Image and Certificate */}
                    {contract.firma_data && (
                      <div className="pt-8 border-t border-slate-200/80 w-full flex flex-col items-center print:pt-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 print:mb-2">
                          Certificado de Firma
                        </p>
                        
                        <div className="p-4 rounded-2xl border border-slate-200/60 bg-white shadow-sm print:border-none print:p-0 print:shadow-none">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={contract.firma_data}
                            alt="Firma Digital"
                            className="max-h-24 filter grayscale contrast-200 opacity-90 mx-auto"
                          />
                        </div>

                        <div className="mt-4 text-center space-y-1">
                          <p className="text-sm font-bold text-slate-800 print:text-black">
                            Firmado por: {contract.nombre_cliente_contrato}
                          </p>
                          <p className="text-xs text-slate-500 print:text-black">
                            Fecha de Nacimiento: {contract.fecha_nacimiento_cliente}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="print:hidden">
                      <PrintButton />
                    </div>
                  </div>
                ) : (
                  <div className="print:hidden">
                    <SignatureContainer id={id} />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center text-center space-y-3 pt-4 print:mt-12">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  SECURE ENCRYPTION
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  ID: {id.split('-')[0].toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 max-w-md leading-relaxed">
                Este documento tiene plena validez legal conforme a la Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico.
              </p>
            </div>

          </div>
        </div>
      </div>
    </LightModeWrapper>
  );
}
