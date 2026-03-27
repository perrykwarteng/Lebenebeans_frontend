import { CiSearch } from "react-icons/ci";
import { Select } from "../../../components/ui/Select";
import { selectOptions } from "../../../data/selectOptions";

type menuFilterType = {
  menuSearchValue: string;
  selectValue: string;
  handelMenuSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectValue: (selectOptions: string) => void;
};

export const MenuFilterSearch = ({
  menuSearchValue,
  handelMenuSearch,
  selectValue,
  handleSelectValue,
}: menuFilterType) => {
  return (
    <div className="my-10 bg-white w-full p-4 flex flex-col gap-y-3 md:flex-row items-center gap-x-5">
      <div className="w-full md:w-1/1">
        <div className="flex items-center border border-primary">
          <CiSearch className="absolute ml-2" />
          <input
            type="text"
            name=""
            placeholder="Search for meals…"
            value={menuSearchValue}
            onChange={handelMenuSearch}
            className="bg-transparent outline-none px-7 py-3 w-full"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <Select
          value={selectValue}
          label="Filter Menu"
          handleSelect={handleSelectValue}
          options={selectOptions}
        />
      </div>
    </div>
  );
};
