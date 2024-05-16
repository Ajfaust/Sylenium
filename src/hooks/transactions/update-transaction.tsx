import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

import { toast } from '@/components/ui/use-toast';
import { Transaction } from '@/types';

const updateTransaction = async (transaction: Transaction) => {
  await fetch(`/api/transactions/${transaction.transactionId}`, {
    method: 'PUT',
    body: JSON.stringify(transaction),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

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
