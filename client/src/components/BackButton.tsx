import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="h-16">
      <button
        onClick={handleBack}
        className="mx-3 my-3 px-4 py-2 flex items-center border-2 rounded-lg shadow-lg text-gray-900 hover:text-white hover:bg-gray-400 transition-colors duration-300"
      >
        <FaArrowLeft size={30} />
        <span className="text-2xl align-middle ml-2 font-semibold">Back</span>
      </button>
    </div>
  );
};

export default BackButton;
