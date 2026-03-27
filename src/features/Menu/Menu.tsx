import { useEffect, useState } from "react";
import { menuData } from "../../data/menuData";
import { MenuFilterSearch } from "../Menu/components/MenuFilterSearch";
import { MenuItem } from "../Menu/components/MenuItem";
import type { Cart } from "../../store/useCartStore";
import { motion } from "framer-motion";

export const Menu = () => {
  const data = menuData;

  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");
  const [searchData, setSearchData] = useState<Cart[]>([]);

  useEffect(() => {
    let filtered = data;

    if (searchText.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (filterText.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase()),
      );
    }

    setSearchData(filtered);
  }, [searchText, filterText, data]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: -50 }}
        transition={{ duration: 0.8 }}
        className="px-8 md:px-16 py-16 bg-bg1"
        id="menu"
      >
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[40px] text-center font-medium">
            Explore Our Menu
          </h2>
          <div className="w-15 h-1 bg-primary"></div>
          <MenuFilterSearch
            menuSearchValue={searchText}
            selectValue={filterText}
            handelMenuSearch={(e) => {
              setSearchText(e.target.value);
            }}
            handleSelectValue={setFilterText}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(searchData.length > 0 ? searchData : data).map((item) => (
            <MenuItem
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              id={item.id}
              addCart={() => {}}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};
