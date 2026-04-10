import { useEffect, useState } from "react";
import { menuData } from "../../data/menuData";
import { MenuFilterSearch } from "../Menu/components/MenuFilterSearch";
import { MenuItem } from "../Menu/components/MenuItem";
import type { Cart } from "../../store/useCartStore";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getCloseStatus } from "../Dashboard/service";
import type { CloseType } from "../Dashboard/type";

export const Menu = () => {
  const { data, refetch } = useQuery<CloseType>({
    queryKey: ["closeStatus"],
    queryFn: getCloseStatus,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");
  const [searchData, setSearchData] = useState<Cart[]>([]);

  useEffect(() => {
    let filtered = menuData.filter(
      (item) => !item.name?.toLowerCase().includes("extra"),
    );

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
          <h2 className="text-[35px] lg:text-[40px] text-center font-medium">
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
          {(searchData.length > 0 ? searchData : menuData).map((item) => (
            <MenuItem
              key={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              id={item.id}
              lockButton={
                data?.closeOrders === "open"
                  ? false
                  : data?.closeOrders === "close"
                    ? true
                    : null
              }
              addCart={() => {}}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};
