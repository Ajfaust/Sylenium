import { Outlet, createRootRoute, useRouter, type NavigateOptions, type RegisteredRouter, type ToOptions } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { RouterProvider } from 'react-aria-components';

export const Route = createRootRoute({
  component: RootRoute
});

declare module 'react-aria-components' {
  interface RouterConfig {
    href: ToPathOption<RegisteredRouter>;
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

function RootRoute() {
  let router = useRouter();
  return (
    <>
      <RouterProvider navigate={(to: string, options: ToOptions) => router.navigate({to, ...options})} useHref={(to: string) => router.buildLocation(to).href} />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}