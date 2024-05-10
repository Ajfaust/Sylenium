import { AppShell, Burger, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NavBar from '../components/navbar/navbar';
import { Outlet } from 'react-router-dom';

export default function Ledger() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section>Navbar Header</AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <NavBar />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
