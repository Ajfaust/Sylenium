import { NavItem } from '@/types.ts';
import { allAccountsForLedgerQueryOptions } from '@/utils/accounts.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { AppShell, Burger, Flex, NavLink, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { cloneElement, useState } from 'react';
import {
  PiBank,
  PiCaretRight,
  PiHouse,
  PiPlus,
  PiStorefront,
  PiTag,
} from 'react-icons/pi';

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

  const {
    data: accounts,
    isLoading,
    isError,
    error,
  } = useSuspenseQuery(allAccountsForLedgerQueryOptions(id.toString()));

  const [opened, { toggle }] = useDisclosure();
  const [activeItem, setActiveItem] = useState(0);
  const [activeChild, setActiveChild] = useState(-1);

  const navItems: Array<NavItem> = [
    {
      icon: PiHouse,
      link: <Link to="/dashboard" />,
      label: 'Home',
    },
    {
      icon: PiBank,
      label: 'Accounts',
      link: <Link to="/accounts/$accountId" params={{ accountId: '0' }} />,
      children: () => {
        let map = accounts.map(
          (a): NavItem => ({
            label: a.name,
            link: (
              <Link
                to="/accounts/$accountId"
                params={{ accountId: a.id.toString() }}
              />
            ),
          })
        );
        map.push({
          icon: PiPlus,
          label: 'New Account',
          link: (
            <Link
              to="/accounts/$accountId"
              params={{ accountId: 'newAccount' }}
            />
          ),
        });
        return map;
      },
    },
    {
      icon: PiTag,
      label: 'Categories',
      link: <Link to="/categories" />,
    },
    {
      icon: PiStorefront,
      label: 'Vendors',
      link: <Link to="/vendors" />,
    },
  ];

  if (isError) throw error;

  if (isLoading) {
    return <h1 className="text-amber-50">Loading...</h1>;
  }

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar aria-label="Navbar" p="md">
        <AppShell.Section>
          <Flex justify="between">
            <Text>Sylenium</Text>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Flex>
        </AppShell.Section>
        <AppShell.Section grow>
          {navItems.map((item, index) => (
            <NavLink
              key={item.label}
              label={item.label}
              active={index === activeItem}
              leftSection={
                item.icon && <item.icon size={25} strokeWidth={1.5} />
              }
              rightSection={
                item.children && (
                  <PiCaretRight
                    size={16}
                    strokeWidth={1.5}
                    className="mantine-rotate-rtl"
                  />
                )
              }
              onClick={() => {
                if (!item.children) setActiveItem(index);
                setActiveChild(-1);
              }}
              renderRoot={(props) => cloneElement(item.link, { ...props })}
              className="rounded-lg"
            >
              {item.children &&
                item.children().map((c, cIndex) => (
                  <NavLink
                    key={c.label}
                    label={c.label}
                    active={cIndex === activeChild}
                    leftSection={
                      c.icon && <c.icon size={15} strokeWidth={1.5} />
                    }
                    onClick={() => {
                      if (activeItem !== index) setActiveItem(index);
                      if (c.label != 'New Account') setActiveChild(cIndex);
                    }}
                    renderRoot={(props) => cloneElement(c.link, { ...props })}
                    className={`rounded-lg ${c.label == 'New Item' ? 'opacity-50 text-gray-500' : ''}`}
                  />
                ))}
            </NavLink>
          ))}
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
