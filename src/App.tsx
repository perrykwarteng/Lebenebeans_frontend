import { useSearchParams } from "react-router-dom";
import { Banner } from "./components/Banner";
import { Hero } from "./components/Hero";
import { MainLayout } from "./components/layouts/MainLayout";
import { OpeningHours } from "./components/OpeningHours";
import { Menu } from "./features/Menu/Menu";
import { usePromoStore } from "./store/usePromoStore";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPromotion } from "./features/Cart/services";
import { formatDate } from "./utils/formatDateTime";

function App() {
  const [getParams] = useSearchParams();
  const [isPromo, setIsPromo] = useState(false);
  const [promoError, setPromoError] = useState("");
  const { setPromo, clearPromo } = usePromoStore();

  const code = getParams.get("code");
  const type = getParams.get("type");

  const { data } = useQuery({
    queryKey: ["Promotion", code, type],
    queryFn: () => getPromotion(code!, type!),
    enabled: !!code && !!type,
  });

  useEffect(() => {
    if (!code && !type) {
      setIsPromo(false);
      clearPromo();
      return;
    }

    if (!data) {
      clearPromo();
      setIsPromo(false);
      return;
    }
    if (data.status === 200) {
      setPromo(data.data.data);
      setPromoError("");
      setIsPromo(true);

      setTimeout(() => setIsPromo(false), 5000);
    } else if (data.status === 400) {
      setIsPromo(true);
      clearPromo();
      setPromoError(data.data.message);

      setTimeout(() => setIsPromo(false), 5000);
    } else {
      setPromoError("");
      setIsPromo(false);
      clearPromo();
    }
  }, [code, type, data]);

  const getPromo = JSON.parse(localStorage.getItem("promo") ?? "null");
  const promo = getPromo?.state?.promo;

  return (
    <>
      <MainLayout>
        {isPromo && (
          <div className="absolute top-5 left-0 right-0 w-full bg-white border border-gray-200 shadow-2xl rounded-2xl z-40 p-4">
            {promo && data?.status === 200 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-base md:text-lg font-semibold text-green-600">
                  You’ve successfully applied for the promo
                </h3>

                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-x-6">
                  <p className="text-secondary font-medium">
                    Promotion:
                    {promo.isActive ? (
                      <span className="ml-1 text-sm text-green-600">
                        Active
                      </span>
                    ) : (
                      <span className="ml-1 text-sm text-red-600">
                        Inactive
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-x-6">
                  <p className="text-secondary font-medium">
                    Start:
                    <span className="text-sm ml-1 wrap-break-words">
                      {formatDate(promo.startAt)}
                    </span>
                  </p>

                  <p className="text-secondary font-medium">
                    End:
                    <span className="text-sm ml-1 wrap-break-words">
                      {formatDate(promo.expiresAt)}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {promoError && (
              <h3 className="text-lg font-semibold text-red-500">
                {promoError}
              </h3>
            )}
          </div>
        )}

        <Hero />
        <Menu />
        <OpeningHours />
        <Banner />
      </MainLayout>
    </>
  );
}

export default App;
