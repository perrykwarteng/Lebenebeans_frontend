import { MainLayout } from "../../components/layouts/MainLayout";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Button } from "../../components/ui/Button";
import { CartItem } from "./components/CartItem";
import { Modal } from "../../components/ui/modal";
import { menuData } from "../../data/menuData";
import { MenuItem } from "../Menu/components/MenuItem";
import { useEffect, useState } from "react";
import { InputField } from "../../components/ui/Input";
import { useCartStore } from "../../store/useCartStore";
import { createOrder, type CartType, type OrderInfo } from "./services";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLocations } from "../Dashboard/service";
import type { LocationType } from "../Dashboard/type";
import { formatCurrency } from "../../utils/currencyDecimal";
import { SelectSearch } from "../../components/ui/selectSearch";
import { usePromoStore } from "../../store/usePromoStore";
import { useLocation, useNavigate } from "react-router-dom";
import { safeParse } from "../../utils/saveParse";

export const CartPage = () => {
  const [open, setOpen] = useState(false);
  const path = useLocation();
  const nav = useNavigate();
  const menuDatas = menuData;
  const { item, addCart, clearCart, removeCart, increaseQty, decreaseQty } =
    useCartStore();
  const { clearPromo } = usePromoStore();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const getPromo = safeParse(localStorage.getItem("promo"));
  const promo = getPromo?.state?.promo;
  const closeOrder = safeParse(localStorage.getItem("closeStatus"));

  const { data } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  const locationArr = data?.map((loc: LocationType) => loc.name);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    const isCartPage = path.pathname.includes("/cart");
    if (closeOrder === "close" && isCartPage) {
      nav("/");
    }
  }, [closeOrder, path.pathname, closeOrder]);

  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Created Order Successfully");
    },
    onError: () => {
      toast.error("Failed Creating Order");
    },
  });

  const orderItem: CartType[] = item.map((i) => ({
    foodName: i.name,
    quantity: i.quantity,
    unitPrice: i.price,
  }));

  const deliveryFee: number =
    deliveryType === "Pick Up"
      ? 0
      : promo?.isActive &&
          (orderItem.length >= promo.minOrder ||
            (orderItem[0]?.quantity >= promo.minOrder &&
              promo.type === "FREE_DELIVERY"))
        ? 0
        : (data?.find((loc: LocationType) => loc.name === location)?.price ??
          0);

  const discount = promo?.orderDiscount ? promo.orderDiscount / 100 : 0;

  const baseTotal = item.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  const isValidDiscount =
    promo?.isActive &&
    promo?.type === "DISCOUNT" &&
    (orderItem?.[0]?.quantity >= promo?.minOrder ||
      orderItem.length >= promo.minOrder);

  const totalFoodPrice = isValidDiscount
    ? baseTotal - baseTotal * discount
    : baseTotal;

  const totalPrice = Number(totalFoodPrice) + Number(deliveryFee);

  const handleSubmit = () => {
    if (
      !name ||
      !number ||
      !item ||
      !deliveryType ||
      !totalFoodPrice ||
      !totalPrice
    ) {
      return toast.warning("Fill all required fields before submiting");
    }

    const data: OrderInfo = {
      order: orderItem,
      name: name,
      number: number,
      deliveryType: deliveryType,
      location: location,
      note: note,
      deliveryFee: deliveryFee,
      foodCost: totalFoodPrice,
      totalPrice: totalPrice,
      promoId: getPromo.state.promo.id,
    };
    mutate(data);

    setName("");
    setNote("");
    setNumber("");
    setDeliveryType("");
    setLocation("");
    clearCart();
    clearPromo();
  };

  const handelAddCartModal = async (id: number) => {
    const product = menuDatas.find((p) => p.id === Number(id));
    if (product) addCart(product);
    setOpen(false);
  };

  const [filterText, setFilterText] = useState("All");
  const [filtered, setFiltered] = useState(menuData);
  const filterOptions = ["All", "Beans", "Rice", "Banku", "Extra"];

  useEffect(() => {
    if (!filterText || filterText === "All") {
      setFiltered(menuData);
    } else {
      setFiltered(
        menuData.filter((item) =>
          item.name.toLowerCase().includes(filterText.toLowerCase()),
        ),
      );
    }
  }, [filterText]);

  return (
    <>
      <MainLayout>
        <div className="px-8 md:px-16 py-24 bg-bg1">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[30px] font-medium">My Cart</h2>
            <div className="w-15 h-1 bg-primary"></div>
          </div>

          <div className="flex flex-col gap-y-5 md:flex-row md:gap-x-6 mt-4">
            <div className="flex-2">
              {item.length === 0 ? (
                <div className="h-120 flex-col gap-y-3 flex items-center justify-center">
                  <p className="text-[20px] text-secondary">No Item in Cart</p>
                  <div
                    className="flex gap-x-3 items-center bg-primary hover:bg-secondary hover:text-white px-5 py-2 text-center rounded-xl text-secondary"
                    onClick={() => setOpen(true)}
                  >
                    <TbShoppingBagPlus />
                    <Button
                      text="Add Another Food or Extras"
                      Stlye="bg-transparent"
                    />
                  </div>
                </div>
              ) : (
                item.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-center"
                  >
                    <CartItem
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      quantity={product.quantity}
                      image={product.image}
                      removeItem={removeCart}
                      increaseQty={increaseQty}
                      decreaseQty={decreaseQty}
                    />
                  </div>
                ))
              )}
              <div
                className={`${item.length === 0 ? "hidden" : "flex items-center justify-center"}`}
              >
                <div
                  className="flex gap-x-3 items-center bg-primary px-5 py-2 text-center rounded-xl text-secondary"
                  onClick={() => setOpen(true)}
                >
                  <TbShoppingBagPlus />
                  <Button
                    text="Add Another Food or Extras"
                    Stlye="bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="border border-primary bg-white rounded-[5px] p-5 w-full md:w-2/5">
              <h2 className="text-primary text-[30px]">Order Info</h2>
              <div className="h-0.5 w-full bg-gray-300"></div>
              <div className="my-1.5">
                <InputField
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-1.5">
                <InputField
                  label="Phone Number (for Deliver)"
                  name="number"
                  type="number"
                  placeholder="enter your number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="my-1.5">
                <p className="mb-1 text-secondary md:text-[16px]">
                  Delivery Type
                </p>
                <div className="flex flex-col  gap-y-2 md:flex-row md:items-center md:gap-x-2 md:gap-y-0">
                  <InputField
                    type="radio"
                    name="deliveryType"
                    label="Dispatch Rider"
                    value="Dispatch Rider"
                    checked={deliveryType === "Dispatch Rider"}
                    onChange={(e) => setDeliveryType(e.target.value)}
                  />

                  <InputField
                    type="radio"
                    name="deliveryType"
                    label="Pick Up"
                    value="Pick Up"
                    checked={deliveryType === "Pick Up"}
                    onChange={(e) => setDeliveryType(e.target.value)}
                  />
                </div>
              </div>

              {deliveryType === "Dispatch Rider" && (
                <div className="my-1.5">
                  <p className="mb-1 text-secondary md:text-[16px]">Location</p>

                  <SelectSearch
                    value={location}
                    options={locationArr}
                    label={"Select Location"}
                    handleSelect={setLocation}
                  />
                </div>
              )}

              <div className="my-1.5">
                <label
                  htmlFor="location"
                  className="mb-1 text-secondary md:text-[16px]"
                >
                  Note (Optional)
                </label>
                <textarea
                  name="note"
                  id="note"
                  rows={5}
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  placeholder="Add any additional comments if any allergies. eg; if you want more pepper..."
                  className="bg-white w-full rounded-[10px] p-3 border border-primary"
                />
              </div>

              <div className="border border-gray-200 my-2"></div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-secondary md:text-[18px]">
                    Delivery Fee:
                    {promo?.isActive &&
                      promo.type === "FREE_DELIVERY" &&
                      (orderItem.length >= promo.minOrder ||
                        orderItem[0]?.quantity >= promo.minOrder) && (
                        <span className="text-green-500 text-sm font-medium block">
                          (Free delivery applied)
                        </span>
                      )}
                  </p>

                  <p className="text-secondary md:text-[18px] font-semibold">
                    {formatCurrency(deliveryFee)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-secondary md:text-[18px]">
                    Food Cost:
                    {isValidDiscount && (
                      <span className="ml-2 text-green-500 text-sm font-medium">
                        ({promo.orderDiscount}% OFF)
                      </span>
                    )}
                  </p>

                  <p className="text-secondary md:text-[18px] font-semibold">
                    {formatCurrency(totalFoodPrice)}
                  </p>
                </div>
                <div className="border border-gray-200 my-2"></div>
                <div className="flex items-center justify-between">
                  <p className="text-secondary md:text-[18px]">Total Price:</p>
                  <p className="text-secondary md:text-[18px] font-semibold">
                    {formatCurrency(totalPrice)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <Button
                  isDisabled={isPending}
                  text={`${isPending ? "Creating Order..." : "Proceed To Checkout"}`}
                  type="submit"
                  action={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>

        <Modal
          title="Add Food or Extras"
          isOpen={open}
          onClose={() => {
            setOpen(!open);
          }}
          size="lg"
        >
          <div className="py-4 flex items-center justify-center flex-wrap gap-x-3 gap-y-2">
            {filterOptions.map((item) => (
              <div
                className={` p-2 px-5 rounded-lg cursor-pointer ${filterText === item ? "bg-secondary text-white" : "bg-gray-300 text-secondary"}`}
                onClick={() => {
                  setFilterText(item);
                }}
              >
                {item === "Extra" ? "Extras" : item}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item) => (
              <MenuItem
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                id={item.id}
                isAddProject
                addToCart={() => {
                  handelAddCartModal(item.id);
                }}
              />
            ))}
          </div>
        </Modal>
      </MainLayout>
    </>
  );
};
