import { Sidebar } from '@/components/Sidebar.tsx';
import { allAccountsForLedgerQueryOptions } from '@/utils/accounts.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_ledger')({
  loader: async ({ context: { queryClient } }) => {
    const ledger = await queryClient.ensureQueryData(
      getActiveLedgerIdQueryOptions()
    );
    const id = ledger.id ?? -1;

    return { id };
  },
  component: ActiveLedgerComponent,
});

function ActiveLedgerComponent() {
  const { id } = Route.useLoaderData();

  if (id == undefined) {
    throw new Error('Active ID is undefined');
  }

  const { data, isLoading, isError, error } = useSuspenseQuery(
    allAccountsForLedgerQueryOptions(id.toString())
  );

  if (isError) throw error;

  if (isLoading) {
    return <h1 className="text-amber-50">Loading...</h1>;
  }

  return (
    <div className="flex h-full w-full">
      <div className="top-0 h-full w-64 bg-slate-700 rounded-lg">
        <Sidebar accounts={data} />
      </div>
      <div className="bg-slate-500 h-full w-full overflow-hidden rounded-md">
        <Outlet />
      </div>
    </div>
  );
}
