import { MantineProvider, createTheme } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

const theme = createTheme({
  fontFamily: 'Monsterrat, sans-serif',
  defaultRadius: 'md',
});

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ModalsProvider>
        <QueryClientProvider client={queryClient}>
          <DatesProvider settings={{ firstDayOfWeek: 0 }}>
            <Outlet />
            <ReactQueryDevtools />
          </DatesProvider>
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
