import { queryOptions } from '@tanstack/react-query';

import { Transaction } from '@/types';

export const getTransactions = async (id?: number) => {
  let api = '/api/transactions';
  if (id) {
    api = `${api}/${id}`;
  }
  return await fetch(api);
};

export const transactionsQueryOptions = queryOptions<Transaction[]>({
  queryKey: ['transactions'],
  queryFn: async () => {
    const response = await fetch('/api/transactions');
    if (!response.ok) {
      throw new Error('Something went wrong getting transactions');
    }
    return response.json();
  },
});
