import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { verify } from "./services";
import { Button } from "../../components/ui/Button";
import { Loader } from "../../components/ui/loader";
import { FaCheckCircle } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { MdError } from "react-icons/md";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import logoSrc from "../../assets/images/salad.png";
import { formatCurrency } from "../../utils/currencyDecimal";

export const VerifyPayment = () => {
  const [searchParam] = useSearchParams();
  const reference = searchParam.get("reference");

  const { data, isPending, error } = useQuery({
    queryKey: ["verify", reference],
    queryFn: () => verify(reference as string),
    enabled: !!reference,
  });

  const payment = data?.data;

  const formatDate = (date?: number) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const downloadReceipt = async () => {
    if (!payment) return;

    const doc = new jsPDF({ unit: "pt", format: [380, 720] });

    const W = 380;

    const darkText = [30, 30, 30] as [number, number, number];
    const mutedText = [120, 120, 120] as [number, number, number];
    const bgLight = [250, 249, 248] as [number, number, number];

    let y = 0;

    const logoSize = 56;
    const logoX = W / 2 - logoSize / 2;
    const logoY = 25;

    doc.addImage(logoSrc, "PNG", logoX, logoY, logoSize, logoSize);

    y = logoY + logoSize + 28;

    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...darkText);
    doc.text("Lebene's Kitchen", W / 2, y, { align: "center" });

    y += 18;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...mutedText);
    doc.text("Your order receipt", W / 2, y, { align: "center" });

    y += 26;

    doc.setFontSize(10);
    doc.setTextColor(...mutedText);
    doc.text(formatDate(payment.transaction_date), 40, y);
    doc.text(`Ref: ${payment.reference}`, W - 40, y, { align: "right" });

    y += 22;

    const boxLeft = 28;
    const boxRight = W - 28;
    const boxW = boxRight - boxLeft;

    const items = payment.metadata?.orderItems ?? [];
    const itemHeight = 26;

    let rowY = y;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...darkText);
    doc.text("Order Items", boxLeft + 12, rowY);

    rowY += 20;

    items.forEach((item: any) => {
      const name = `${item.foodName} (x${item.quantity})`;
      const price = `Ghc${Number(item.unitPrice) * Number(item.quantity)}`;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...mutedText);
      doc.text(name, boxLeft + 12, rowY);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkText);
      doc.text(price, boxRight - 12, rowY, { align: "right" });

      rowY += itemHeight;
    });

    rowY += 10;

    const drawRow = (label: string, value: string) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...mutedText);
      doc.text(label, boxLeft + 12, rowY);

      doc.setTextColor(...darkText);
      doc.setFont("helvetica", "bold");
      doc.text(value, boxRight - 12, rowY, { align: "right" });

      rowY += 22;
    };

    drawRow("Food cost", formatCurrency(payment.metadata?.foodCost));
    drawRow("Delivery fee", formatCurrency(payment.metadata?.deliveryFee));
    drawRow("Delivery type", payment.metadata?.deliveryType ?? "-");
    drawRow("Location", payment.metadata?.deliveryLocation ?? "-");
    drawRow(
      "Method",
      payment.channel === "mobile_money"
        ? "Mobile Money"
        : (payment.channel ?? "-"),
    );
    drawRow("Date", formatDate(payment.transaction_date));

    rowY += 14;

    doc.setFillColor(...bgLight);
    doc.rect(boxLeft, rowY, boxW, 40, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...darkText);

    doc.text("TOTAL", boxLeft + 12, rowY + 26);
    doc.text(formatCurrency(payment.amount / 100), boxRight - 12, rowY + 26, {
      align: "right",
    });

    rowY += 80;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);
    doc.text("Contact: (+233) 539 941 936", W / 2, rowY, {
      align: "center",
    });

    rowY += 24;

    doc.setFontSize(9);
    doc.setTextColor(...mutedText);

    const note =
      "Your order has been confirmed and payment received. For support, contact us anytime.";

    const lines = doc.splitTextToSize(note, W - 60);
    doc.text(lines, W / 2, rowY, { align: "center" });

    rowY += lines.length * 12 + 24;

    doc.save(`receipt-${payment.reference}.pdf`);
  };

  return (
    <div className="min-h-screen bg-bg1 flex items-center justify-center px-8">
      <div className="bg-white p-5 flex flex-col items-center rounded-xl w-full md:w-120 lg:w-150">
        {isPending && <Loader />}

        {error && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center bg-red-500 w-15 h-15 rounded-full mx-auto"
            >
              <MdError className="text-[30px] text-red-800" />
            </motion.div>

            <h2 className="text-[20px] font-semibold text-secondary mt-3">
              Payment Verification Failed
            </h2>
          </div>
        )}

        {payment && (
          <>
            <div className="text-center mb-3">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center bg-green-500 w-15 h-15 rounded-full mx-auto"
              >
                <FaCheckCircle className="text-[30px] text-green-800" />
              </motion.div>

              <h2 className="text-[20px] font-semibold text-secondary mt-2">
                Payment Verified Successfully
              </h2>
              <p className="text-gray-500 text-[14px]">
                Thank you for your order
              </p>
            </div>

            <div className="bg-bg1 p-4 w-full rounded-[10px] text-[14px] md:text-[15px] space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500">Reference:</p>
                <p className="font-semibold">{payment.reference}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-500">Method:</p>
                <p className="font-semibold">{payment.channel}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-500">Date:</p>
                <p className="font-semibold">
                  {formatDate(payment.transaction_date)}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-500">Delivery Type:</p>
                <p className="font-semibold">
                  {payment.metadata?.deliveryType}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-500">Location:</p>
                <p className="font-semibold">
                  {payment.metadata?.deliveryLocation}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-500">Food:</p>
                <p className="font-semibold">
                  {formatCurrency(payment.metadata?.foodCost)}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-500">Delivery:</p>
                <p className="font-semibold">
                  {formatCurrency(payment.metadata?.deliveryFee)}
                </p>
              </div>

              <div className="flex justify-between pt-2">
                <p className="text-gray-700 font-medium">Total:</p>
                <p className="font-bold">{formatCurrency(payment.amount)}</p>
              </div>
            </div>

            <div className="w-full flex items-center gap-x-4 mt-4">
              <Link
                to="/"
                className="w-full flex items-center justify-center bg-primary text-white px-3 md:px-5 py-2 rounded-xl gap-x-2"
              >
                <IoMdHome />
                <Button text="Home" Stlye="bg-transparent" />
              </Link>
              <div
                className="bg-green-600 text-white text-center flex items-center justify-center gap-x-2 px-3 md:px-5 py-2 rounded-xl w-full"
                onClick={downloadReceipt}
              >
                <IoReceiptSharp />
                Receipt
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
