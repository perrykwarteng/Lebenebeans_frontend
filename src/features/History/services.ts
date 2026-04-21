import type { AxiosError } from "axios";
import { api } from "../../lib/axios";
import type { ApiError } from "../Cart/services";

export const getOrderHistory = async (phone: string) => {
  try {
    const res = await api.get(`/api/guest/guestHistory?phone=${phone}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return error.response;
  }
};

export const getGuest = async (phone: string) => {
  try {
    const res = await api.get(`/api/guest/guest?phone=${phone}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return error.response;
  }
};
