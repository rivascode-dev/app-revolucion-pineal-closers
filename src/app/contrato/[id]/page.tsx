import { createClient } from '@/lib/supabase/server';
import { contractTemplates } from '@/utils/contract-templates';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { SignatureContainer } from '@/sections/contratos/SignatureContainer';
import ReactMarkdown from 'react-markdown';
import { PrintButton } from '@/components/PrintButton';

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
    .replace(/\[IMPORTE\]/g, contract.importe)
    .replace(/\[NUMERO_CUOTAS\]/g, contract.numero_cuotas)
    .replace(/\[DIA_COBRO\]/g, contract.dia_cobro || '')
    .replace(/\[MONEDA\]/g, contract.moneda || '')
    .replace(
      /\[FECHA\]/g,
      new Date(contract.created_at).toLocaleDateString('es-ES'),
    );

  return (
    <div className='min-h-screen bg-slate-50 py-12 px-4 relative overflow-hidden flex items-center justify-center font-sans print:py-0 print:block print:text-black'>
      {/* Background patterns for a clean premium feel */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none print:hidden opacity-40'>
        <div className='absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[120px]'></div>
        <div className='absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-50/50 rounded-full blur-[120px]'></div>
      </div>

      <div className='max-w-3xl w-full space-y-10 relative z-10 animate-in fade-in zoom-in duration-1000 print:space-y-4 print:shadow-none print:max-w-none'>
        {/* Header */}
        <div className='text-center space-y-4 print:space-y-2'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm print:hidden'>
            <div className='w-1.5 h-1.5 rounded-full bg-green-500'></div>
            <span className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-400'>
              Portal Seguro de Firma
            </span>
          </div>
          <h1 className='text-5xl font-black tracking-tighter text-gray-900 print:text-black print:text-3xl'>
            Revolución Pineal
          </h1>
          <p className='text-gray-500 font-medium print:text-gray-800'>
            Contrato de Formación Académica
          </p>
        </div>

        {/* Contract Content */}
        <div className='bg-white border border-gray-200 rounded-[3rem] shadow-xl shadow-gray-200/50 overflow-hidden print:border-none print:rounded-none print:shadow-none'>
          <div className='p-6 md:p-6 border-b border-gray-100 print:border-none'>
            <div
              className='prose prose-sm md:prose-base max-w-none 
              prose-headings:text-gray-900 prose-headings:font-black prose-headings:tracking-tight
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-li:text-gray-700
              font-serif selection:bg-gray-900 selection:text-white'
            >
              <ReactMarkdown>{contractText}</ReactMarkdown>
            </div>
          </div>

          {/* Signature Section */}
          <div className='p-10 md:p-16 space-y-10 bg-gray-50/50 print:bg-white'>
            {contract.estado === 'firmado' ? (
              <div className='flex flex-col items-center justify-center space-y-6 py-4'>
                <div className='relative print:hidden'>
                  <div className='absolute -inset-4 bg-green-500/10 rounded-full blur-xl'></div>
                  <div className='relative bg-green-500/5 p-6 rounded-full border border-green-500/20'>
                    <CheckCircle2
                      size={56}
                      className='text-green-600'
                      strokeWidth={3}
                    />
                  </div>
                </div>
                <div className='text-center space-y-2 print:hidden'>
                  <h2 className='text-2xl font-black text-gray-900 tracking-tight'>
                    ¡Contrato Firmado!
                  </h2>
                  <p className='text-gray-500 max-w-xs mx-auto text-sm leading-relaxed'>
                    Tu inscripción se ha procesado con éxito. En breve recibirás
                    los accesos por WhatsApp.
                  </p>
                </div>
                {contract.firma_data && (
                  <div className='mt-10 pt-10 border-t border-gray-200 w-full flex flex-col items-center print:mt-4 print:pt-4'>
                    <p className='text-[10px] text-gray-400 mb-6 uppercase tracking-[0.4em] font-black print:mb-2'>
                      Certificado de Firma
                    </p>
                    <div className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm print:border-none print:p-0'>
                      <img
                        src={contract.firma_data}
                        alt='Firma Digital'
                        className='max-h-32 grayscale brightness-0 opacity-90'
                      />
                    </div>
                    <div className='mt-4 text-center print:block'>
                      <p className='text-sm text-gray-600 print:text-black font-semibold'>
                        Firmado por: {contract.nombre_cliente_contrato}
                      </p>
                      <p className='text-xs text-gray-400 print:text-black font-medium'>
                        Fecha de Nacimiento: {contract.fecha_nacimiento_cliente}
                      </p>
                    </div>
                  </div>
                )}
                <div className='print:hidden'>
                  <PrintButton />
                </div>
              </div>
            ) : (
              <div className='print:hidden'>
                <SignatureContainer id={id} />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='flex flex-col items-center gap-4 text-center print:mt-10'>
          <div className='text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] flex items-center gap-3'>
            <span>SECURE ENCRYPTION</span>
            <span className='w-1 h-1 rounded-full bg-gray-200'></span>
            <span>ID: {id.split('-')[0].toUpperCase()}</span>
          </div>
          <p className='text-[10px] text-gray-400 font-medium max-w-sm'>
            Este documento tiene plena validez legal conforme a la Ley de
            Servicios de la Sociedad de la Información y de Comercio
            Electrónico.
          </p>
        </div>
      </div>
    </div>
  );
}
