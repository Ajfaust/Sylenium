import { queryOptions } from '@tanstack/react-query';

import { Transaction } from '@/types';

const base_api = '/api/transactions';

async function createTransaction(t: Transaction) {
  await fetch(base_api, {
    method: 'POST',
    body: JSON.stringify(t),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function deleteTransaction(id: number) {
  const response = await fetch(`${base_api}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error();
  }
}

async function getTransactionById(id: number): Promise<Transaction> {
  return (await fetch(`${base_api}/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    })) as Transaction;
}

async function getTransactionsByAccount(
  accountId: string
): Promise<Transaction[]> {
  return (await fetch(`${base_api}/${accountId}`)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    })) as Transaction[];
}

const updateTransaction = async (transaction: Partial<Transaction>) => {
  await fetch(`${base_api}/${transaction.transactionId}`, {
    method: 'PUT',
    body: JSON.stringify(transaction),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

function transactionsQueryOptions(accountId: string) {
  return queryOptions({
    queryKey: ['transactions', accountId, base_api],
    queryFn: () => getTransactionsByAccount(accountId),
  });
}

export {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionsByAccount,
  transactionsQueryOptions,
  updateTransaction,
};
