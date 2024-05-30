import { queryOptions } from '@tanstack/react-query';

import { Category } from '@/types';

const api = '/api/categories';

async function createCategory(c: Partial<Category>) {
  await fetch(`${api}/${c.categoryId}`, {
    method: 'POST',
    body: JSON.stringify(c),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function deleteCategory(id: number) {
  const response = await fetch(`${api}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error();
  }
}

async function getCategoryById(id: number): Promise<Category> {
  return (await fetch(`${api}/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    })) as Category;
}

const categoriesQueryOptions = queryOptions<Category[]>({
  queryKey: ['categories', api],
  queryFn: async () => {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error('Something went wrong getting transactions');
    }
    return response.json();
  },
});

async function updateCategory(c: Partial<Category>) {
  await fetch(`${api}/${c.categoryId}`, {
    method: 'PUT',
    body: JSON.stringify(c),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export {
  categoriesQueryOptions,
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
};
