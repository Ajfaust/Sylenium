import { TransactionCategory } from '@/types.ts';
import { queryOptions } from '@tanstack/react-query';

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

export { getAllCategoriesForLedgerQueryOptions };
