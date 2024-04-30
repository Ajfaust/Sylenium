import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Home } from "./pages/home.tsx";
import { Portfolios } from "./pages/portfolios.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/portfolios",
        element: <Portfolios />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-slate-900 min-h-screen">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
