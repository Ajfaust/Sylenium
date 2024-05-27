import { queryOptions } from '@tanstack/react-query';

import { ACCOUNTS_API } from '@/app/consts';
import { FinancialAccount } from '@/types';

async function getAccountById(accountId: number) {
  const result = await fetch(`${ACCOUNTS_API}/${accountId}`);
  if (!result.ok) {
    throw new Error('Something went wrong');
  }

  return result.json();
}

export function getAccountOptions(accountId: number) {
  return queryOptions<FinancialAccount>({
    queryKey: ['account', accountId],
    queryFn: () => getAccountById(accountId),
  });
}
