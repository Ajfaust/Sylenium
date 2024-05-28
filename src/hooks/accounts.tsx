import { queryOptions } from '@tanstack/react-query';

import { FinancialAccount } from '@/types';
import { getAccountById } from '@/utils/accounts-helper';

export function getAccountOptions(accountId: number) {
  return queryOptions<FinancialAccount>({
    queryKey: ['account', accountId],
    queryFn: () => getAccountById(accountId),
  });
}
