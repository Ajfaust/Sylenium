import { useQuery } from '@tanstack/react-query';

import { TRANSACTIONS_API } from '@/app/consts';
import { Transaction } from '@/types';

const getTransactionById = async (id: number): Promise<Transaction> => {
  return (await fetch(`${TRANSACTIONS_API}/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    })) as Transaction;
};

export const useGetTransaction = (id: number) => {
  return useQuery<Transaction, Error>({
    queryKey: ['transaction', id],
    queryFn: () => getTransactionById(id),
  });
};
