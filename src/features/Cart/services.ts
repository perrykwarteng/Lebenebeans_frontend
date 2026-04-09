import { api } from "../../lib/axios";

export type CartType = {
  foodName: string;
  quantity: number;
  unitPrice: number;
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
  const res = await api.post(`/api/orders/orders`, formData);
  const authorization_url = res.data.data.data.authorization_url;
  window.location.href = authorization_url;
};
