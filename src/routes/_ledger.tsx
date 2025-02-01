import { Sidebar } from '@/components/Sidebar.tsx';
import { getActiveLedgerQueryOptions } from '@/utils/ledgers.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_ledger')({
  loader: async ({ context }) => {
    const ledger = await context.queryClient.ensureQueryData(
      getActiveLedgerQueryOptions()
    );

    return { ledger: ledger };
  },
  component: LedgersComponent,
});

function LedgersComponent() {
  const { data, isLoading, isError, error } = useSuspenseQuery(
    getActiveLedgerQueryOptions()
  );

  if (isError) throw error;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex h-full w-full">
      <div className="top-0 h-full w-64 bg-slate-700 rounded-lg">
        <Sidebar accounts={data.accounts} />
      </div>
      <div className="bg-slate-500 h-full w-full overflow-hidden rounded-md">
        <Outlet />
      </div>
    </div>
  );
}
