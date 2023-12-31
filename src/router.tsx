import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login/login-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);
