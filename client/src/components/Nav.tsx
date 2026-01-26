import { useCallback, useState } from "react";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import Logo from "../assets/routask-high-resolution-logo-transparent.png";
import { IoIosMenu } from "react-icons/io";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleMenuClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  return (
    <div className="bg-gray-950 text-white w-full h-[10vh] sticky top-0 z-20 flex justify-between shadow-2xl">
      <div className="min-w-64 h-full ml-5 p-4">
        <Link to="/">
          <img src={Logo} alt="logo" className="object-cover h-full" />
        </Link>
      </div>
      <nav className="hidden h-full lg:flex justify-around items-center font-semibold text-center text-2xl mx-5 gap-3">
        <NavLinks closeMenu={handleMenuClose} />
      </nav>
      <div className="flex lg:hidden justify-center items-center h-full mr-8">
        <button
          onClick={handleMenuToggle}
          className={`transition-transform duration-500 ${
            isOpen ? "transform rotate-180" : "transform rotate-0"
          }`}
        >
          <IoIosMenu size={48} />
        </button>
      </div>
      <div
        className={`absolute pt-5 top-24 w-full bg-gray-800 text-white flex flex-col items-center font-semibold text-2xl text-center gap-4 z-10 transition-all ease-in-out duration-500 overflow-hidden
            ${isOpen ? "h-96 opacity-100" : "h-0 opacity-0"}
            `}
      >
        <NavLinks closeMenu={handleMenuClose} />
      </div>
    </div>
  );
};

export default Nav;
