import { queryOptions } from '@tanstack/react-query';

import { Account, Transaction } from '@/types';

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

async function createAccount(account: Partial<Account>) {
  const result = await fetch(`${api}`, {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!result.ok) {
    throw new Error('Could not create account');
  }
}

async function getAccountTransactions(
  accountId: string
): Promise<Transaction[]> {
  return (await fetch(`${api}/${accountId}`)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    })) as Transaction[];
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
  createAccount,
  getAccountById,
  getAccountTransactions,
  getAllAccounts
};
