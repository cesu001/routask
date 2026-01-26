import {
  FaFacebook,
  FaInstagram,
  FaRegCopyright,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="h-32 bg-neutral-800 flex flex-col text-white gap-2">
      <div className="flex justify-center items-center mt-4 gap-5">
        <Link to="https://www.facebook.com/">
          <FaFacebook size={24} />
        </Link>
        <Link to="https://www.instagram.com/">
          <FaInstagram size={24} />
        </Link>
        <Link to="https://twitter.com/">
          <FaSquareXTwitter size={24} />
        </Link>
        <Link to="https://www.youtube.com/">
          <FaYoutube size={24} />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-5 text-xl font-semibold">
        <Link to="/">Home</Link>
        <Link to="">About</Link>
        <Link to="">Contact Us</Link>
      </div>
      <div className="flex justify-center items-center text-sm font-light">
        <p className="mx-1">Copyright</p>
        <FaRegCopyright />
        <p className="mx-1">RouTask 2025</p>
      </div>
    </div>
  );
};

export default Footer;
