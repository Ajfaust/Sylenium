import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/transactions/columns';
import { getAccountOptions } from '@/hooks/accounts/get-accounts';
import { accountTransactionsOptions } from '@/hooks/transactions/get-transactions';
import { FinancialAccount } from '@/types';

export const Route = createFileRoute('/accounts/$financialAccountId')({
  loader: ({ context: { queryClient }, params: { financialAccountId } }) =>
    queryClient.ensureQueryData(
      accountTransactionsOptions(parseInt(financialAccountId))
    ),
  component: Account,
});

function Account() {
  const { financialAccountId } = Route.useParams();
  const { data: account } = useSuspenseQuery<FinancialAccount>(
    getAccountOptions(parseInt(financialAccountId))
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <div className="container">
      <div className="flex w-full flex-row">
        <h2 className="grow text-3xl">Transactions</h2>
      </div>
      <div className="mx-auto py-5">
        <DataTable columns={columns} data={account.transactions} />
      </div>
    </div>
  );
}
