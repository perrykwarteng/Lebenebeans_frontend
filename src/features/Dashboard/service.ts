import { api } from "../../lib/axios";
import type { CloseType, LocationType, Order, statCardType } from "./type";

// Orders
export const getPendingOrder = async (): Promise<Order[]> => {
  const res = await api.get(`/api/orders/pendingOrders`);
  return res.data.data;
};

export const getDeliveredOrder = async (): Promise<Order[]> => {
  const res = await api.get(`/api/orders/deliveredOrders`);
  return res.data.data;
};

export const cancelOrder = async (id: number) => {
  const res = await api.get(`/api/orders/orderCancle/${id}`);
  return res.data;
};
export const MarkOrderDelivered = async (id: number) => {
  const res = await api.get(`/api/orders/orderDelivered/${id}`);
  return res.data;
};

// Location
export const getLocations = async () => {
  const res = await api.get(`/api/locations/location`);
  return res.data.data;
};

export const deleteLocations = async (id: number) => {
  const res = await api.delete(`/api/locations/location/${id}`);
  return res.data.data;
};

export const createLocations = async (
  data: LocationType,
): Promise<LocationType> => {
  const res = await api.post(`/api/locations/location`, data);

  return res.data.data;
};
export const updateLocations = async (
  data: LocationType,
  id: number,
): Promise<LocationType> => {
  const res = await api.put(`/api/locations/location/${id}`, data);
  return res.data.data;
};

// OrderCloseStatus
export const getCloseStatus = async () => {
  const res = await api.get(`/api/orders/closeOrder`);
  return res.data.data;
};

export const changeCloseOrders = async ({
  id,
  close,
}: {
  id: number;
  close: string;
}): Promise<CloseType> => {
  const res = await api.patch(`/api/orders/changeOrderStatus/${id}`, { close });

  return res.data.data;
};

export const getStatCard = async (
  startDate?: Date,
  endDate?: Date,
): Promise<statCardType> => {
  const params: Record<string, string> = {};

  if (startDate) params.from = startDate.toISOString();
  if (endDate) params.to = endDate.toISOString();

  const res = await api.get(`/api/statistics/statistics`, {
    params,
  });

  return res.data;
};
