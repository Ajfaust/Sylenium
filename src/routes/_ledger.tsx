import { Navbar } from '@/components/Navbar.tsx';
import { allAccountsForLedgerQueryOptions } from '@/utils/accounts.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { AppShell, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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

  const [opened, { toggle }] = useDisclosure();

  const {
    data: accounts,
    isLoading,
    isError,
    error,
  } = useSuspenseQuery(allAccountsForLedgerQueryOptions(id.toString()));

  if (isError) throw error;

  if (isLoading) {
    return <h1 className="text-amber-50">Loading...</h1>;
  }

  return (
    <AppShell
      header={{
        height: 60,
      }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: !opened, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header aria-label="Ledger Header" p="sm">
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            aira-label={`${opened ? 'Close navigation' : 'Open navigation'}`}
          />
          <Text>Sylenium</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar aria-label="Navbar">
        <Navbar accounts={accounts} p="md" />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
