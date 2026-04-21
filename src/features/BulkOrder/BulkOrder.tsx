import { MainLayout } from "../../components/layouts/MainLayout";
import { useCartStore } from "../../store/useCartStore";
import { BulkItem } from "./components/BulkItem";
import Empty from "../../assets/images/emptyState.svg";
import { TbShoppingBagPlus } from "react-icons/tb";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Button } from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { Modal } from "../../components/ui/modal";
import { menuData } from "../../data/menuData";
import { MenuItem } from "../Menu/components/MenuItem";
import { safeParse } from "../../utils/saveParse";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLocations } from "../Dashboard/service";
import type { LocationType } from "../Dashboard/type";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/currencyDecimal";
import { createOrder, type CartType, type OrderInfo } from "../Cart/services";
import { SelectSearch } from "../../components/ui/selectSearch";
import { InputField } from "../../components/ui/Input";
import { toast } from "sonner";

export const BulkOrder = () => {
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const { item, addCart } = useCartStore();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const path = useLocation();
  const nav = useNavigate();
  const [filterText, setFilterText] = useState("All");
  const [filtered, setFiltered] = useState(menuData);
  const filterOptions = ["All", "Beans", "Rice", "Banku", "Extra"];

  const getPromo = safeParse(localStorage.getItem("promo"));
  const promo = getPromo?.state?.promo;
  const closeOrder = safeParse(localStorage.getItem("closeStatus"));

  const { data } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  const locationArr = (data ?? []).map((loc: LocationType) => loc.name);

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

  const handelAddCartModal = async (id: number) => {
    const product = menuData.find((p) => p.id === Number(id));
    if (product) addCart(product);
    setOpen(false);
  };

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

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Bulk Order Created Successfully");
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
    clearPromo();

    if (isSuccess) {
      clearCart();
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen px-4 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center mb-6 mt-10 md:mt-0">
          <h2 className="text-2xl md:text-3xl font-medium">Bulk Order</h2>
          <div className="w-16 h-1 bg-primary mt-1"></div>
        </div>

        <div className="flex flex-col items-center justify-center bg-bg1 p-4 md:p-6 rounded-2xl">
          {item.length <= 0 ? (
            <div className="">
              <img className="w-24 opacity-70" src={Empty} alt="Empty" />
              <div
                className="mt-5 flex gap-x-3 items-center justify-center bg-primary hover:bg-secondary hover:text-white px-5 py-2 text-center rounded-xl text-secondary"
                onClick={() => setOpen(true)}
              >
                <TbShoppingBagPlus />
                <Button text="Add Food" Stlye="bg-transparent" />
              </div>
            </div>
          ) : (
            <div className="w-full md:w-170">
              {item.map((item) => (
                <BulkItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                />
              ))}

              <div className="w-full flex flex-col md:flex-row gap-x-4 gap-y-4 md:gap-y-0 items-center justify-center">
                <div
                  className=" w-full md:w-60 flex gap-x-3 items-center justify-center bg-primary px-5 py-2 text-center rounded-xl text-secondary"
                  onClick={() => setOpen(true)}
                >
                  <TbShoppingBagPlus />
                  <Button text="Add Food or Extras" Stlye="bg-transparent" />
                </div>

                <div
                  className=" w-full md:w-60 flex gap-x-3 items-center justify-center bg-secondary text-white px-5 py-2 text-center rounded-xl"
                  onClick={() => {
                    const totalQty = orderItem.reduce(
                      (sum, i) => sum + i.quantity,
                      0,
                    );

                    if (totalQty < 10) {
                      return toast.warning(
                        "Sorry, bulk order must be 10 or more items",
                      );
                    }
                    setOpenDetails(true);
                  }}
                >
                  <RiShoppingBag4Line />
                  <Button text="Check Out" Stlye="bg-transparent" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Enter Order Info"
        isOpen={openDetails}
        onClose={() => {
          setOpenDetails(!openDetails);
        }}
        size="md"
      >
        <div className="w-full">
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
            <p className="mb-1 text-secondary md:text-[16px]">Delivery Type</p>
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
        </div>

        <div className="border border-gray-200 my-2"></div>
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

        <div className="mt-4 flex items-center justify-center">
          <Button
            isDisabled={isPending}
            text={`${isPending ? "Creating Order..." : "Proceed To Checkout"}`}
            type="submit"
            action={handleSubmit}
          />
        </div>
      </Modal>

      <Modal
        title="Add Food or Extras"
        isOpen={open}
        onClose={() => {
          setOpen(!open);
        }}
        size="lg"
      >
        <div className="py-4 flex items-center justify-center flex-wrap gap-x-3 md:gap-x-5 gap-y-2 my-3">
          {filterOptions.map((item) => (
            <div
              key={item}
              className={` p-1.5 px-3.5 md:p-2 md:px-5 rounded-lg cursor-pointer ${filterText === item ? "bg-primary text-secondary font-medium" : "bg-gray-300 text-secondary hover:bg-gray-200"}`}
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
  );
};
function clearCart() {
  throw new Error("Function not implemented.");
}

function clearPromo() {
  throw new Error("Function not implemented.");
}
