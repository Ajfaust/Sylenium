import { AccountCategory } from '@/types.ts';
import { queryOptions } from '@tanstack/react-query';

async function getAllAccountCategoriesForLedger(
  ledgerId: string
): Promise<Array<AccountCategory>> {
  return await fetch(`/api/ledgers/${ledgerId}/fa-categories`)
    .then((r) => r.json())
    .then((r) => r.categories)
    .catch((e) => console.log(e.message));
}

function getAllAccountCategoriesForLedgerQueryOptions(ledgerId: string) {
  return queryOptions({
    queryKey: ['accountCategories', ledgerId, '/api/ledgers'],
    queryFn: () => getAllAccountCategoriesForLedger(ledgerId),
  });
}

export { getAllAccountCategoriesForLedgerQueryOptions };
