import { type PropsWithChildren } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="fixed top-5 right-6 left-6 md:right-8 md:left-8 z-50">
        <Navbar />
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  );
};
