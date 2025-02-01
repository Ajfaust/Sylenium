import { QueryClient, useQuery } from '@tanstack/react-query';

export function useLedgerState(client: QueryClient) {
  const { data: activeLedgerId } = useQuery({
    queryKey: ['activeLedgerId'],
    queryFn: () => client.getQueryData(['activeLedgerId']) || '',
    staleTime: Infinity,
  });

  const setActiveLedgerId = (ledgerId: string) => {
    client.setQueryData(['selectedLedgerId'], ledgerId);
  };

  return { activeLedgerId, setActiveLedgerId };
}
