import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login/login-page";
import Dashboard from "./layouts/dashboard";
import NonAuth from "./layouts/non-auth";
import Root from "./layouts/root";
import UsersPage from "./pages/users/users-page";
import RestaurantsPage from "./pages/restaurants/restaurants-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/users",
            element: <UsersPage />,
          },
          {
            path: "/restaurants",
            element: <RestaurantsPage />,
          },
        ],
      },
      {
        path: "/auth",
        element: <NonAuth />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
