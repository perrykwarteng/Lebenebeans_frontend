import { MdOutlineDeleteForever } from "react-icons/md";
import type { CartItem } from "../../Cart/components/CartItem";
import { useCartStore } from "../../../store/useCartStore";
import { formatCurrency } from "../../../utils/currencyDecimal";

export const BulkItem = ({ id, name, price, quantity }: CartItem) => {
  const { removeCart, changeQty } = useCartStore();

  return (
    <div className="p-3 flex flex-col md:flex-row md:items-center justify-between gap-4 my-3 bg-white rounded-lg w-full">
      <h4 className="text-base md:text-lg text-secondary font-semibold line-clamp-2 flex-1">
        {name}
      </h4>

      <div className="flex items-center gap-4 flex-1">
        <div className="w-full md:w-24 flex-1">
          <input
            className="w-20 py-2 border-2 text-center border-secondary rounded-md"
            name="quantity"
            type="number"
            value={quantity}
            onChange={(e) => {
              const value = Math.max(1, Number(e.target.value) || 1);
              changeQty(id, value);
            }}
          />
        </div>
        <div className="flex items-center gap-x-3">
          <div className="text-left min-w-20">
            <p className="font-medium">{formatCurrency(quantity * price)}</p>
          </div>
          <div
            className="flex items-center gap-1 text-red-500 cursor-pointer hover:text-red-600 transition-colors"
            onClick={() => removeCart!(id)}
          >
            <MdOutlineDeleteForever className="text-xl md:text-2xl" />
            <span className="hidden md:inline text-sm font-medium">Remove</span>
          </div>
        </div>
      </div>
    </div>
  );
};
