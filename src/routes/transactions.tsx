import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { columns, Transaction } from '@/components/transactions/columns';
import { DataTable } from '@/components/transactions/data-table';
import { NewTransactionDialog } from '@/components/transactions/new-transaction';

const transactionsQueryOptions = queryOptions<Transaction[]>({
  queryKey: ['transactions'],
  queryFn: async () => {
    const response = await fetch('/api/transactions');
    if (!response.ok) {
      throw new Error('Something went wrong getting transactions');
    }
    return response.json();
  },
});

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
