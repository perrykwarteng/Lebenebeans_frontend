// import HeroImg from "../assets/images/hero.png";
// import { motion } from "framer-motion";

// import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { getCloseStatus } from "../features/Dashboard/service";
// import type { CloseType } from "../features/Dashboard/type";
// import { Button } from "./ui/Button";
// import { TbShoppingBagPlus } from "react-icons/tb";
// import { TbClipboardList } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";

// export const Hero = () => {
//   const nav = useNavigate();

//   const { data, refetch } = useQuery<CloseType>({
//     queryKey: ["closeStatus"],
//     queryFn: getCloseStatus,
//   });

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   return (
//     // <section className="bg-white flex items-center">
//     //   <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-24 md:py-20">
//     //     {data?.closeOrders === "close" && (
//     //       <div className="marquee-container py-2 bg-secondary z-20 md:mt-4">
//     //         <div className="marquee text-white text-[23px]">
//     //           Sorry we have closed. Cannot place orders at this time Thank you!
//     //         </div>
//     //       </div>
//     //     )}
//     //     <div className="flex flex-col md:flex-row items-center gap-10  mt-2 md:mt-8">
//     //       <motion.div
//     //         className="flex-1 text-center md:text-left"
//     //         initial={{ opacity: 0, x: -40 }}
//     //         animate={{ opacity: 1, x: 0 }}
//     //         transition={{ duration: 0.7 }}
//     //       >
//     //         <h2
//     //           className="font-semibold leading-tight
//     //           text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
//     //         >
//     //           Order your <span className="text-primary">Favourite Foods </span>
//     //           at Lebene Beans
//     //         </h2>

//     //         <p
//     //           className="text-gray-500 mt-4
//     //           text-base sm:text-lg md:text-xl"
//     //         >
//     //           From the comfort of your home.
//     //         </p>

//     //         <div className=" flex flex-col md:flex-row items-center gap-x-4 gap-y-2 mt-3">
//     //           <div
//     //             className="flex gap-x-3 items-center bg-secondary text-white px-5 py-2 text-center rounded-xl"
//     //             onClick={() => {
//     //               nav("/bulkOrder");
//     //             }}
//     //           >
//     //             <TbShoppingBagPlus />
//     //             <Button text="Bulk Orders" Stlye="bg-transparent" />
//     //           </div>

//     //           <div
//     //             className="flex gap-x-3 items-center bg-secondary text-white px-5 py-2 text-center rounded-xl"
//     //             onClick={() => {
//     //               nav("/history");
//     //             }}
//     //           >
//     //             <TbClipboardList />
//     //             <Button text="View Past Orders" Stlye="bg-transparent" />
//     //           </div>
//     //         </div>
//     //       </motion.div>

//     //       <motion.div
//     //         className="flex-1 flex justify-center"
//     //         initial={{ opacity: 0, x: 40 }}
//     //         animate={{ opacity: 1, x: 0 }}
//     //         transition={{ duration: 0.7 }}
//     //       >
//     //         <img
//     //           src={HeroImg}
//     //           alt="Hero"
//     //           className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
//     //         />
//     //       </motion.div>
//     //     </div>
//     //   </div>
//     // </section>
//   );
// };
