import { createRouter, NotFoundRoute,RouterProvider} from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { Route as rootRoute } from './routes/__root.tsx';
import { routeTree } from './routeTree.gen';

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => '404 Not Found'
});

const router = createRouter({ routeTree, notFoundRoute });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
