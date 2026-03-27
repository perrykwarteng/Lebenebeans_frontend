import { Banner } from "./components/Banner";
import { Hero } from "./components/Hero";
import { MainLayout } from "./components/layouts/MainLayout";
import { OpeningHours } from "./components/OpeningHours";
import { Menu } from "./features/Menu/Menu";

function App() {
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
