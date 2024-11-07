import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { AppSidebar } from '@/components/app-sidebar.tsx';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.tsx';
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
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="mt-5 w-screen">
          <SidebarTrigger />
          <Outlet />
          <Toaster />
        </main>
      </SidebarProvider>
      <TanStackRouterDevtools />
    </div>
  );
}
