import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Categories from './components/categories/categories.tsx';
import { Transactions } from './components/transactions/transactions.tsx';
import ErrorPage from './pages/error.tsx';
import Ledger from './pages/ledger.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'ledger',
        element: <Ledger />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'transactions',
            element: <Transactions />,
            errorElement: <ErrorPage />,
          },
          {
            path: 'categories',
            element: <Categories />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
