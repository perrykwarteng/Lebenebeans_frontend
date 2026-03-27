import type { ReactNode } from "react";
import { MdClose } from "react-icons/md";

interface DrawerTypes {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "right" | "left";
  size?: "sm" | "md" | "lg";
}

export const Drawer = ({
  isOpen,
  onClose,
  children,
  position = "right",
  size = "md",
}: DrawerTypes) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "w-64",
    md: "w-96",
    lg: "w-[480px]",
  };

  const positionClasses = position === "right" ? "right-0" : "left-0";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black bg-opacity-40"
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 ${positionClasses} h-full bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 ${sizeClasses[size]}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          <MdClose />
        </button>

        <div className="mt-8">{children}</div>
      </div>
    </>
  );
};
