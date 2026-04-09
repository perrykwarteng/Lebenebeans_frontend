import type { loginType } from "./Login";
import { api } from "../../lib/axios";

export const login = async (data: loginType) => {
  const res = await api.post(`/api/auth/login`, data);

  if (res.data) {
    const details = await api.get(`/api/auth/me`);

    return details;
  }
};

export const logout = async () => {
  const res = await api.post(`/api/auth/logout`);
  return res;
};

export const verify = async (ref: string) => {
  const res = await api.get(`/api/orders/verify/${ref}`);
  return res.data.data || null;
};
