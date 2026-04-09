import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  removeItem: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
};

export const CartItem = ({
  id,
  name,
  price,
  quantity,
  removeItem,
  decreaseQty,
  increaseQty,
}: CartItem) => {
  return (
    <div className="border-2 border-gray-200 pt-4 flex flex-row items-center justify-between gap-4 my-3 p-4 rounded-2xl w-full transition-shadow bg-white">
      <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-2/3">
        <div className="flex-1 flex flex-col justify-center">
          <h4 className="text-[18px] md:text-lg text-secondary font-semibold line-clamp-2">
            {name}
          </h4>
          <p className="mt-2 text-[18px] text-yellow-500 font-medium">
            GHS {price}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 md:gap-4">
        <div className="flex items-center gap-3">
          <IoIosRemoveCircle
            className="text-secondary text-2xl hover:text-primary transition-colors cursor-pointer"
            onClick={() => {
              decreaseQty(id);
            }}
          />
          <span className="text-lg font-medium">{quantity}</span>
          <IoIosAddCircle
            className="text-secondary text-2xl hover:text-primary transition-colors cursor-pointer"
            onClick={() => increaseQty(id)}
          />
        </div>

        <div
          className="flex items-center gap-2 text-red-400 hover:text-red-600 cursor-pointer transition-colors"
          onClick={() => removeItem(id)}
        >
          <MdOutlineDeleteForever className="text-2xl" />
          <span className="text-sm font-medium">Remove</span>
        </div>
      </div>
    </div>
  );
};
