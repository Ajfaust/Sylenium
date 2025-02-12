import { NewVendorModal } from '@/components/NewVendorModal.tsx';
import { VendorList } from '@/components/VendorList.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { getAllVendorsForLedgerQueryOptions } from '@/utils/vendors.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_ledger/vendors')({
  loader: async ({ context: { queryClient } }) => {
    const ledgerId = await queryClient.ensureQueryData(
      getActiveLedgerIdQueryOptions()
    );

    return { ledgerId };
  },
  component: VendorsComponent,
});

function VendorsComponent() {
  const { ledgerId } = Route.useLoaderData();
  const { data, isLoading, isError, error } = useSuspenseQuery(
    getAllVendorsForLedgerQueryOptions(ledgerId.toString())
  );

  if (isError) throw error;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <NewVendorModal ledgerId={ledgerId} />
      <VendorList vendors={data} />
    </>
  );
}
