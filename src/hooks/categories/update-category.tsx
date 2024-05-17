import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

import { CATEGORIES_API } from '@/app/consts';
import { toast } from '@/components/ui/use-toast';
import { Category } from '@/types';

async function updateCategory(c: Partial<Category>) {
  await fetch(`${CATEGORIES_API}/${c.categoryId}`, {
    method: 'PUT',
    body: JSON.stringify(c),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Partial<Category>>({
    mutationFn: updateCategory,
    onSuccess: async (c) => {
      await queryClient.invalidateQueries({
        queryKey: ['category'],
      });
      toast({
        description: (
          <div className="flex flex-row justify-center">
            <FaCircleCheck color="teal" className="mr-3 size-4 self-start" />
            <p className="text-base">Category updated</p>
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
            <p className="text-base">Failed to update category</p>
          </div>
        ),
      });
      console.log(error);
    },
  });
};
