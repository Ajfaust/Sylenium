import { NewTransactionForm } from '@/components/NewTransaction.tsx';
import { TransactionTable } from '@/components/TransactionTable.tsx';
import { accountQueryOptions } from '@/utils/accounts.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_ledger/accounts/$accountId')({
  loader: async ({ params: { accountId }, context }) => {
    await context.queryClient.ensureQueryData(accountQueryOptions(accountId));
  },
  component: AccountComponent,
});

function AccountComponent() {
  const { accountId } = Route.useParams();
  const { data: ledger } = useQuery(getActiveLedgerIdQueryOptions());
  const [opened, { open, close }] = useDisclosure(false);

  const {
    data: account,
    isLoading,
    isError,
  } = useSuspenseQuery(accountQueryOptions(accountId));

  if (isError) throw new Error('Error loading account');

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log(account);

  return (
    <>
      <>
        <Modal
          opened={opened}
          onClose={close}
          title="NewTransaction"
          size="auto"
        >
          <NewTransactionForm
            ledgerId={ledger?.id ?? 0}
            accountId={parseInt(accountId)}
            closeModal={close}
          />
        </Modal>
        <Button onClick={open}>New Transaction</Button>
      </>
      <TransactionTable data={account.transactions} />
    </>
  );
}
