import { useNavigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Button } from "./ui/Button";
import Background from "../assets/images/bg.jpg";

export const NotFound = () => {
  const nav = useNavigate();

  return (
    <>
      <MainLayout>
        <div
          className="h-screen flex items-center justify-center p-5"
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[100px] text-center text-primary">Oops!</h1>
            <p className="text-[20px] text-center text-secondary font-semibold">
              404 - PAGE NOT FOUND
            </p>
            <p className="text-secondary text-center my-2.5">
              This you are looking for is not available or might have been
              removed
            </p>

            <div
              className="flex gap-x-1 items-center justify-center bg-secondary text-white px-5 py-2 text-center rounded-xl"
              onClick={() => {
                nav("/");
              }}
            >
              <Button text="GO TO HOMEPAGE" Stlye="bg-transparent" />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
