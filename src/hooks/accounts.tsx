import { useQuery } from '@tanstack/react-query';

import { Account } from '@/types';
import { getAllAccounts } from '@/utils/accounts-helper';

export function useGetAccounts() {
  return useQuery<void, Error, Account[]>({
    queryKey: ['accounts'],
    queryFn: getAllAccounts,
  });
}
