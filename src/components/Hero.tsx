import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Menu } from "../features/Menu/Menu";
import Background from "../assets/images/backgroundImage.jpg";
import { getCloseStatus } from "../features/Dashboard/service";
import type { CloseType } from "../features/Dashboard/type";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const HeroMenu = () => {
  const { data, refetch } = useQuery<CloseType>({
    queryKey: ["closeStatus"],
    queryFn: getCloseStatus,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { scrollY } = useScroll();
  const bgScale: MotionValue<number> = useTransform(
    scrollY,
    [0, 800],
    [1, 0.85],
  );
  const bgY: MotionValue<number> = useTransform(scrollY, [0, 700], [0, 50]);
  const bgBlur = useTransform(scrollY, [0, 700], [0, 8]);

  const midScale: MotionValue<number> = useTransform(
    scrollY,
    [0, 800],
    [1, 0.75],
  );
  const midY: MotionValue<number> = useTransform(scrollY, [0, 700], [0, 100]);

  const blurValue = useTransform(bgBlur, (b) => `blur(${b}px)`);

  return (
    <div className="bg-white -z-10">
      <div className="h-screen md:h-[120vh] relative">
        <div className="sticky top-0 h-[90vh] md:min-h-screen overflow-hidden perspective-[1000px]">
          <motion.div
            style={{
              scale: bgScale,
              y: bgY,
              filter: blurValue,
              backgroundImage: `url(${Background})`,
              backgroundSize: "cover",
            }}
            className="absolute inset-0 flex items-center justify-center bg-cover bg-center will-change-transform"
          ></motion.div>
          <motion.div className="absolute inset-0 mt-24">
            {data?.closeOrders === "close" && (
              <div className="marquee-container py-2 bg-secondary md:mt-4 z-60">
                <div className="marquee text-white text-[23px]">
                  Sorry we have closed. Cannot place orders at this time Thank
                  you!
                </div>
              </div>
            )}
          </motion.div>
          <motion.div
            style={{
              scale: midScale,
              y: midY,
            }}
            className="absolute inset-0 flex items-center justify-center will-change-transform -mt-52"
          >
            <div className="w-[90%] md:w-[65%] md:h-[60%] flex flex-col items-center justify-center">
              <h2
                className="font-semibold leading-tight text-center
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Order your
                <span className="text-primary italic ms-4">
                  Favourite Foods{" "}
                </span>
                at Lebene Beans
              </h2>

              <p
                className="text-secondary mt-2
              text-base sm:text-lg md:text-xl"
              >
                From the comfort of your home.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="">
        <Menu />
      </div>
    </div>
  );
};
