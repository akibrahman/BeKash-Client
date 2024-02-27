import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AdminTransactionsPage from "./Pages/AdminTransactionsPage.jsx";
import CashInPage from "./Pages/CashInPage.jsx";
import CashOutPage from "./Pages/CashOutPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import SendMoneyPage from "./Pages/SendMoneyPage.jsx";
import TransactionPage from "./Pages/TransactionPage.jsx";
import TransactionsPage from "./Pages/TransactionsPage.jsx";
import UserWiseTransactionsPage from "./Pages/UserWiseTransactionsPage.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import AdminRoute from "./Routes/AdminRoute.jsx";
import AgentRoute from "./Routes/AgentRoute.jsx";
import UserRoute from "./Routes/UserRoute.jsx";
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
        element: (
          <UserRoute>
            <ProfilePage />
          </UserRoute>
        ),
      },
      {
        path: "/transactions-admin",
        element: (
          <AdminRoute>
            <AdminTransactionsPage />
          </AdminRoute>
        ),
      },
      {
        path: "/transactions",
        element: (
          <UserRoute>
            <TransactionsPage />
          </UserRoute>
        ),
      },
      {
        path: "/transaction/:id",
        element: (
          <AdminRoute>
            <TransactionPage />
          </AdminRoute>
        ),
      },
      {
        path: "/transactions-user-wise",
        element: (
          <AdminRoute>
            <UserWiseTransactionsPage />
          </AdminRoute>
        ),
      },
      {
        path: "/send-money",
        element: (
          <UserRoute>
            <SendMoneyPage />
          </UserRoute>
        ),
      },
      {
        path: "/cash-out",
        element: (
          <UserRoute>
            <CashOutPage />
          </UserRoute>
        ),
      },
      {
        path: "/cash-in",
        element: (
          <AgentRoute>
            <CashInPage />
          </AgentRoute>
        ),
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
