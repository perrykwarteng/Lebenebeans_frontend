import { useSearchParams } from "react-router-dom";
import { Banner } from "./components/Banner";
import { Hero } from "./components/Hero";
import { MainLayout } from "./components/layouts/MainLayout";
import { OpeningHours } from "./components/OpeningHours";
import { Menu } from "./features/Menu/Menu";
import { usePromoStore } from "./store/usePromoStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPromotion } from "./features/Cart/services";
import { toast } from "sonner";

function App() {
  const [getParams] = useSearchParams();
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
      clearPromo();

      return;
    }

    if (!data) return clearPromo();

    if (data.status === 200) {
      setPromo(data.data.data);
      toast.success("Enjoy Your Promotion");
    } else {
      clearPromo();
    }
  }, [code, type, data]);

  return (
    <>
      <MainLayout>
        <Hero />
        <Menu />
        <OpeningHours />
        <Banner />
      </MainLayout>
    </>
  );
}

export default App;
