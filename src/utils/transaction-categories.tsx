import { TransactionCategory } from '@/types.ts';
import { queryOptions } from '@tanstack/react-query';

async function createCategory(category: Partial<TransactionCategory>) {
  return await fetch('/api/transaction-categories', {
    method: 'POST',
    body: JSON.stringify(category),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((r) => r.json())
    .catch((e) => console.log(e));
}

async function getAllCategoriesForLedger(
  ledgerId: string
): Promise<Array<TransactionCategory>> {
  return await fetch(`/api/ledgers/${ledgerId}/categories`)
    .then((response) => response.json())
    .then((r) => {
      console.log(r);
      return r.categories;
    })
    .catch((e) => console.log(e.message));
}

function getAllCategoriesForLedgerQueryOptions(ledgerId: string) {
  return queryOptions<Array<TransactionCategory>, Error>({
    queryKey: ['categories', '/api/ledgers', ledgerId],
    queryFn: () => getAllCategoriesForLedger(ledgerId),
  });
}

export { createCategory, getAllCategoriesForLedgerQueryOptions };
