import { MainLayout } from "../../components/layouts/MainLayout";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Button } from "../../components/ui/Button";
import { CartItem } from "./components/CartItem";
import { Modal } from "../../components/ui/modal";
import { menuData } from "../../data/menuData";
import { MenuItem } from "../Menu/components/MenuItem";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Select } from "../../components/ui/Select";
import { InputField } from "../../components/ui/Input";
import { useCartStore } from "../../store/useCartStore";
import { createOrder, type CartType, type OrderInfo } from "./services";
import { toast } from "sonner";
import { Location } from "../../data/LocationData";
import { useMutation } from "@tanstack/react-query";

export const Cart = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const data = menuData;
  const effectRan = useRef(false);
  const { item, addCart, removeCart, increaseQty, decreaseQty } =
    useCartStore();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const locObj = Location.find((loc) => loc.name === location);
  const deliveryFee = locObj ? locObj.price : 0;

  const locationArr = Location.map((loc) => loc.name);

  const totalFoodPrice = item.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  const totalPrice = totalFoodPrice + deliveryFee;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    if (effectRan.current) return;
    const product = data.find((p) => p.id === Number(id));
    if (product) addCart(product);
    effectRan.current = true;
  }, [id]);

  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Created Order Successfully");
    },
    onError: () => {
      toast.error("Failed Creating Order");
    },
  });

  const handleSubmit = () => {
    if (
      !name ||
      !number ||
      !item ||
      !location ||
      !deliveryType ||
      !deliveryFee ||
      !totalFoodPrice ||
      !totalPrice
    ) {
      return toast.warning("Fill all required fields before submiting");
    }

    const orderItem: CartType[] = item.map((i) => ({
      foodName: i.name,
      quantity: i.quantity,
      price: i.price,
    }));

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
    };

    mutate(data);
  };

  const handelAddCartModal = async (id: number) => {
    const product = data.find((p) => p.id === Number(id));
    if (product) addCart(product);
    setOpen(false);
  };

  return (
    <>
      <MainLayout>
        <div className="px-8 md:px-16 py-24 bg-bg1">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[40px] font-medium">My Cart</h2>
            <div className="w-15 h-1 bg-primary"></div>
          </div>

          <div className="flex flex-col gap-y-5 md:flex-row md:gap-x-6 mt-10">
            <div className="border border-primary bg-white rounded-[5px] p-2 md:p-5 w-full md:w-3/5 max-h-140 overflow-y-scroll">
              <div className="">
                {item.length === 0 ? (
                  <div className="h-120 flex-col gap-y-3 flex items-center justify-center">
                    <p className="text-[20px] text-secondary">
                      No Item in Cart
                    </p>
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
              </div>
              <div
                className={`${item.length === 0 ? "hidden" : " mt-10 flex items-center justify-center"}`}
              >
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
                  maxLength={10}
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

              <div className="my-1.5">
                <p className="mb-1 text-secondary md:text-[16px]">Location</p>
                <Select
                  value={location}
                  options={locationArr}
                  label={"Select Location"}
                  handleSelect={setLocation}
                />
              </div>
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

              <div className="">
                <div className="flex items-center justify-between">
                  <p className="text-secondary md:text-[18px]">Delivery Fee:</p>
                  <p className="text-secondary md:text-[18px] font-semibold">
                    Ghc{deliveryFee.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-secondary md:text-[18px]">Food Cost:</p>
                  <p className="text-secondary md:text-[18px] font-semibold">
                    Ghc{totalFoodPrice.toFixed(2)}
                  </p>
                </div>
                <div className="border border-gray-200 my-2"></div>
                <div className="flex items-center justify-between">
                  <p className="text-secondary md:text-[18px]">Total Price:</p>
                  <p className="text-secondary md:text-[18px] font-semibold">
                    Ghc{totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <Button
                  isDisabled={isPending}
                  text={`${isPending ? "Creating Order" : "Proceed To Checkout"}`}
                  type="submit"
                  action={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>

        <Modal
          title="Add Menu"
          isOpen={open}
          onClose={() => {
            setOpen(!open);
          }}
          size="lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((item) => (
              <MenuItem
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                id={item.id}
                isAddProject
                addCart={() => {
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
