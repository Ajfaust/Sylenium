import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

import { toast, useToast } from '@/components/ui/use-toast';
import { Transaction } from '@/types';
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  updateTransaction,
} from '@/utils/transactions-helper';

function useCreateTransaction() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<void, Error, Transaction>({
    mutationFn: (values) => createTransaction(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['account'],
      });
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
}

function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, Error, number>({
    mutationKey: ['deleteTransaction'],
    mutationFn: (id) => deleteTransaction(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['account'] });
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

function useGetTransaction(id?: number) {
  return useQuery<Transaction | undefined, Error>({
    queryKey: ['transaction', id],
    queryFn: async () => await getTransactionById(id),
  });
}

function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Partial<Transaction>>({
    mutationFn: (transaction) => updateTransaction(transaction),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['account'] });
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
}

export {
  useCreateTransaction,
  useDeleteTransaction,
  useGetTransaction,
  useUpdateTransaction,
};
