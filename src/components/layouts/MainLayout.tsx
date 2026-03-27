import type { PropsWithChildren } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="overflow-hidden">
      <div className="absolute top-5 right-8 left-8">
        <Navbar />
      </div>
      {children}
      <Footer />
    </div>
  );
};
