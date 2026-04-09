import { Link } from "react-router-dom";
import Logo from "../assets/images/salad.png";
import { Button } from "./ui/Button";
import { navData } from "../data/navData";
import { motion } from "framer-motion";

export const Navbar = () => {
  const nav = navData;

  return (
    <>
      <div className="md:hidden mb-4 flex justify-between items-center md:bg-white rounded-xl">
        <div className="">
          <Link className="flex items-center gap-x-2" to="/">
            <img className="w-12" src={Logo} alt="Main Logo" />
            <h1 className="text-primary text-[25px] font-medium">
              Lebenebeans
            </h1>
          </Link>
        </div>
        <div className="">
          <ul className="">
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
                <li className="text-secondary text-[20px] font-medium hover:underline hover:text-primary flex items-center gap-x-2">
                  {navItem.navIcon}
                  {navItem.navText}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hidden md:px-5 md:py-2 md:flex bg-bg1 rounded-xl items-center justify-between">
          <Link className="flex items-center gap-x-2" to="/">
            <img className="w-12" src={Logo} alt="Main Logo" />
            <h1 className="text-primary text-[22px] font-medium">
              Lebene beans
            </h1>
          </Link>
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
    </>
  );
};
