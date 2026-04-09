import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import type { selectInputType } from "../../features/types/selectInputType";

export const Select = ({
  handleSelect,
  options,
  label,
  value,
  borderColor,
}: selectInputType) => {
  const [openOptions, setOpenOptions] = useState(false);

  const handleOpenOption = () => {
    setOpenOptions(!openOptions);
  };

  return (
    <>
      <div
        className={`flex relative items-center justify-between gap-x-2 bg-white rounded-xl p-3 cursor-pointer border ${borderColor ? borderColor : " border-primary"}`}
        onClick={() => handleOpenOption()}
      >
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
        {openOptions && (
          <div className="w-full absolute bg-white rounded-lg shadow-md left-0 top-14 max-h-80 overflow-y-scroll transition-all duration-150">
            {options.map((option) => (
              <p
                key={option}
                onClick={() => {
                  handleSelect(option);
                  setOpenOptions(false);
                }}
                className="hover:bg-gray-100 px-3 py-0.5 my-1 text-[17px]"
              >
                {option}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
