import { queryOptions } from '@tanstack/react-query';

import { Account } from '@/types';

const api = '/api/accounts';

async function getAccountById(accountId: string) {
  const result = await fetch(`${api}/${accountId}`);
  if (!result.ok) {
    throw new Error('Something went wrong');
  }

  return result.json();
}

async function getAllAccounts() {
  const result = await fetch(api);
  if (!result.ok) {
    throw new Error('Something went wrong');
  }

  return result.json();
}

function accountQueryOptions(accountId: string) {
  return queryOptions<Account, Error>({
    queryKey: ['account', accountId, api],
    queryFn: () => getAccountById(accountId),
  });
}

const allAccountsQueryOptions = queryOptions<Account[], Error>({
  queryKey: ['accounts', api],
  queryFn: getAllAccounts,
});

export {
  accountQueryOptions,
  allAccountsQueryOptions,
  getAccountById,
  getAllAccounts,
};
