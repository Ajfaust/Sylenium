import { queryOptions } from '@tanstack/react-query';

import { Account } from '@/types';

const api = '/api/financial-accounts';

async function getAccountById(accountId: string) {
  return await fetch(`${api}/${accountId}`).then((response) => response.json());
}

async function getAllAccountsForLedger(id: string) {
  return await fetch(`/api/ledgers/${id}/financial-accounts`)
    .then(async (response) => await response.json())
    .then((r) => r.accounts)
    .catch((e) => console.log(e.message));
}

async function createAccount(account: Partial<Account>) {
  return await fetch(`${api}`, {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e.message));
}

function accountQueryOptions(accountId: string) {
  return queryOptions<Account, Error>({
    queryKey: ['account', accountId, api],
    queryFn: () => getAccountById(accountId),
  });
}

function allAccountsForLedgerQueryOptions(ledgerId: string) {
  return queryOptions<Array<Account>, Error>({
    queryKey: ['accounts', ledgerId, '/api/ledgers'],
    queryFn: () => getAllAccountsForLedger(ledgerId),
  });
}

export { accountQueryOptions, allAccountsForLedgerQueryOptions, createAccount };
