import type { PropsWithChildren } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useOrderNotification } from "../../../hooks/useOrderNotification";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  useOrderNotification();

  return (
    <>
      <div className="h-screen w-screen flex overflow-hidden">
        <div className="hidden md:block md:w-64 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col h-full">
          <div className="w-full shrink-0">
            <Header />
          </div>
          <div className="flex-1 overflow-y-auto bg-bg1 rounded-tl-2xl p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
