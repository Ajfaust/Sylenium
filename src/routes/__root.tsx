import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { FaFolderClosed, FaMoneyBills } from 'react-icons/fa6';

import { Sidebar } from '@/components/sidebar';

export const Route = createRootRoute({
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
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
