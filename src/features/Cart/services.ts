import axios from "axios";

export type CartType = {
  foodName: string;
  quantity: number;
  price: number;
};

export interface OrderInfo {
  order: CartType[];
  name: string;
  number: string;
  deliveryType: string;
  location: string;
  note: string;
  deliveryFee: number;
  foodCost: number;
  totalPrice: number;
}

export const createOrder = async (formData: OrderInfo) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/orders/orders`,
    formData,
  );
  const authorization_url = res.data.data.data.authorization_url;
  window.location.href = authorization_url;
};
