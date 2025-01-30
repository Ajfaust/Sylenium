import { queryOptions } from '@tanstack/react-query';
import { Ledger } from '../types.ts';

const api = '/api/ledgers';

async function getLedgers(): Promise<Array<Ledger>> {
  const result = await fetch(api);
  if (!result.ok) {
    throw new Error('Something went wrong');
  }

  return result.json();
}

async function getLedgerById(id: string): Promise<Ledger> {
  const result = await fetch(`${api}/${id}`);
  if (!result.ok) {
    throw new Error(`Error retrieving ledger with id: ${id}`);
  }

  return result.json();
}

function getLedgerByIdQueryOptions(id: string) {
  return queryOptions<Ledger, Error>({
    queryKey: ['ledgers', id, api],
    queryFn: () => getLedgerById(id),
  });
}

function getLedgersQueryOptions() {
  return queryOptions<Ledger[], Error>({
    queryKey: ['ledgers', api],
    queryFn: () => getLedgers(),
  });
}

export {
  getLedgers,
  getLedgerById,
  getLedgersQueryOptions,
  getLedgerByIdQueryOptions,
};
