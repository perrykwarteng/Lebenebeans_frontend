import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "../layout/DashboardLayout";
import { getDeliveredOrder } from "../service";
import type { Order } from "../type";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../../../utils/formatDateTime";
import { FullPageLoader } from "../../../components/ui/fullPageLoader";

export const Delivered = () => {
  const CHUNK_SIZE = 20;
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [index, setIndex] = useState(0);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data: fetchedOrders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["DeliveredOrder"],
    queryFn: getDeliveredOrder,
  });

  useEffect(() => {
    if (fetchedOrders.length > 0) loadMore();
  }, [fetchedOrders]);

  const loadMore = () => {
    const nextChunk = fetchedOrders.slice(index, index + CHUNK_SIZE);
    setAllOrders((prev) => [...prev, ...nextChunk]);
    setIndex((prev) => prev + CHUNK_SIZE);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && index < fetchedOrders.length) {
        loadMore();
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [index, fetchedOrders]);

  return (
    <DashboardLayout>
      <div>
        <div>
          <h1 className="text-[25px] text-secondary font-medium">
            Delivered Orders
          </h1>
          <p className="text-gray-400 -mt-1">
            List of all successfully delivered orders
          </p>
          <p className="text-gray-400 -mt-1">
            Delivered Orders: {fetchedOrders.length}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {isLoading ? (
            <p className="text-gray-400 text-center col-span-full">
              <FullPageLoader />
            </p>
          ) : fetchedOrders.length > 0 ? (
            allOrders.map((order) => {
              const o = order.orders;
              return (
                <div
                  key={o.id}
                  className="bg-white w-full p-6 rounded-xl shadow-md space-y-4 relative"
                >
                  <div className="flex items-center justify-center gap-x-6 text-[20px]">
                    <div className="flex gap-x-2">
                      <h3 className="font-medium text-secondary ">OrderId:</h3>
                      <p className="text-gray-500">#{o.orderId}</p>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-3">
                    <div className="">
                      <div className="flex gap-x-2">
                        <h3 className="font-medium text-secondary">
                          Customer:
                        </h3>
                        <p className="text-gray-500">{o.name}</p>
                      </div>
                      <div className="flex gap-x-2">
                        <h3 className="font-medium">Phone:</h3>
                        <p className="text-gray-500">{o.phoneNumber}</p>
                      </div>

                      <div className="flex gap-x-2">
                        <h3 className="font-medium">Delivery Type:</h3>
                        <p className="text-gray-500">
                          {o.deliveryType === "Dispatch Rider"
                            ? "Dispatch"
                            : o.deliveryType === "Pick Up"
                              ? "Pick Up"
                              : ""}
                        </p>
                      </div>
                      <div className="flex gap-x-2">
                        <h3 className="font-medium">Location:</h3>
                        <p className="text-gray-700 font-medium">
                          {o.location || "No Location"}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium">Note:</h3>
                        <p className="text-gray-500">{o.note || "No Note"}</p>
                      </div>
                    </div>

                    <div className="">
                      <div className="flex gap-x-2">
                        <h3 className="font-medium text-secondary">Date:</h3>
                        <p className="text-gray-500">
                          {formatDate(o.createdAt)}
                        </p>
                      </div>
                      <div className="flex gap-x-2">
                        <h3 className="font-medium">Delivery Fee:</h3>
                        <p className="text-gray-500">Ghc{o.deliveryFee}</p>
                      </div>
                      <div className="flex gap-x-2">
                        <h3 className="font-medium">Food Cost:</h3>
                        <p className="text-gray-500">Ghc{o.priceOfFood}</p>
                      </div>
                      <div className="flex gap-x-2">
                        <h3 className="font-medium">Total Cost:</h3>
                        <p className="text-gray-500">Ghc{o.amount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-2">Order Items:</h3>
                    <ul className="space-y-2">
                      {order.orderItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.foodName}</p>
                            <p className="text-gray-700 font-medium text-sm">
                              Qty: {item.quantity} × Ghc{item.unitPrice}
                            </p>
                          </div>
                          <p className="font-medium">
                            Ghc{(item.unitPrice * item.quantity).toFixed(2)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No orders available.
            </p>
          )}

          <div ref={loaderRef} className="w-full text-center p-4">
            {index >= fetchedOrders.length ? "" : "Loading more..."}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
