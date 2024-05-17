import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { CategoryAccordion } from '@/components/categories/category-accordion';
import { CategoryForm } from '@/components/categories/category-form';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { categoriesQueryOptions } from '@/hooks/categories/get-categories';
import { Category } from '@/types';

export const Route = createFileRoute('/categories')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(categoriesQueryOptions),
  component: Categories,
});

function Categories() {
  const { data: categories } = useSuspenseQuery(categoriesQueryOptions);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const flattenedCategories: Partial<Category>[] = [];
  categories.forEach((c) => {
    flattenedCategories.push({ categoryId: c.categoryId, name: c.name });
    c.subcategories?.forEach((sc) =>
      flattenedCategories.push({ categoryId: sc.categoryId, name: sc.name })
    );
  });

  return (
    <div className="container">
      <div className="flex w-full flex-row">
        <h2 className="grow text-3xl">Categories</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-36">New Category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <CategoryForm
              categories={flattenedCategories}
              afterSave={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-auto py-5">
        <Accordion type="multiple" className="w-full">
          {categories.map((c) => (
            <CategoryAccordion key={c.categoryId} category={c} />
          ))}
        </Accordion>
      </div>
    </div>
  );
}
