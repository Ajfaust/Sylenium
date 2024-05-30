import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { FaBuildingColumns, FaFolderClosed } from 'react-icons/fa6';

import { Sidebar } from '@/components/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { allAccountsQueryOptions } from '@/utils/accounts-helper';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(allAccountsQueryOptions),
  component: RootRoute,
});

function RootRoute() {
  const { data: accounts } = useSuspenseQuery(allAccountsQueryOptions);

  return (
    <div>
      <Sidebar
        sidebarItems={[
          {
            label: 'Accounts',
            href: '',
            icon: FaBuildingColumns,
            children: accounts.map((account) => ({
              label: account.name,
              href: `/accounts/${account.accountId}`,
            })),
          },
          {
            label: 'Categories',
            href: '/categories',
            icon: FaFolderClosed,
          },
        ]}
      />
      <main className="ml-[300px] mt-5">
        <Outlet />
        <Toaster />
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
