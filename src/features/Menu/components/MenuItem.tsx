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
  addCart: (id: number) => void;
};
export const MenuItem = ({
  name,
  description,
  price,
  image,
  id,
  isAddProject,
  addCart,
}: MenuItemType) => {
  return (
    <div className="bg-white border-2 border-dashed border-primary p-5 flex flex-col md:flex-row items-center gap-4 rounded-2xl">
      <div className="md:w-2/4 w-full order-2 md:order-1">
        <h2 className="font-semibold text-secondary text-[22px] my-1">
          {name}
        </h2>
        <p className="text-gray-600 truncate">{description}</p>
        <p className="font-medium text-secondary text-[19px] my-1">
          Ghs {price.toFixed(2)}
        </p>

        <div>
          {isAddProject ? (
            <div
              onClick={() => {
                addCart(id);
              }}
              className="flex items-center gap-x-1.5 bg-secondary hover:bg-primary rounded-full px-4 py-2 mt-3 w-max text-white hover:text-secondary"
            >
              <MdAddShoppingCart className="text-[18px] text-white " />
              <Button text="Order Here" Stlye="bg-transparent text-white" />
            </div>
          ) : (
            <Link
              to={`/cart/${id}`}
              className="flex items-center gap-x-1.5 bg-secondary hover:bg-primary rounded-full px-4 py-2 mt-3 w-max text-white hover:text-secondary"
            >
              <MdAddShoppingCart className="text-[18px] text-white " />
              <Button text="Order Here" Stlye="bg-transparent text-white" />
            </Link>
          )}
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
