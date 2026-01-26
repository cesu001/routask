import BackButton from "./BackButton";
import Footer from "./Footer";
import LogoBlack from "../assets/routask-high-resolution-logo-grayscale-transparent.png";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store";
import React, { useState, useEffect } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isMailSent, setIsMailSent] = useState(false);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response = await forgotPassword(email);
      // console.log(response);
      if (response) {
        setIsMailSent(!isMailSent);
        setResetMessage(response.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMailSentToggle = () => {
    setIsMailSent(!isMailSent);
  };
  // console.log(errorMessage);
  const errorMessageToggle = () => {
    useAuthStore.setState({ errorMessage: null });
  };

  useEffect(() => {
    if (errorMessage?.includes("empty")) {
      useAuthStore.setState({
        errorMessage: "Email is not allowed to be empty.",
      });
    } else if (errorMessage?.includes("valid")) {
      useAuthStore.setState({
        errorMessage: "Email must be a valid email.",
      });
    }
  }, [errorMessage]);
  return (
    <div>
      {isMailSent && (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          className="fixed inset-0 flex justify-center items-center z-10"
        >
          <div className="w-128 bg-white p-10 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">{resetMessage}</h2>
            <button
              onClick={handleMailSentToggle}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-400"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <BackButton />
      {errorMessage && (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          className="fixed inset-0 flex justify-center items-center z-10"
        >
          <div className="w-128 bg-white p-10 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">{errorMessage}</h2>
            <button
              onClick={errorMessageToggle}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-400"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className="h-224 flex justify-center items-center">
        <form
          onSubmit={handleReset}
          className="h-156 w-120 border-2 border-gray-400 rounded-xl shadow-xl flex flex-col justify-around items-center gap-10"
        >
          <img src={LogoBlack} alt="logoblack" className="h-24 mt-5" />
          <div className="flex justify-around flex-col gap-9 w-3/4 h-72">
            <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
              <MdEmail />
              <input
                type="text"
                placeholder="Email:"
                className="bg-transparent outline-none w-full"
                name="email"
                onChange={handleEmailChange}
              />
            </div>
            <h3 className="text-center font-semibold text-xl">
              Check your Email after reset
            </h3>
          </div>
          <div className="h-60 flex flex-col items-center gap-6">
            <button
              type="submit"
              className="w-1/3 px-4 py-2 text-2xl font-bold border-2 border-teal-600 rounded-xl hover:cursor-pointer hover:bg-teal-600 hover:text-white transition-colors duration-300"
            >
              Reset
            </button>
            <div className="w-120 flex flex-col justify-center items-center gap-3">
              <p>
                Not sign up yet? Sign up{" "}
                <Link to="/register">
                  <span className="text-teal-600 font-bold hover:underline hover:cursor-pointer">
                    here
                  </span>
                </Link>
              </p>
              <p>
                Remember your Password? Sign in{" "}
                <Link to="/login">
                  <span className="text-teal-600 font-bold hover:underline hover:cursor-pointer">
                    here
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
