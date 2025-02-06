import { CategoryAccordion } from '@/components/CategoryAccordion.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { getAllCategoriesForLedgerQueryOptions } from '@/utils/transaction-categories.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_ledger/categories')({
  loader: async ({ context: { queryClient } }) => {
    const result = await queryClient.ensureQueryData(
      getActiveLedgerIdQueryOptions()
    );
    const id = result ?? -1;

    return { id };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useLoaderData();

  const { data, isLoading, isError, error } = useSuspenseQuery(
    getAllCategoriesForLedgerQueryOptions(id.toString())
  );

  if (isError) {
    console.log(error?.message);
    throw error;
  }

  if (isLoading) return <h1>Loading...</h1>;

  return <CategoryAccordion categories={data} />;
}
