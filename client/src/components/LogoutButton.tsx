import { useAuthStore } from "../store";

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const setSuccessMessage = useAuthStore((state) => state.setSuccessMessage);
  const handleLogout = () => {
    logout();
    setSuccessMessage("You have been logged out.");
  };
  return (
    <div className="h-16 absolute top-0 right-0 p-2 md:p-3">
      <button
        onClick={handleLogout}
        className="px-3 py-1.5 text-sm lg:px-4 lg:py-2 lg:text-xl font-semibold border-2 rounded-lg shadow-lg text-gray-900 hover:text-white hover:bg-gray-400 transition-colors duration-300"
      >
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default LogoutButton;
