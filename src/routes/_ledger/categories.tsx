import { CategoryAccordion } from '@/components/CategoryAccordion.tsx';
import { NewCategoryModal } from '@/components/NewCategoryModal.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { getAllCategoriesForLedgerQueryOptions } from '@/utils/transaction-categories.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_ledger/categories')({
  loader: async ({ context: { queryClient } }) => {
    const ledgerId = await queryClient.ensureQueryData(
      getActiveLedgerIdQueryOptions()
    );

    return { ledgerId };
  },
  component: TransactionCategoriesComponent,
});

function TransactionCategoriesComponent() {
  const { ledgerId } = Route.useLoaderData();

  const { data, isLoading, isError, error } = useSuspenseQuery(
    getAllCategoriesForLedgerQueryOptions(ledgerId.toString())
  );

  if (isError) {
    console.log(error?.message);
    throw error;
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <NewCategoryModal />
      <CategoryAccordion categories={data} />
    </>
  );
}
