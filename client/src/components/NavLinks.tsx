import { Link } from "react-router-dom";
import { useAuthStore } from "../store";

const NavLinks: React.FC<{ closeMenu: () => void }> = ({ closeMenu }) => {
  const currentUser = useAuthStore((state) => {
    return state.currentUser;
  });
  return (
    <>
      <a
        href="#top"
        className="w-32 mx-1 hover:scale-110 hover:bg-gray-300 hover:text-black px-4 py-2 rounded-md transition delay-50 duration-300 ease-in-out"
      >
        Home
      </a>
      <a
        href="#overview"
        onClick={closeMenu}
        className="w-32 mx-1 hover:scale-110 hover:bg-gray-300 hover:text-black px-4 py-2 rounded-md transition delay-50 duration-300 ease-in-out"
      >
        Overview
      </a>
      <a
        href="#feature"
        className="w-32 mx-1 hover:scale-110 hover:bg-gray-300 hover:text-black px-4 py-2 rounded-md transition delay-50 duration-300 ease-in-out"
      >
        Feature
      </a>
      {!currentUser && (
        <>
          <Link
            to="/login"
            className="w-32 mx-1 hover:scale-110 hover:bg-gray-300 hover:text-black px-4 py-2 rounded-md transition delay-50 duration-300 ease-in-out"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="w-32 mx-1 hover:scale-110 hover:bg-gray-300 hover:text-black px-4 py-2 rounded-md transition delay-50 duration-300 ease-in-out border-teal-600 border-2"
          >
            Sign up
          </Link>
        </>
      )}
      {currentUser && (
        <>
          <Link
            to="/profile"
            className="w-32 mx-1 hover:scale-110 hover:bg-gray-300 hover:text-black px-4 py-2 rounded-md transition delay-50 duration-300 ease-in-out"
          >
            Profile
          </Link>
          <Link
            to="/index"
            className="w-32 mx-1 text-teal-400 hover:scale-110 hover:bg-gray-300 hover:text-black px-4 py-2 rounded-md transition delay-50 duration-300 ease-in-out border-teal-600 border-2"
          >
            Tasks
          </Link>
        </>
      )}
    </>
  );
};

export default NavLinks;
