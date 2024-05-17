import { queryOptions, useQuery } from '@tanstack/react-query';

import { CATEGORIES_API } from '@/app/consts';
import { Category } from '@/types';

const getCategoryById = async (id: number): Promise<Category> => {
  return (await fetch(`${CATEGORIES_API}/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    })) as Category;
};

export function useGetCategory(id: number) {
  return useQuery<Category, Error>({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
  });
}

export const categoriesQueryOptions = queryOptions<Category[]>({
  queryKey: ['categories', CATEGORIES_API],
  queryFn: async () => {
    const response = await fetch(CATEGORIES_API);
    if (!response.ok) {
      throw new Error('Something went wrong getting transactions');
    }
    return response.json();
  },
});
