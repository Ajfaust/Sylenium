import { Ledger } from '@/types.ts';
import { queryOptions } from '@tanstack/react-query';

const api = '/api/ledgers';

async function getLedgers() {
  return await fetch(api).then((response) => response.json());
}

async function getLedgerById(id: string) {
  return await fetch(`${api}/${id}`).then((response) => response.json());
}

async function getActiveLedgerId() {
  return await fetch(`${api}/active`).then((response) => response.json());
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

function getActiveLedgerIdQueryOptions() {
  return queryOptions<Partial<Ledger>, Error>({
    queryKey: ['activeLedgerId', api],
    queryFn: getActiveLedgerId,
  });
}

export {
  getActiveLedgerId,
  getLedgersQueryOptions,
  getLedgerByIdQueryOptions,
  getActiveLedgerIdQueryOptions,
};
