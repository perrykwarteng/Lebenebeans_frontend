import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/images/salad.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-10">
      <div className="w-full md:px-5 py-2 flex flex-col justify-center md:flex-row items-center md:justify-between  gap-4">
        <div className="">
          <Link className="flex items-center justify-center gap-x-2" to="/">
            <img className="w-12" src={Logo} alt="Main Logo" />
            <h1 className="text-white text-[22px] font-medium">
              Lebenebeans
            </h1>
          </Link>
        </div>

        <div className="text-center text-white py-1.5">
          &copy; {new Date().getFullYear()} Lebenebeans, All Rights Reserved
        </div>

        <div className="flex justify-center md:justify-end gap-5 text-white text-xl">
          <Link to="#" aria-label="Facebook" className="hover:text-secondary">
            <FaFacebookF />
          </Link>
          <Link to="#" aria-label="Instagram" className="hover:text-secondary">
            <FaInstagram />
          </Link>
          <Link to="#" aria-label="Twitter" className="hover:text-secondary">
            <FaTwitter />
          </Link>
          <Link to="#" aria-label="TikTok" className="hover:text-secondary">
            <FaTiktok />
          </Link>
        </div>
      </div>
    </footer>
  );
};
