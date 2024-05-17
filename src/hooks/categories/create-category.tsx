import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

import { CATEGORIES_API } from '@/app/consts';
import { toast } from '@/components/ui/use-toast';
import { Category } from '@/types';

async function createCategory(c: Partial<Category>) {
  await fetch(CATEGORIES_API, {
    method: 'POST',
    body: JSON.stringify(c),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Partial<Category>>({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['categories', CATEGORIES_API],
      });
      toast({
        description: (
          <div className="flex flex-row justify-center">
            <FaCircleCheck color="teal" className="mr-3 size-4 self-start" />
            <p className="text-base">Category created</p>
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
            <p className="text-base">Failed to create transaction</p>
          </div>
        ),
      });
      console.log(error);
    },
  });
};
