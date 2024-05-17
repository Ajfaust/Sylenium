import { queryOptions } from '@tanstack/react-query';

import { CATEGORIES_API } from '@/app/consts';
import { Category } from '@/types';

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
