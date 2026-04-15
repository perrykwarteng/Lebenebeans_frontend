export interface OrderItem {
  id: number;
  orderIdFk: number;
  foodName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderDetails {
  amount: number;
  completed: number;
  createdAt: string;
  date: number;
  deliveryFee: number;
  deliveryType: string;
  id: number;
  location: string;
  promotion: string | null;
  name: string;
  note: string;
  orderId: string;
  orderPaid: number;
  phoneNumber: string;
  priceOfFood: string;
  updatedAt: string;
}

export interface Order {
  orders: OrderDetails;
  orderItems: OrderItem[];
}

export interface LocationType {
  id?: number;
  name: string;
  price: number;
}
export interface CloseType {
  id: number;
  closeOrders: string;
}

export interface statCardType {
  amountToKeep: number;
  amountToPay: number;
  from: Date;
  to: Date;
  totalOrders: number;
  totalRevenue: number;
}
