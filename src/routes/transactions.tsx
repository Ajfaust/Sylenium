import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/transactions/columns';
import { NewEditTransactionDialog } from '@/components/transactions/new-edit-transaction';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { transactionsQueryOptions } from '@/hooks/transactions/get-transactions';

export const Route = createFileRoute('/transactions')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(transactionsQueryOptions),
  component: Transactions,
});

function Transactions() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const transactionsQuery = useSuspenseQuery(transactionsQueryOptions);
  const transactions = transactionsQuery.data;

  return (
    <div className="container">
      <div className="flex w-full flex-row">
        <h2 className="grow text-3xl">Transactions</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-36">New Transaction</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <NewEditTransactionDialog
              type="new"
              afterSave={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-auto py-5">
        <DataTable columns={columns} data={transactions} />
      </div>
    </div>
  );
}
