import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { CategoryAccordion } from '@/components/categories/category-accordion';
import { Accordion } from '@/components/ui/accordion';
import { categoriesQueryOptions } from '@/hooks/categories/get-categories';

export const Route = createFileRoute('/categories')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(categoriesQueryOptions),
  component: Categories,
});

function Categories() {
  const { data: categories } = useSuspenseQuery(categoriesQueryOptions);

  return (
    <div className="container">
      <div className="flex w-full flex-row">
        <h2 className="grow text-3xl">Categories</h2>
      </div>
      <div className="mx-auto py-5">
        <Accordion type="multiple" className="w-full">
          {categories.map((c) => (
            <CategoryAccordion key={c.categoryId} category={c} />
          ))}
        </Accordion>
      </div>
    </div>
    //   <div className="container">
    //     <div className="flex w-full flex-row">
    //       <h2 className="grow text-3xl">Transactions</h2>
    //       <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    //         <DialogTrigger asChild>
    //           <Button className="w-36">New Transaction</Button>
    //         </DialogTrigger>
    //         <DialogContent className="sm:max-w-md">
    //           <NewEditTransactionDialog
    //             type="new"
    //             afterSave={() => setDialogOpen(false)}
    //           />
    //         </DialogContent>
    //       </Dialog>
    //     </div>
    //     <div className="mx-auto py-5">
    //       <DataTable columns={columns} data={transactions} />
    //     </div>
    //   </div>
    // )
  );
}
