import { QueryClient, useQuery } from '@tanstack/react-query';

export function useLedgerState(client: QueryClient) {
  const { data: selectedLedgerId } = useQuery({
    queryKey: ['selectedLedgerId'],
    queryFn: () => client.getQueryData(['selectedLedgerId']) || '',
    staleTime: Infinity,
  });

  const setSelectedLedgerId = (ledgerId: string) => {
    client.setQueryData(['selectedLedgerId'], ledgerId);
  };

  return { selectedLedgerId, setSelectedLedgerId };
}
