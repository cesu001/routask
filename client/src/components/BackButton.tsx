import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="h-[10vh] p-2">
      <button
        onClick={handleBack}
        className="px-3 py-1.5 text-xs lg:px-4 lg:py-2 lg:text-xl flex items-center border-2 rounded-lg shadow-lg text-gray-900 hover:text-white hover:bg-gray-400 transition-colors duration-300"
      >
        <FaArrowLeft className="text-sm lg:text-xl" />
        <span className="align-middle ml-1 font-semibold">Back</span>
      </button>
    </div>
  );
};

export default BackButton;
