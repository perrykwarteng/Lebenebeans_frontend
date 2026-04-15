import { api } from "../../lib/axios";
import { AxiosError } from "axios";

type ApiError = {
  message: string;
  code?: string;
  status?: number;
};

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
  promoId?: number;
}

export const createOrder = async (formData: OrderInfo) => {
  const res = await api.post(`/api/orders/orders`, formData);
  const authorization_url = res.data.data.data.authorization_url;
  window.location.href = authorization_url;
};

export const getPromotion = async (code: string, type: string) => {
  try {
    const res = await api.get(`/api/promotion?code=${code}&type=${type}`);
    return res;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return error.response;
  }
};
