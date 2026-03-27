import HeroImg from "../assets/images/hero.png";
import { Button } from "./ui/Button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="h-full bg-white py-20">
      <div className="px-8 md:px-16 md:pt-7 flex flex-col md:flex-row md:items-center">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="">
            <p className="text-gray-600 text-[20px] italic mt-2.5">
              Welcome to Lebenebeans
            </p>
            <h2 className="text-[45px] md:text-[55px] mt-4 font-semibold leading-12 md:leading-16">
              Taste the Flavor of <br />
              <span className="text-primary"> Home Fresh </span>& <br /> Hot
              Meal
            </h2>
            <p className="text-gray-500 mt-5">
              Deliciously prepared meals made with love, rich spices, and the
              finest ingredients bringing you the true taste of African cuisine
              in every bite. Order your favourite foods from the comfort of your
              homes with a very fast and quality delivery service
            </p>

            <div className=" flex flex-col gap-y-2 md:gap-x-2 mt-5 md:flex-row md:items-center ">
              <div
                className="action"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.querySelector("#menu");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Button text="Check Menu" type="Submit" />
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
          <img className="w-125 mt-4 md:mt-0" src={HeroImg} alt="Hero Image" />
        </motion.div>
      </div>
    </div>
  );
};
