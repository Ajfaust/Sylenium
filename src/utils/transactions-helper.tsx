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

async function getTransactionsByAccount(accountId: number) {
  const result = await fetch(`${base_api}/account/${accountId}`);
  if (!result.ok) {
    throw new Error('Something went wrong');
  }

  return result.json();
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

export {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionsByAccount,
  updateTransaction,
};
