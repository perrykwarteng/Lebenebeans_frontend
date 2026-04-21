import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { CartPage } from "./features/Cart/Cart";
import { Login } from "./features/Auth/Login";
import { VerifyPayment } from "./features/Auth/verifyPayment";
import { Dashboard } from "./features/Dashboard/pages/Dashboard";
import { Orders } from "./features/Dashboard/pages/Orders";
import { Delivered } from "./features/Dashboard/pages/Delivered";
import { Location } from "./features/Dashboard/pages/Location";
import OrderHistory from "./features/History/OrdersHistory";
import { NotFound } from "./components/NotFound";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cart/:id",
    element: <CartPage />,
  },
  {
    path: "/history",
    element: <OrderHistory />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <VerifyPayment />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/orders",
    element: <Orders />,
  },
  {
    path: "/admin/delivered",
    element: <Delivered />,
  },
  {
    path: "/admin/location",
    element: <Location />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
