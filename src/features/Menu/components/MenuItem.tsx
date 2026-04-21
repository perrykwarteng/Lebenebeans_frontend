import { MdAddShoppingCart } from "react-icons/md";
import { Button } from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { menuData } from "../../../data/menuData";
import { useCartStore } from "../../../store/useCartStore";

type MenuItemType = {
  name: string;
  price: number;
  image?: string;
  id: number;
  isAddProject?: boolean;
  lockButton?: boolean | null;
  addToCart: (id: number) => void;
};
export const MenuItem = ({
  name,
  price,
  image,
  id,
  isAddProject,
  addToCart,
  lockButton,
}: MenuItemType) => {
  const { addCart } = useCartStore();
  const navigate = useNavigate();

  const handleClick = () => {
    const product = menuData.find((p) => p.id === Number(id));

    if (!product) return;

    if (!lockButton) {
      addCart(product);
      navigate(`/cart/${id}`);
    }
  };
  return (
    <div className="bg-white border border-secondary/15 p-4 flex flex-col gap-4 rounded-2xl md:w-72 transition-all duration-300">
      <div className="rounded-xl w-full h-44 overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={image}
          alt="Food Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h2 className="font-semibold text-gray-800 text-[17px] line-clamp-2">
          {name}
        </h2>

        <div className="flex items-center justify-between">
          <p className="font-semibold text-[16px] text-primary mt-2">
            GHS {price.toFixed(2)}
          </p>

          <div>
            {isAddProject ? (
              <div
                onClick={() => {
                  addToCart(id);
                }}
                className="flex items-center gap-x-1.5 bg-secondary rounded-xl px-3.5 py-2 mt-3 w-max text-white text-[18px]"
              >
                <MdAddShoppingCart className=" text-white " />
                <Button
                  text="Add item"
                  Stlye="bg-secondary text-white text-center rounded-xl"
                />
              </div>
            ) : (
              <div className="">
                <div
                  className="flex items-center gap-x-1.5 bg-secondary rounded-xl px-3 py-2 mt-3 text-white text-[17px] relative"
                  onClick={handleClick}
                >
                  <MdAddShoppingCart className="text-[18px] text-white " />
                  <Button text="Order Here" Stlye="bg-transparent text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
