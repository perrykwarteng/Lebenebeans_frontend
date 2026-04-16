// import { Link } from "react-router-dom";
// import Logo from "../assets/images/salad.png";
// import { Button } from "./ui/Button";
// import { navData } from "../data/navData";
// import { motion } from "framer-motion";
// import { useLocation } from "react-router-dom";

// export const Navbar = () => {
//   const path = useLocation();
//   const nav = navData;

//   return (
//     <>
//       <div className="md:hidden mb-4 flex justify-between items-center md:bg-white rounded-xl">
//         <div className="">
//           <Link className="flex items-center gap-x-2" to="/">
//             <img className="w-12" src={Logo} alt="Main Logo" />
//             <h1 className="text-primary text-[25px] font-medium">
//               Lebenebeans
//             </h1>
//           </Link>
//         </div>
//         <div className="">
//           <div>
//             {path.pathname.startsWith("/cart/") ? (
//               ""
//             ) : (
//               <ul>
//                 {nav.map((navItem) => (
//                   <Link
//                     key={navItem.navText}
//                     to={navItem.navLink}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       const section = document.querySelector(navItem.navLink);
//                       section?.scrollIntoView({ behavior: "smooth" });
//                     }}
//                   >
//                     <li className="text-secondary text-[18px] font-medium hover:underline hover:text-primary flex items-center gap-x-1">
//                       {navItem.navIcon}
//                       {navItem.navText}
//                     </li>
//                   </Link>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="hidden md:px-5 md:py-2 md:flex bg-bg1 rounded-xl items-center justify-between">
//           <Link className="flex items-center gap-x-2" to="/">
//             <img className="w-12" src={Logo} alt="Main Logo" />
//             <h1 className="text-primary text-[22px] font-medium">
//               Lebene beans
//             </h1>
//           </Link>
//           {path.pathname.startsWith("/cart/") ? (
//             ""
//           ) : (
//             <div
//               className="action"
//               onClick={(e) => {
//                 e.preventDefault();
//                 const section = document.querySelector("#menu");
//                 section?.scrollIntoView({ behavior: "smooth" });
//               }}
//             >
//               <Button text="Order Here" type="Submit" />
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </>
//   );
// };
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
      className={`w-full rounded-xl px-4 py-3 md:px-6 ${location.pathname.match("/cart/") ? "bg-white" : "bg-bg1 "}`}
    >
      <div className="flex items-center justify-between">
        <Link className="flex items-center gap-x-2" to="/">
          <img className="w-10 md:w-12" src={Logo} alt="Main Logo" />
          <h1 className="text-primary text-lg md:text-xl font-semibold">
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
        path.pathname.startsWith("/cart/") ? (
          <div className="flex md:hidden overflow-x-auto gap-4 scrollbar-hide">
            {navData
              .filter((navItem) => {
                if (path.pathname === "/" && navItem.navText === "Home") {
                  return false;
                }
                if (path.pathname.startsWith("/cart/")) {
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
      </div>
    </motion.nav>
  );
};
