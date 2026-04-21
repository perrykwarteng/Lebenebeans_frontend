import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/salad.png";
import { Button } from "./ui/Button";
import { navData } from "../data/navData";
import { motion } from "framer-motion";

export const Navbar = () => {
  const path = useLocation();
  const nav = useNavigate();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="backdrop-blur-lg border border-white/30 rounded-xl px-3 py-3 flex items-center justify-between z-50 bg-white/60"
    >
      <Link className="flex items-center gap-x-2" to="/">
        <img className="w-10 md:w-12" src={Logo} alt="Main Logo" />
        <h1 className="text-secondary text-lg md:text-xl font-semibold">
          Lebene beans
        </h1>
      </Link>

      <div
        className="action hidden md:block"
        onClick={(e) => {
          e.preventDefault();
          navData.map((navItem) => {
            if (navItem.navLink === "/") {
              nav("/");
            } else {
              if (location.pathname !== "/") {
                nav("/");
              } else {
                const section = document.querySelector(navItem.navLink);
                section?.scrollIntoView({ behavior: "smooth" });
              }
            }
          });
        }}
      >
        <Button
          text={location.pathname === "/" ? "Order Here" : "Home"}
          type="Submit"
        />
      </div>

      {!path.pathname.startsWith("/cart/") ||
      !path.pathname.startsWith("/bulkOrder") ||
      path.pathname.startsWith("bulkOrder") ||
      path.pathname.startsWith("/cart/") ? (
        <div className="flex md:hidden overflow-x-auto gap-4 scrollbar-hide">
          {navData
            .filter((navItem) => {
              if (path.pathname === "/" && navItem.navText === "Home") {
                return false;
              }
              if (
                path.pathname.startsWith("/cart/") ||
                path.pathname.startsWith("/bulkOrder") ||
                path.pathname.startsWith("/history") ||
                path.pathname.startsWith("/")
              ) {
                return navItem.navText === "Home";
              }

              return true;
            })
            .map((navItem) => (
              <div
                key={navItem.navText}
                onClick={(e) => {
                  e.preventDefault();
                  if (navItem.navLink === "/") {
                    nav("/");
                  } else {
                    const section = document.querySelector(navItem.navLink);
                    section?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="shrink-0 text-secondary text-[15px] font-medium"
              >
                <span className="flex items-center gap-x-1">
                  {navItem.navIcon}
                  {navItem.navText}
                </span>
              </div>
            ))}
        </div>
      ) : null}
    </motion.nav>
  );
};
