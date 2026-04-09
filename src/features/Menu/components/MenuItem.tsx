import { MdAddShoppingCart } from "react-icons/md";
import { Button } from "../../../components/ui/Button";
import { Link } from "react-router-dom";

type MenuItemType = {
  name: string;
  description: string;
  price: number;
  image: string;
  id: number;
  isAddProject?: boolean;
  lockButton?: boolean | null;
  addCart: (id: number) => void;
};
export const MenuItem = ({
  name,
  price,
  image,
  id,
  isAddProject,
  addCart,
  lockButton,
}: MenuItemType) => {
  return (
    <div className="bg-white border-2 border-dashed border-primary p-3.5 flex flex-col md:flex-row items-center gap-4 rounded-2xl">
      <div className="md:w-3/5 w-full order-2 md:order-1">
        <h2 className="font-semibold text-secondary text-[22px] my-1">
          {name}
        </h2>

        <div className="flex items-center justify-between md:flex-col md:items-start md:justify-start">
          <p className="font-medium text-yellow-500 text-[20px] my-1">
            Ghs {price.toFixed(2)}
          </p>
          <div>
            {isAddProject ? (
              <div
                onClick={() => {
                  addCart(id);
                }}
                className="flex items-center gap-x-1.5 bg-secondary rounded-xl px-4 py-2 mt-3 w-max text-white text-[18px]"
              >
                <MdAddShoppingCart className=" text-white " />
                <Button
                  text="Add item"
                  Stlye="bg-secondary text-white text-center rounded-xl"
                />
              </div>
            ) : (
              <div className="">
                <Link
                  to={
                    lockButton === false
                      ? `/cart/${id}`
                      : lockButton === true
                        ? ""
                        : ""
                  }
                  className="flex items-center gap-x-1.5 bg-secondary rounded-xl px-4 py-2 mt-3 text-white text-[18px] relative"
                >
                  <MdAddShoppingCart className="text-[18px] text-white " />
                  <Button text="Order Here" Stlye="bg-transparent text-white" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:w-2/4 w-full order-1 md:order-2">
        <img
          className="w-full h-auto rounded-2xl object-contain"
          src={image}
          alt="food image"
        />
      </div>
    </div>
  );
};
