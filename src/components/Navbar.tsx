import { Link } from "react-router-dom";
import Logo from "../assets/images/salad.png";
import { Button } from "./ui/Button";
import { navData } from "../data/navData";
import { motion } from "framer-motion";

export const Navbar = () => {
  const nav = navData;

  return (
    <>
      <div className="md:hidden mb-4">
        <Link className="flex items-center gap-x-2" to="/">
          <img className="w-12" src={Logo} alt="Main Logo" />
          <h1 className="text-primary text-[22px] font-medium">Lebenebeans</h1>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hidden md:px-5 md:py-2 md:flex bg-white rounded-xl items-center justify-between">
          <Link className="flex items-center gap-x-2" to="/">
            <img className="w-12" src={Logo} alt="Main Logo" />
            <h1 className="text-primary text-[22px] font-medium">
              Lebenebeans
            </h1>
          </Link>
          <div className="ul">
            <nav>
              <ul className="flex items-center gap-x-6">
                {nav.map((navItem) => (
                  <Link
                    key={navItem.navText}
                    to={navItem.navLink}
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.querySelector(navItem.navLink);
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <li className="text-secondary hover:underline hover:text-primary">
                      {navItem.navText}
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
          </div>
          <div
            className="action"
            onClick={(e) => {
              e.preventDefault();
              const section = document.querySelector("#menu");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Button text="Order Here" type="Submit" />
          </div>
        </div>
      </motion.div>

      <div className="fixed md:hidden bottom-10 right-8 left-8 bg-secondary rounded-2xl flex items-center justify-center shadow py-3 z-30">
        <ul className="flex items-center gap-x-4">
          {nav.map((navItem) => (
            <Link
              key={navItem.navText}
              to={navItem.navLink}
              onClick={(e) => {
                e.preventDefault();
                const section = document.querySelector(navItem.navLink);
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <li className="text-white hover:underline hover:text-primary flex items-center gap-x-2">
                {navItem.navIcon}
                {navItem.navText}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};
