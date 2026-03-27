import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Cart } from "./features/Cart/Cart";
import { Login } from "./features/Auth/Login";
import { VerifyPayment } from "./features/Auth/verifyPayment";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cart/:id",
    element: <Cart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <VerifyPayment />,
  },
]);
