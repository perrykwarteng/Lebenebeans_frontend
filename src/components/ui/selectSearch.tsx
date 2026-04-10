import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import type { selectInputType } from "../../features/types/selectInputType";

export const SelectSearch = ({
  handleSelect,
  options,
  label,
  value,
  borderColor,
  isSearch = true,
}: selectInputType) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  const handleOpenOption = () => {
    setOpenOptions((prev) => !prev);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col relative items-center justify-between gap-x-2 bg-white rounded-xl p-3 cursor-pointer border ${
        borderColor ? borderColor : "border-primary"
      }`}
      onClick={handleOpenOption}
    >
      <div className="w-full flex justify-between items-center">
        <p className="text-[18px] font-medium text-green-950">
          {value || label}
        </p>

        <div className="flex justify-end">
          {openOptions ? (
            <FaAngleUp className="text-secondary text-[15px]" />
          ) : (
            <FaAngleDown className="text-secondary text-[15px]" />
          )}
        </div>
      </div>

      {openOptions && (
        <div
          className="w-full absolute bg-white rounded-lg shadow-md left-0 top-14 max-h-80 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {isSearch && (
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search locations..."
              className="w-full border border-gray-300 px-2 py-2 rounded-lg outline-none"
            />
          )}

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <p
                key={option}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                  setOpenOptions(false);
                  setSearchTerm("");
                }}
                className="hover:bg-gray-100 px-3 py-1 my-1 text-[17px]"
              >
                {option}
              </p>
            ))
          ) : (
            <p className="px-3 py-2 text-gray-400 text-sm">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};
