import { CategoryAccordion } from '@/components/CategoryAccordion.tsx';
import { NewCategoryForm } from '@/components/NewCategoryForm.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { getAllCategoriesForLedgerQueryOptions } from '@/utils/transaction-categories.tsx';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_ledger/categories')({
  loader: async ({ context: { queryClient } }) => {
    const result = await queryClient.ensureQueryData(
      getActiveLedgerIdQueryOptions()
    );
    const id = result.id ?? -1;

    return { id };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [opened, { open, close }] = useDisclosure();

  const { id } = Route.useLoaderData();

  const { data, isLoading, isError, error } = useSuspenseQuery(
    getAllCategoriesForLedgerQueryOptions(id.toString())
  );

  if (isError) {
    console.log(error?.message);
    throw error;
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Category">
        <NewCategoryForm
          ledgerId={id}
          parentCategories={data.filter((c) => c.subcategories)}
          closeModal={close}
        />
      </Modal>
      <Button onClick={open}>New Category</Button>
      <CategoryAccordion categories={data} />
    </>
  );
}
