import { IoHome } from "react-icons/io5";
import { CgMenuBoxed } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";

export const navData = [
  {
    navLink: "/",
    navText: "Home",
    navIcon: <IoHome />,
  },
  {
    navLink: "#menu",
    navText: "Menu",
    navIcon: <CgMenuBoxed />,
  },
  {
    navLink: "/orders",
    navText: "Orders",
    navIcon: <FiShoppingCart />,
  },
];
