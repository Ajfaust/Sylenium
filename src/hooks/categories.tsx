import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

import { toast, useToast } from '@/components/ui/use-toast';
import { Category } from '@/types';
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from '@/utils/categories-helper';
import { deleteTransaction } from '@/utils/transactions-helper';

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Partial<Category>>({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['categories'],
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

function useDeleteCategory() {
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

function useGetCategory(id: number) {
  return useQuery<Category, Error>({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
  });
}

function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Partial<Category>>({
    mutationFn: updateCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['category', 'categories'],
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
}

export {
  useCreateCategory,
  useDeleteCategory,
  useGetCategory,
  useUpdateCategory,
};
