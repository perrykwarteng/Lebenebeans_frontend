import { DashboardLayout } from "../layout/DashboardLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cancelOrder, getPendingOrder, MarkOrderDelivered } from "../service";
import { Button } from "../../../components/ui/Button";
import type { Order } from "../type";
import { toast } from "sonner";
import { Modal } from "../../../components/ui/modal";
import { useState } from "react";
import { formatDate } from "../../../utils/formatDateTime";

export const Orders = () => {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [deliveredModalOpen, setDeliveredModalOpen] = useState(false);
  const [id, setId] = useState<number>(0);

  const { data, isLoading, refetch } = useQuery<Order[]>({
    queryKey: ["getPendingOrder"],
    queryFn: getPendingOrder,
  });

  const { mutate: cancelOrderMutate } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success("Order canceled successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to cancel order");
    },
  });

  const { mutate: markDeliveredMutate } = useMutation({
    mutationFn: MarkOrderDelivered,
    onSuccess: () => {
      toast.success("Order marked as delivered");
      refetch();
    },
    onError: () => {
      toast.error("Failed to mark order as delivered");
    },
  });

  const deliveredOrder = (id: number) => {
    setId(id);
    setDeliveredModalOpen(!deliveredModalOpen);
  };
  const cancelOrderStatus = (id: number) => {
    setCancelModalOpen(!cancelModalOpen);
    setId(id);
  };

  const handleCancle = () => {
    cancelOrderMutate(id);
    setCancelModalOpen(false);
  };
  const handleMarkDelivered = () => {
    markDeliveredMutate(id);
    setDeliveredModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-[25px] text-secondary font-medium">
          Pending Orders
        </h1>
        <p className="text-gray-400 -mt-1">List Of Orders Been Placed</p>
        <p className="text-gray-400 -mt-1">Pending Orders: {data?.length}</p>
      </div>

      <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {isLoading ? (
          <p className="text-gray-400 text-center col-span-full">
            Loading orders...
          </p>
        ) : data && data.length > 0 ? (
          data
            .map((order) => {
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
                          {o.deliveryType === "dispatch-rider"
                            ? "Dispatch"
                            : o.deliveryType === "pick-up"
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
                            <p className="text-gray-600 text-sm font-medium ">
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
                  <div className="w-full">
                    <div className="flex flex-col justify-end lg:items-end lg:flex-row gap-3">
                      <Button
                        text="Mark Delivered"
                        Stlye="w-full lg:w-1/2 bg-green-700 hover:bg-secondary text-white px-5 py-2 rounded-xl"
                        action={() => deliveredOrder(o.id)}
                      />
                      <Button
                        text="Cancel Order"
                        Stlye="w-full lg:w-1/2 bg-red-500  text-white px-5 py-2 rounded-xl"
                        action={() => cancelOrderStatus(o.id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })
            .reverse()
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No orders available.
          </p>
        )}
      </div>

      <Modal
        title="Confirm Order Cancellation"
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        size="md"
      >
        <p className="mb-4">Are you sure you want to cancel this order?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setCancelModalOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            No, Keep Order
          </button>
          <button
            onClick={handleCancle}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes, Cancel
          </button>
        </div>
      </Modal>

      <Modal
        title="Confirm Delivery"
        isOpen={deliveredModalOpen}
        onClose={() => setDeliveredModalOpen(false)}
      >
        <p className="mb-4">
          Are you sure you want to mark this order as <strong>delivered</strong>
          ?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeliveredModalOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            No, Keep Pending
          </button>
          <button
            onClick={handleMarkDelivered}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Completed
          </button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
