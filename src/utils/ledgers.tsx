import { Ledger } from '@/types.ts';
import { queryOptions } from '@tanstack/react-query';

const api = '/api/ledgers';

async function getLedgers() {
  const result = await fetch(api);
  if (!result.ok) {
    throw new Error('Something went wrong');
  }

  return result.json();
}

async function getLedgerById(id: string) {
  const result = await fetch(`${api}/${id}`);
  if (!result.ok) {
    throw new Error(`Error retrieving ledger with id: ${id}`);
  }

  return result.json();
}

async function getActiveLedger() {
  const result = await fetch(`${api}/active`);
  if (!result.ok) throw new Error('Error retrieving active ledger');

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
    queryFn: getLedgers,
  });
}

function getActiveLedgerQueryOptions() {
  return queryOptions<Ledger, Error>({
    queryKey: ['activeLedger', api],
    queryFn: getActiveLedger,
  });
}

export {
  getLedgers,
  getLedgerById,
  getActiveLedger,
  getLedgersQueryOptions,
  getLedgerByIdQueryOptions,
  getActiveLedgerQueryOptions,
};
