import type { ReactNode } from "react";
import { MdClose } from "react-icons/md";

interface ModalTypes {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  size = "md",
}: ModalTypes) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "w-full max-w-sm",
    md: "w-full max-w-2xl",
    lg: "w-full max-w-4xl",
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div
          className={`bg-white rounded-3xl ${sizeClasses[size]} p-6 relative shadow-xl transform transition-transform duration-300 scale-100`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-5">
            {title && <h2 className="text-[20px] font-bold">{title}</h2>}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              <MdClose />
            </button>
          </div>

          <div className="max-h-[80vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
};
