import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  type NavigateOptions,
  Outlet,
  type ToOptions,
  createRootRouteWithContext,
  redirect,
  useRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { RouterProvider } from 'react-aria-components';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootRoute,
  loader: () => {
    if (location.pathname === '/') {
      throw redirect({
        to: '/ledgers',
        replace: true,
      });
    }
  },
});

declare module 'react-aria-components' {
  interface RouterConfig {
    href: ToOptions;
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

function RootRoute() {
  let router = useRouter();
  const userLang = navigator.language || navigator.languages[0];

  return (
    <>
      <RouterProvider
        navigate={(path, options) => router.navigate({ ...path, ...options })}
        useHref={({ to }) => router.buildLocation({ to }).href}
      >
        <MantineProvider defaultColorScheme="dark">
          <DatesProvider settings={{ locale: userLang }}>
            <main className="h-screen bg-slate-800 px-3 py-4">
              <Outlet />
            </main>
          </DatesProvider>
        </MantineProvider>
      </RouterProvider>
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
