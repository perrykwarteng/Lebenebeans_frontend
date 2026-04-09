import { useEffect, type PropsWithChildren } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { getCloseStatus } from "../../features/Dashboard/service";
import type { CloseType } from "../../features/Dashboard/type";
import { useQuery } from "@tanstack/react-query";

export const MainLayout = ({ children }: PropsWithChildren) => {
  const { data, refetch } = useQuery<CloseType>({
    queryKey: ["closeStatus"],
    queryFn: getCloseStatus,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="overflow-hidden">
      <div className="absolute top-5 right-8 left-8">
        <Navbar />
        {data?.closeOrders === "close" && (
          <div className="marquee-container py-2 bg-secondary z-20">
            <div className="marquee text-white text-[23px]">
              Sorry we have closed. Cannot place orders at this time Thank you!
            </div>
          </div>
        )}
      </div>
      {children}
      <Footer />
    </div>
  );
};
