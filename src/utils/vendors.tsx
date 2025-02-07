import { queryOptions } from '@tanstack/react-query';

async function getAllVendorsForLedger(ledgerId: string) {
  return await fetch(`/api/ledgers/${ledgerId}/vendors`)
    .then((r) => r.json())
    .then((r) => r.vendors)
    .catch((e) => console.log(e.message));
}

function getAllVendorsForLedgerQueryOptions(ledgerId: string) {
  return queryOptions({
    queryKey: ['vendors', '/api/vendors', ledgerId],
    queryFn: () => getAllVendorsForLedger(ledgerId),
  });
}

export { getAllVendorsForLedgerQueryOptions };
