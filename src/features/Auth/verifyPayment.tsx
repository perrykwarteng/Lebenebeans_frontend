import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { verify } from "./services";
import { Button } from "../../components/ui/Button";
import { Loader } from "../../components/ui/loader";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

import { motion } from "framer-motion";

export const VerifyPayment = () => {
  let [searchParam] = useSearchParams();

  const reference = searchParam.get("reference");

  const { data, isPending, error } = useQuery({
    queryKey: ["verify"],
    queryFn: () => verify(reference!),
  });
  const referenceCode = data?.data?.reference;
  const paymentMethod = data?.data?.channel;
  const transactionDate = new Date(
    data?.data?.transaction_date,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const paymentAmount = `Ghc${data?.data?.amount / 100}`;
  const paymentDeliveryAmount = `Ghc${data?.data?.metadata?.deliveryFee}`;
  const foodCost = `Ghc${data?.data?.metadata?.foodCost}`;
  const paymentDeliveryLocation = data?.data?.metadata?.deliveryLocation;
  const paymentDeliveryType = data?.data?.metadata?.deliveryType;

  return (
    <>
      <div className="h-screen bg-bg1 flex items-center justify-center px-8">
        <div className="bg-white p-5 flex flex-col items-center justify-center rounded-xl w-full md:w-120 lg:w-150">
          {isPending && <Loader />}
          {error && (
            <div className="">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-center bg-red-500 w-15 h-15 rounded-full"
              >
                <MdError className="text-[30px] text-red-800" />
              </motion.div>
              <div className="my-2">
                <h2 className="text-[20px] font-semibold text-secondary">
                  Payment Verification Failed
                </h2>
              </div>
            </div>
          )}
          {data && (
            <div className="text-center flex flex-col items-center justify-center mb-3">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-center bg-green-500 w-15 h-15 rounded-full"
              >
                <FaCheckCircle className="text-[30px] text-green-800" />
              </motion.div>
              <div className="my-2">
                <h2 className="text-[20px] font-semibold text-secondary">
                  Payment Verified Successfully
                </h2>
                <p className="text-gray-500 text-[14px]">
                  Thank you for Purchasing lebene's kitchen
                </p>
              </div>
            </div>
          )}
          {isPending ? (
            ""
          ) : (
            <div className="bg-bg1 p-4 w-full rounded-[10px]">
              <div className="flex items-center justify-between text-[15px] md:text-[16px]">
                <p className="text-gray-500">Payment Reference:</p>
                <p className="text-secondary font-semibold">{referenceCode}</p>
              </div>
              <div className="flex items-center justify-between text-[15px] md:text-[16px]">
                <p className="text-gray-500">Payment Method:</p>
                <p className="text-secondary font-semibold">{paymentMethod}</p>
              </div>
              <div className="flex items-center justify-between text-[15px] md:text-[16px]">
                <p className="text-gray-500">Payment Date:</p>
                <p className="text-secondary font-semibold">
                  {transactionDate}
                </p>
              </div>

              <div className="flex items-center justify-between my-0.5 text-[15px] md:text-[16px]">
                <p className="text-gray-500">Delivery Type:</p>
                <p className="text-secondary font-semibold">
                  {paymentDeliveryType}
                </p>
              </div>
              <div className="flex items-center justify-between my-0.5 text-[15px] md:text-[16px]">
                <p className="text-gray-500">Delivery Location:</p>
                <p className="text-secondary font-semibold">
                  {paymentDeliveryLocation}
                </p>
              </div>
              <div className="flex items-center justify-between my-0.5 text-[15px] md:text-[16px]">
                <p className="text-gray-500">Delivery Amount:</p>
                <p className="text-secondary font-semibold">
                  {paymentDeliveryAmount}
                </p>
              </div>
              <div className="flex items-center justify-between my-0.5 text-[15px] md:text-[16px]">
                <p className="text-gray-500">Food Cost:</p>
                <p className="text-secondary font-semibold">{foodCost}</p>
              </div>
              <div className="flex items-center justify-between my-0.5 text-[15px] md:text-[16px]">
                <p className="text-gray-500">Total Amount:</p>
                <p className="text-secondary font-semibold">{paymentAmount}</p>
              </div>
            </div>
          )}
          <div className="w-full mt-4">
            <Link to="/">
              <Button
                text="Back Home"
                Stlye="bg-primary hover:bg-secondary hover:text-white px-5 py-2 text-center rounded-xl text-secondary w-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
