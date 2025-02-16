import { Transaction } from '@/types.ts';

async function createTransaction(transaction: Partial<Transaction>) {
  return await fetch('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(transaction),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((r) => r.json())
    .catch((e) => console.log(e.message));
}

export { createTransaction };
