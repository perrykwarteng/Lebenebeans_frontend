import HeroImg from "../assets/images/hero.png";
import { CgMenuBoxed } from "react-icons/cg";
import { Button } from "./ui/Button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="h-full px-8 md:px-16 md:pt-7 flex flex-col md:flex-row md:items-center">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mt-14 md:12">
            <h2 className="text-[39px] md:text-[55px]  font-semibold leading-12 md:leading-16">
              Order your<span className="text-primary"> Favourite Foods </span>
              at Lebene Beans
            </h2>
            <p className="text-gray-500 text-[20px]">
              from the comfort of your homes.
            </p>

            <div className=" flex flex-col gap-y-2 md:gap-x-2 mt-5 md:flex-row md:items-center ">
              <div
                className="flex items-center gap-x-2 bg-secondary text-white px-5 py-2 text-[19px] text-center rounded-xl w-45"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.querySelector("#menu");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <CgMenuBoxed className="mt-1 md:mt-0" />
                <Button
                  text="Check Menu"
                  type="Submit"
                  Stlye="bg-transparent"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center items-center"
          initial={{ opacity: 1, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img className="w-125 mt-4 md:mt-6" src={HeroImg} alt="Hero Image" />
        </motion.div>
      </div>
    </div>
  );
};
