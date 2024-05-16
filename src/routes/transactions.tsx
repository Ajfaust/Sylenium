import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/transactions/columns';
import { NewTransactionDialog } from '@/components/transactions/new-transaction';
import { transactionsQueryOptions } from '@/hooks/transactions/get-transactions';

export const Route = createFileRoute('/transactions')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(transactionsQueryOptions),
  component: Transactions,
});

function Transactions() {
  const transactionsQuery = useSuspenseQuery(transactionsQueryOptions);
  const transactions = transactionsQuery.data;

  return (
    <div className="container">
      <div className="flex w-full flex-row">
        <h2 className="grow text-3xl">Transactions</h2>
        <NewTransactionDialog />
      </div>
      <div className="mx-auto py-5">
        <DataTable columns={columns} data={transactions} />
      </div>
    </div>
  );
}
