import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { columns, Transaction } from '@/components/transactions/columns';
import { DataTable } from '@/components/transactions/data-table';

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
    <div>
      <h2 className="text-3xl">Transactions</h2>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={transactions} />
      </div>
    </div>
  );
}
