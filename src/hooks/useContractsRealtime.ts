import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Contract } from '@/types/contract';

export function useContractsRealtime(
  initialContracts: Contract[] | null,
  isCloser: boolean,
  userId?: string,
  searchQuery?: string
) {
  const [contracts, setContracts] = useState<Contract[]>(initialContracts || []);

  useEffect(() => {
    setContracts(initialContracts || []);
  }, [initialContracts]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel('realtime-contracts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contratos',
        },
        async (payload) => {
          if (payload.eventType === 'INSERT') {
            const newContract = payload.new as Contract;
            if (isCloser && userId && newContract.user_id !== userId) {
              return;
            }
            if (searchQuery && !newContract.nombre_cliente.toLowerCase().includes(searchQuery.toLowerCase())) {
              return;
            }

            // Fetch the closer name in real-time to complete the relation
            let closerName = 'Sin asignar';
            if (newContract.user_id) {
              const { data } = await supabase
                .from('user_profiles')
                .select('closer_name')
                .eq('id', newContract.user_id)
                .single();
              if (data?.closer_name) {
                closerName = data.closer_name;
              }
            }
            newContract.user_profiles = { closer_name: closerName };

            setContracts((prev) => {
              if (prev.some((c) => c.id === newContract.id)) return prev;
              return [newContract, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            const updatedContract = payload.new as Contract;
            if (isCloser && userId && updatedContract.user_id !== userId) {
              return;
            }
            if (searchQuery && !updatedContract.nombre_cliente.toLowerCase().includes(searchQuery.toLowerCase())) {
              setContracts((prev) => prev.filter((c) => c.id !== updatedContract.id));
              return;
            }

            // Fetch the closer name in real-time to complete the relation
            let closerName = 'Sin asignar';
            if (updatedContract.user_id) {
              const { data } = await supabase
                .from('user_profiles')
                .select('closer_name')
                .eq('id', updatedContract.user_id)
                .single();
              if (data?.closer_name) {
                closerName = data.closer_name;
              }
            }
            updatedContract.user_profiles = { closer_name: closerName };

            setContracts((prev) =>
              prev.map((c) => (c.id === updatedContract.id ? updatedContract : c))
            );
          } else if (payload.eventType === 'DELETE') {
            const oldId = payload.old.id;
            setContracts((prev) => prev.filter((c) => c.id !== oldId));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isCloser, userId, searchQuery]);

  return contracts;
}
