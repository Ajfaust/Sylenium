import { queryOptions } from '@tanstack/react-query';
import { Ledger } from '../types.ts';

const api = '/api/ledgers';

async function getLedgers() {
  const result = await fetch(api);
  if (!result.ok) {
    throw new Error('Something went wrong');
  }

  return result.json();
}

function getLedgersQueryOptions() {
  return queryOptions<Ledger[], Error>({
    queryKey: ['ledgers', api],
    queryFn: () => getLedgers(),
  });
}

export { getLedgers, getLedgersQueryOptions };
