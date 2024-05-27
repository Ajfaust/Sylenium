import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

import { toast, useToast } from '@/components/ui/use-toast';
import { Transaction } from '@/types';

const base_api = '/api/transactions';

const createTransaction = async (t: Transaction) => {
  await fetch(base_api, {
    method: 'POST',
    body: JSON.stringify(t),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

async function deleteTransaction(id: number) {
  const response = await fetch(`${base_api}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error();
  }
}

const getTransactionById = async (id: number): Promise<Transaction> => {
  return (await fetch(`${base_api}/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    })) as Transaction;
};

async function getTransactionsByAccount(accountId: number) {
  const result = await fetch(`${base_api}/account/${accountId}`);
  if (!result.ok) {
    throw new Error('Something went wrong');
  }

  return result.json();
}

const updateTransaction = async (transaction: Transaction) => {
  await fetch(`${base_api}/${transaction.transactionId}`, {
    method: 'PUT',
    body: JSON.stringify(transaction),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const useCreateTransaction = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<void, Error, Transaction>({
    mutationFn: (values) => createTransaction(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: (
          <div className="flex flex-row">
            <FaCircleXmark color="red" className="size-4 self-start" />
            <p className="text-base">Failed to create transaction</p>
          </div>
        ),
      });
      console.log(error);
    },
  });
};

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, Error, number>({
    mutationKey: ['deleteTransaction'],
    mutationFn: (id) => deleteTransaction(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        variant: 'default',
        description: (
          <div className="flex flex-row justify-center">
            <FaCircleCheck color="teal" className="mr-3 size-6 self-start" />
            <p className="text-base">Transaction deleted.</p>
          </div>
        ),
      });
    },
  });
}

export const useGetTransaction = (id: number) => {
  return useQuery<Transaction, Error>({
    queryKey: ['transaction', id],
    queryFn: () => getTransactionById(id),
  });
};

export function accountTransactionsOptions(accountId: number) {
  return queryOptions<Transaction[]>({
    queryKey: ['accountTransactions', accountId],
    queryFn: () => getTransactionsByAccount(accountId),
  });
}

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Transaction>({
    mutationFn: (transaction) => updateTransaction(transaction),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        variant: 'default',
        description: (
          <div className="flex flex-row items-center">
            <FaCircleCheck color="teal" className="mr-3 size-6 self-start" />
            <p className="text-base">Transaction updated successfully</p>
          </div>
        ),
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: (
          <div className="flex flex-row items-center">
            <FaCircleXmark color="red" className="mr-3 size-6 self-start" />
            <p className="text-base">Failed to update transaction</p>
          </div>
        ),
      });
      console.log(error);
    },
  });
};
