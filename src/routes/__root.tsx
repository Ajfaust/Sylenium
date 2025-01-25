import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  type NavigateOptions,
  Outlet,
  type ToOptions,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useState } from 'react';
import { RouterProvider } from 'react-aria-components';
import { Sidebar } from '../components/Sidebar.tsx';

const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootRoute,
});

declare module 'react-aria-components' {
  interface RouterConfig {
    href: ToOptions;
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

function RootRoute() {
  let router = useRouter();
  const [isOpen, setIsOpen] = useState(true); // State to track sidebar open/close

  return (
    <>
      <RouterProvider
        navigate={(path, options) => router.navigate({ ...path, ...options })}
        useHref={({ to }) => router.buildLocation({ to }).href}
      >
        <QueryClientProvider client={queryClient}>
          <main className="h-screen flex bg-slate-800 px-3 py-4">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex-1 transition-all duration-300 bg-slate-500 px-3 h-full overflow-hidden">
              <Outlet />
            </div>
          </main>
          <TanStackRouterDevtools />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RouterProvider>
    </>
  );
}
