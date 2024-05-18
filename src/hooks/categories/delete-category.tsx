import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCircleCheck } from 'react-icons/fa6';

import { CATEGORIES_API } from '@/app/consts';
import { useToast } from '@/components/ui/use-toast';

const deleteTransaction = async (id: number) => {
  const response = await fetch(`${CATEGORIES_API}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error();
  }
};

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, Error, number>({
    mutationKey: ['deleteCategory'],
    mutationFn: deleteTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['category'],
      });
      toast({
        variant: 'default',
        description: (
          <div className="flex flex-row justify-center">
            <FaCircleCheck color="teal" className="mr-3 size-6 self-start" />
            <p className="text-base">Category deleted</p>
          </div>
        ),
      });
    },
  });
}
