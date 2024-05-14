import { createFileRoute } from '@tanstack/react-router';

import { columns, Transaction } from '@/components/transactions/columns';
import { DataTable } from '@/components/transactions/data-table';

export const Route = createFileRoute('/transactions/')({
  component: Transactions,
});

function Transactions() {
  const data: Transaction[] = [
    {
      id: 1,
      date: new Date(),
      inflow: 0,
      outflow: 2.24,
      cleared: true,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl">Transactions</h2>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
