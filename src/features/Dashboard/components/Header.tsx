import { HiOutlineLockClosed, HiUser } from "react-icons/hi2";
import { TbLogout2 } from "react-icons/tb";
import { useUserStore } from "../../../store/useUserStore";
import { CgMenuLeftAlt } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import Logo from "../../../assets/images/salad.png";

import { useState } from "react";
import { toast } from "sonner";
import { changeCloseOrders, getCloseStatus } from "../service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IoLockOpenOutline } from "react-icons/io5";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { MainMenu, GeneralMenu } from "../../../data/sidebarNav";
import { logout } from "../../Auth/services";
import type { CloseType } from "../type";
import { Modal } from "../../../components/ui/modal";

export const Header = () => {
  const { user } = useUserStore();
  const [openNav, setOpenNav] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [closeOrderModalOpen, setCloseOrderModalOpen] = useState(false);

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out succesfully");
      localStorage.clear();
      navigate("/login");
    },
  });

  const { data, refetch } = useQuery<CloseType>({
    queryKey: ["closeStatus"],
    queryFn: getCloseStatus,
  });

  const { mutate: changeOrder } = useMutation({
    mutationFn: changeCloseOrders,
    onSuccess: () => {
      toast.success(
        data?.closeOrders === "open"
          ? "Closed Orders Successfully"
          : data?.closeOrders === "close"
            ? "Openned Orders Successfully"
            : "",
      );
      refetch();
    },
  });

  const changeOrderStatus = (close: string, id: number) => {
    changeOrder({ close, id });
    setCloseOrderModalOpen(false);
  };

  return (
    <div className="p-4 flex items-center justify-between">
      <div>
        <h1 className="hidden md:block text-[20px] font-medium">
          Welcome Back, {user.name}
        </h1>
        <div className="block md:hidden">
          {openNav ? null : (
            <CgMenuLeftAlt
              className=" text-[28px] text-secondary"
              onClick={() => {
                setOpenNav(!openNav);
              }}
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="flex items-center gap-x-2">
          <div className="text-[25px] p-1.5 border border-primary rounded-full">
            <HiUser className="text-secondary" />
          </div>
          <div>
            <h2 className="text-secondary text-[16px] font-medium">
              {user.name}
            </h2>
            <p className="text-gray-400 -mt-2">{user.email}</p>
          </div>
        </div>
      </div>

      {openNav && (
        <div className="block md:hidden h-full absolute left-0 top-0 bottom-0 right-35 shadow-2xl bg-white z-40 px-3 overflow-hidden">
          <div className="mt-6 flex items-center justify-between">
            <Link className="flex items-center gap-x-2" to="/admin/dashboard">
              <img className="w-8" src={Logo} alt="Main Logo" />
              <h1 className="text-primary text-[20px] font-medium">
                Lebene beans
              </h1>
            </Link>

            <div className="">
              <CgClose
                className=" text-[28px] text-secondary"
                onClick={() => {
                  setOpenNav(false);
                }}
              />
            </div>
          </div>
          <p className="text-gray-300 text-[17px] mb-1 mt-6">Main Menu</p>
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <ul className="flex flex-col gap-y-2">
                {MainMenu.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li
                      key={item.id}
                      className={`flex items-center gap-x-1.5 p-2 rounded-lg cursor-pointer ${
                        isActive
                          ? "bg-secondary text-white"
                          : "text-secondary hover:bg-bg1"
                      }`}
                    >
                      <span className="text-[18px]">{item.icon}</span>
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 text-[17px] mb-1">General</p>
              <div className="">
                <ul className="flex flex-col gap-y-2">
                  {GeneralMenu.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <li key={item.id}>
                        <Link
                          to={item.path}
                          className={`flex items-center gap-x-1.5 p-2 rounded-lg ${
                            isActive
                              ? "bg-secondary text-white"
                              : "text-secondary hover:bg-bg1"
                          }`}
                        >
                          <span className="text-[18px]">{item.icon}</span>
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex-1">
              <div
                className={`my-3 w-full flex items-center gap-x-1.5 p-2 rounded-lg  text-white cursor-pointer ${data?.closeOrders === "open" ? "bg-red-500" : data?.closeOrders === "close" ? "bg-green-600" : ""}`}
                onClick={() => {
                  setCloseOrderModalOpen(!closeOrderModalOpen);
                }}
              >
                {data?.closeOrders === "open" ? (
                  <IoLockOpenOutline />
                ) : data?.closeOrders === "close" ? (
                  <HiOutlineLockClosed />
                ) : null}
                <p>
                  {data?.closeOrders === "open"
                    ? "Close Order"
                    : data?.closeOrders === "close"
                      ? "Open Orders"
                      : ""}
                </p>
              </div>
              <div
                onClick={() => {
                  logoutMutate();
                }}
                className="flex items-center gap-x-1.5 p-2 text-secondary cursor-pointer hover:font-medium"
              >
                <TbLogout2 className="text-[18px]" />
                <p>LogOut</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        title=""
        isOpen={closeOrderModalOpen}
        onClose={() => setCloseOrderModalOpen(false)}
        size="md"
      >
        <p className="mb-4">Are you sure you want to delete this location?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setCloseOrderModalOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            No, Keep Order
          </button>
          <button
            onClick={() => {
              const status =
                data!.closeOrders === "open"
                  ? "close"
                  : data!.closeOrders === "close"
                    ? "open"
                    : "";
              changeOrderStatus(status, data!.id);
            }}
            className={`px-4 py-2 text-white rounded ${data?.closeOrders === "open" ? " bg-red-500" : data?.closeOrders === "close" ? "bg-green-600" : ""}`}
          >
            {data?.closeOrders === "open"
              ? "Close Orders"
              : data?.closeOrders === "close"
                ? "Open Orders"
                : ""}
          </button>
        </div>
      </Modal>
    </div>
  );
};
