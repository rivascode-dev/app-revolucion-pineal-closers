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
    <div className='min-h-screen bg-[#050505] print:bg-white py-12 px-4 relative overflow-hidden flex items-center justify-center font-sans print:py-0 print:block print:text-black'>
      {/* Background gradients for premium feel */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none print:hidden'>
        <div className='absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[120px]'></div>
        <div className='absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[120px]'></div>
      </div>

      <div className='max-w-3xl w-full space-y-10 relative z-10 animate-in fade-in zoom-in duration-1000 print:space-y-4 print:shadow-none print:max-w-none'>
        {/* Header */}
        <div className='text-center space-y-4 print:space-y-2'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl print:hidden'>
            <div className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse'></div>
            <span className='text-[10px] font-black uppercase tracking-[0.3em] text-white/60'>
              Portal Seguro de Firma
            </span>
          </div>
          <h1 className='text-5xl font-black tracking-tighter text-white print:text-black print:text-3xl'>
            Revolución Pineal
          </h1>
          <p className='text-gray-500 font-medium print:text-gray-800'>
            Contrato de Formación Académica
          </p>
        </div>

        {/* Contract Content */}
        <div className='bg-[#0a0a0a] print:bg-white border border-white/10 print:border-none rounded-[3rem] print:rounded-none shadow-2xl print:shadow-none overflow-hidden backdrop-blur-2xl print:backdrop-blur-none'>
          <div className='p-6 md:p-6 border-b border-white/5 print:border-none bg-white/[0.01] print:bg-transparent'>
            <div
              className='prose prose-invert prose-sm md:prose-base max-w-none 
              prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
              prose-p:text-white/80 prose-p:leading-relaxed
              prose-strong:text-white prose-strong:font-bold
              prose-li:text-white/80
              print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black
              font-serif selection:bg-white selection:text-black print:selection:bg-transparent'
            >
              <ReactMarkdown>{contractText}</ReactMarkdown>
            </div>
          </div>

          {/* Signature Section */}
          <div className='p-10 md:p-16 space-y-10'>
            {contract.estado === 'firmado' ? (
              <div className='flex flex-col items-center justify-center space-y-6 py-4'>
                <div className='relative print:hidden'>
                  <div className='absolute -inset-4 bg-green-400/20 rounded-full blur-xl animate-pulse'></div>
                  <div className='relative bg-green-400/10 p-6 rounded-full border border-green-400/20'>
                    <CheckCircle2
                      size={56}
                      className='text-green-400'
                      strokeWidth={3}
                    />
                  </div>
                </div>
                <div className='text-center space-y-2 print:hidden'>
                  <h2 className='text-2xl font-black text-white tracking-tight'>
                    ¡Contrato Firmado!
                  </h2>
                  <p className='text-gray-500 max-w-xs mx-auto text-sm leading-relaxed'>
                    Tu inscripción se ha procesado con éxito. En breve recibirás
                    los accesos por WhatsApp.
                  </p>
                </div>
                {contract.firma_data && (
                  <div className='mt-10 pt-10 border-t border-white/5 print:border-gray-300 w-full flex flex-col items-center print:mt-4 print:pt-4'>
                    <p className='text-[10px] text-gray-600 mb-6 uppercase tracking-[0.4em] font-black print:mb-2'>
                      Certificado de Firma
                    </p>
                    <div className='bg-white rounded-2xl p-6 shadow-2xl print:shadow-none print:p-0'>
                      <img
                        src={contract.firma_data}
                        alt='Firma Digital'
                        className='max-h-32 grayscale brightness-0 opacity-90'
                      />
                    </div>
                    <div className='mt-4 text-center print:block'>
                      <p className='text-sm text-gray-400 print:text-black font-medium'>
                        Firmado por: {contract.nombre_cliente_contrato}
                      </p>
                      <p className='text-sm text-gray-400 print:text-black font-medium'>
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
          <div className='text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] flex items-center gap-3 print:text-black'>
            <span>SECURE ENCRYPTION</span>
            <span className='w-1 h-1 rounded-full bg-gray-800 print:bg-black'></span>
            <span>ID: {id.split('-')[0].toUpperCase()}</span>
          </div>
          <p className='text-[10px] text-gray-800 print:text-black font-medium max-w-sm'>
            Este documento tiene plena validez legal conforme a la Ley de
            Servicios de la Sociedad de la Información y de Comercio
            Electrónico.
          </p>
        </div>
      </div>
    </div>
  );
}
