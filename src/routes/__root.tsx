import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { FaFolderClosed, FaMoneyBills } from 'react-icons/fa6';

import { Sidebar } from '@/components/sidebar';
import { Toaster } from '@/components/ui/toaster';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootRoute,
});

function RootRoute() {
  return (
    <div>
      <Sidebar
        sidebarItems={{
          items: [
            {
              label: 'Transactions',
              href: '/transactions',
              icon: FaMoneyBills,
            },
            {
              label: 'Categories',
              href: '/categories',
              icon: FaFolderClosed,
            },
          ],
        }}
      />
      <main className="ml-[300px] mt-5">
        <Outlet />
        <Toaster />
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
