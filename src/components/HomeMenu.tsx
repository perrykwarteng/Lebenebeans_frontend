import { Link } from "react-router-dom";
import { MenuItem } from "../features/Menu/components/MenuItem";
import { Button } from "./ui/Button";
import { motion } from "framer-motion";
import { menuData } from "../data/menuData";

export const HomeMenu = () => {
  const data = menuData;
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -30 }}
      transition={{ duration: 0.8 }}
    >
      <div className="px-8 md:px-16">
        <div className="flex items-center justify-between">
          <div className="">
            <h2 className="text-secondary text-[25px] md:text-[30px] font-medium">
              Our Menus
            </h2>
          </div>
          <div className="">
            <Link to="/menu">
              <Button text="View More" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {data
            .map((item) => (
              <MenuItem
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                id={item.id}
                addCart={function (id: number): void {
                  id;
                }}
              />
            ))
            .slice(0, 6)}
        </div>
      </div>
    </motion.div>
  );
};
