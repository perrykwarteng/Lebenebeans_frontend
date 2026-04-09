import { LuLayoutDashboard } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAddLocationAlt } from "react-icons/md";

export const MainMenu = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    id: 2,
    name: "Orders",
    path: "/admin/orders",
    icon: <FiShoppingCart />,
  },
  {
    id: 3,
    name: "Delivered",
    path: "/admin/delivered",
    icon: <TbTruckDelivery />,
  },
];

export const GeneralMenu = [
  {
    id: 1,
    name: "Add Location",
    path: "/admin/location",
    icon: <MdOutlineAddLocationAlt />,
  },
];
