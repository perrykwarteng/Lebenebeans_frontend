import { Link } from "react-router-dom";
import BannerImage from "../assets/images/Banner.jpg";

export const Banner = () => {
  return (
    <div
      className="relative bg-gray-800 rounded-xl overflow-hidden mx-8 md:mx-16"
      style={{
        backgroundImage: `url(${BannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-15"></div>

      <div className="relative max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center text-white">
        <h2 className="text-[30px] md:text-[50px] font-semibold mb-2">
          For all your needs
        </h2>

        <p className="text-lg md:text-xl font-medium">
          Call us on:
          <Link
            to="tel:+233 539 941 936"
            className="text-white hover:underline hover:text-primary ms-1"
          >
            (+233) 539 941 936
          </Link>
        </p>
        <p className="text-lg md:text-xl font-medium">Locate us at: Pig Farm</p>
      </div>
    </div>
  );
};
