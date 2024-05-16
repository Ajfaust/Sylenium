import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCircleXmark } from 'react-icons/fa6';

import { useToast } from '@/components/ui/use-toast';
import { Transaction } from '@/types';

const createTransaction = async (t: Transaction) => {
  await fetch('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(t),
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
