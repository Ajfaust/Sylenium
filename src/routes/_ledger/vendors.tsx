import { VendorList } from '@/components/VendorList.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { getAllVendorsForLedgerQueryOptions } from '@/utils/vendors.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_ledger/vendors')({
  loader: async ({ context: { queryClient } }) => {
    const ledger = await queryClient.ensureQueryData(
      getActiveLedgerIdQueryOptions()
    );
    const id = ledger?.id ?? -1;

    return { id };
  },
  component: VendorsComponent,
});

function VendorsComponent() {
  const { id } = Route.useLoaderData();
  const { data, isLoading, isError, error } = useSuspenseQuery(
    getAllVendorsForLedgerQueryOptions(id.toString())
  );

  if (isError) throw error;

  if (isLoading) return <h1>Loading...</h1>;

  return <VendorList vendors={data} />;
}
