import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/salad.png";
import { Button } from "./ui/Button";
import { navData } from "../data/navData";
import { motion } from "framer-motion";

export const Navbar = () => {
  const path = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white shadow-sm rounded-xl px-4 py-3 md:px-6"
    >
      <div className="flex items-center justify-between">
        <Link className="flex items-center gap-x-2" to="/">
          <img className="w-10 md:w-12" src={Logo} alt="Main Logo" />
          <h1 className="text-primary text-lg md:text-xl font-semibold">
            Lebene beans
          </h1>
        </Link>

        {!path.pathname.startsWith("/cart/") && (
          <div className="hidden md:flex items-center gap-6">
            <Button text="Order Here" type="Submit" />
          </div>
        )}

        {!path.pathname.startsWith("/cart/") && (
          <div className="flex md:hidden overflow-x-auto gap-4 scrollbar-hide">
            {navData.map((navItem) => (
              <button
                key={navItem.navText}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.querySelector(navItem.navLink);
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className="shrink-0 text-secondary text-sm font-medium hover:text-primary"
              >
                <span className="flex items-center gap-x-1">
                  {navItem.navIcon}
                  {navItem.navText}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.nav>
  );
};
