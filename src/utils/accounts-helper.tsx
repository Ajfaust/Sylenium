import { queryOptions } from '@tanstack/react-query';

import { Account } from '../types';

const api = '/api/financial-accounts';

async function getAccountById(accountId: string) {
  const result = await fetch(`${api}/${accountId}`);
  if (!result.ok) {
    throw new Error('Something went wrong');
  }

  return result.json();
}

async function getAllAccountsForLedger(id: string) {
  const result = await fetch(`/api/ledgers/${id}/accounts`);
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

function accountQueryOptions(accountId: string) {
  return queryOptions<Account, Error>({
    queryKey: ['account', accountId, api],
    queryFn: () => getAccountById(accountId),
  });
}

function allAccountsForLedgerQueryOptions(ledgerId: string) {
  return queryOptions<{ accounts: Account[] }, Error>({
    queryKey: ['accounts', ledgerId, api],
    queryFn: () => getAllAccountsForLedger(ledgerId),
  });
}

export {
  accountQueryOptions,
  allAccountsForLedgerQueryOptions,
  createAccount,
  getAccountById,
  getAllAccountsForLedger,
};
