import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/transactions/columns';
import { NewEditTransactionDialog } from '@/components/transactions/new-edit-transaction.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Account } from '@/types';
import { accountQueryOptions } from '@/utils/accounts-helper';

export const Route = createFileRoute('/accounts/$accountId')({
  loader: ({ context: { queryClient }, params: { accountId } }) =>
    queryClient.ensureQueryData(accountQueryOptions(accountId)),
  component: AccountSummary,
});

function AccountSummary() {
  const { accountId } = Route.useParams();
  const { data: account } = useSuspenseQuery<Account>(
    accountQueryOptions(accountId)
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="container">
      <div className="flex w-full flex-row">
        <h2 className="grow text-3xl">{account.name} Transactions</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-36">New Transaction</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <NewEditTransactionDialog
              accountId={account.accountId}
              afterSave={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-auto py-5">
        <DataTable columns={columns} data={account.transactions ?? []} />
      </div>
    </div>
  );
}
