import Logo from "../../assets/images/salad.png";
import bgImage from "../../assets/images/bg.jpg";
import { Button } from "../../components/ui/Button";
import { InputField } from "../../components/ui/Input";

export const Login = () => {
  return (
    <>
      <div
        className="min-h-screen w-full flex items-center justify-center px-8 md:px-16"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white w-full md:w-120 p-5 md:p-12 rounded-lg shadow-md">
          <div className="flex flex-col justify-between items-center">
            <div className="flex items-center justify-center gap-x-2">
              <img className="w-12" src={Logo} alt="Main Logo" />
              <h1 className="text-primary text-[22px] font-medium">
                Lebenebeans
              </h1>
            </div>
            <div className="text-center my-5">
              <h2 className="text-[24px] text-secondary font-semibold">
                Welcome Back!
              </h2>
              <p className="text-[16px] text-gray-400">
                Enter your email and password to login
              </p>
            </div>
          </div>
          <form className="">
            <div className="my-1.5">
              <InputField label="Email" name={"email"} />
            </div>
            <div className="my-1.5">
              <InputField
                label="Password"
                name={"password"}
                type="password"
                className="border border-black"
              />
            </div>
            <div className="mt-5">
              <Button
                text="Login"
                Stlye="bg-primary hover:bg-secondary hover:text-white px-5 py-3 text-center rounded-xl text-secondary w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
