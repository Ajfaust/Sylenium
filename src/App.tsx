import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import ErrorPage from "./pages/error.tsx";
import Ledger from "./pages/ledger.tsx";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Ledger />,
        errorElement: <ErrorPage />
      }
    ]
  }
]);

const queryClient = new QueryClient();

const theme = createTheme({
  fontFamily: "Monsterrat, sans-serif",
  defaultRadius: "md",
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
