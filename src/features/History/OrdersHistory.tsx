import { MainLayout } from "../../components/layouts/MainLayout";
import { useGuestStore } from "../../store/useGuestUser";
import { useQuery } from "@tanstack/react-query";
import { getOrderHistory } from "./services";
import type { Order } from "../Dashboard/type";
import { formatDate } from "../../utils/formatDateTime";
import { FullPageLoader } from "../../components/ui/fullPageLoader";
import { formatCurrency } from "../../utils/currencyDecimal";
import Empty from "../../assets/images/emptyState.svg";

export default function OrderHistory() {
  const { guest } = useGuestStore();

  const { data, isLoading } = useQuery({
    queryKey: ["OrderHistory", guest.phone],
    queryFn: () => getOrderHistory(guest.phone),
    enabled: !!guest.phone,
  });

  const ordHistory: Order[] = data?.ordersArray ?? [];

  return (
    <MainLayout>
      <div className="min-h-screen px-4 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="mb-8 mt-10 md:mt-0">
          <div className="flex flex-col items-center justify-center mt-2">
            <h2 className="text-[30px] font-medium">History</h2>
            <div className="w-15 h-1 bg-primary"></div>
          </div>
        </div>

        {isLoading && <FullPageLoader />}

        {ordHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-8">
            <img className="w-24 opacity-70" src={Empty} alt="Empty" />
            <p>No Orders Made Yet</p>
          </div>
        )}

        {!isLoading && ordHistory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ordHistory.map((order: Order) => {
              const VISIBLE = 2;
              const visibleItems = order.orderItems.slice(0, VISIBLE);
              const extraCount = order.orderItems.length - VISIBLE;

              return (
                <div className="" key={order.orders.id}>
                  <div className="border border-primary rounded-xl p-4 transition cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-secondary text-[17px]">
                        OrderID:
                        <span className="ms-1 text-sm text-gray-500">
                          #{order.orders.orderId}
                        </span>
                      </p>
                      <p className="text-sm font-medium text-secondary mt-0.5">
                        {formatDate(order.orders.createdAt)}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-x-4">
                      <p className="font-medium text-secondary text-[16px]">
                        Delvery Type:
                        <span className="ms-1 text-gray-500">
                          {order.orders.deliveryType}
                        </span>
                      </p>
                      <p className="font-medium text-secondary text-[16px]">
                        Delvery Fee:
                        <span className="ms-1 text-gray-500">
                          {formatCurrency(order.orders.deliveryFee)}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-x-4">
                      <p className="font-medium text-secondary text-[16px]">
                        Location:
                        <span className="ms-1 text-gray-500">
                          {order.orders.location === ""
                            ? "No Location"
                            : order.orders.location}
                        </span>
                      </p>
                      <p className="font-medium text-secondary text-[16px]">
                        Food Price:
                        <span className="ms-1 text-gray-500">
                          {formatCurrency(Number(order.orders.priceOfFood))}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-secondary text-[16px]">
                        Note:
                        <span className="ms-1 text-gray-500">
                          {order.orders.note === ""
                            ? "No Note Provided"
                            : order.orders.note}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 my-3">
                      {visibleItems.map((item, i) => (
                        <span
                          key={i}
                          className="ms-1 text-[14px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                        >
                          {item.foodName} ×{item.quantity}
                        </span>
                      ))}
                      {extraCount > 0 && (
                        <span className="text-xs text-gray-400 px-1 py-1">
                          +{extraCount} more
                        </span>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-2.5 flex justify-between items-center">
                      {order.orders.orderPaid ? (
                        <p className="bg-green-600 text-white text-[14px] p-1 px-6 rounded-full">
                          Paid
                        </p>
                      ) : (
                        <p className="bg-red-600 text-white text-[14px] p-1 px-4 rounded-full">
                          Not Paid
                        </p>
                      )}
                      <span className="text-primary font-medium">
                        Total: {formatCurrency(order.orders.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
