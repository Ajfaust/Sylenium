import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

import { toast } from '@/components/ui/use-toast';
import { Account } from '@/types';
import { createAccount, getAllAccounts } from '@/utils/accounts-helper';

function useGetAccounts() {
  return useQuery<void, Error, Account[]>({
    queryKey: ['accounts'],
    queryFn: getAllAccounts,
  });
}

function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Partial<Account>>({
    mutationFn: createAccount,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['accounts'],
      });
      toast({
        description: (
          <div className="flex flex-row justify-center">
            <FaCircleCheck color="teal" className="mr-3 size-4 self-start" />
            <p className="text-base">Account created</p>
          </div>
        ),
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: (
          <div className="flex flex-row justify-center">
            <FaCircleXmark color="red" className="mr-3 size-4 self-start" />
            <p className="text-base">Failed to create account</p>
          </div>
        ),
      });
      console.log(error);
    },
  });
}

export { useCreateAccount, useGetAccounts };
