import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CashInPage from "./Pages/CashInPage.jsx";
import CashOutPage from "./Pages/CashOutPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import SendMoneyPage from "./Pages/SendMoneyPage.jsx";
import TransactionsPage from "./Pages/TransactionsPage.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import "./index.css";

const tanstack = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/transactions",
        element: <TransactionsPage />,
      },
      {
        path: "/send-money",
        element: <SendMoneyPage />,
      },
      {
        path: "/cash-out",
        element: <CashOutPage />,
      },
      {
        path: "/cash-in",
        element: <CashInPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={tanstack}>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
