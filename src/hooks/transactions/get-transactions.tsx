import { queryOptions, useQuery } from '@tanstack/react-query';

import { Transaction } from '@/types';

const getTransactionById = async (id: number): Promise<Transaction> => {
  return (await fetch(`/api/transactions/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    })) as Transaction;
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

export const useGetTransaction = (id: number) => {
  return useQuery<Transaction, Error>({
    queryKey: ['transaction', id],
    queryFn: () => getTransactionById(id),
  });
};
