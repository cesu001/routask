import BackButton from "./BackButton";
import Footer from "./Footer";
import LogoBlack from "../assets/routask-high-resolution-logo-grayscale-transparent.png";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { useAuthStore } from "../store";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const successMessage = useAuthStore((state) => state.successMessage);
  const setSuccessMessage = useAuthStore((state) => state.setSuccessMessage);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const setErrorMessage = useAuthStore((state) => state.setErrorMessage);
  const register = useAuthStore((state) => state.register);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFName(e.target.value);
  };
  const handleLNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fName || !lName) {
      setErrorMessage("Please enter your name, email and password.");
      return;
    }
    try {
      await register({ fName, lName, email, password });
    } catch (err: unknown) {
      console.error("Register component caught error:", err);
    }
  };
  const successMessageToggle = () => {
    setSuccessMessage(null);
    navigate("/login");
  };
  const errorMessageToggle = () => {
    setErrorMessage(null);
  };
  useEffect(() => {
    if (errorMessage?.includes("fName")) {
      setErrorMessage("First name length must be at least 2 characters long.");
    } else if (errorMessage?.includes("lName")) {
      setErrorMessage("Last name length must be at least 2 characters long.");
    } else if (errorMessage?.includes("valid email")) {
      setErrorMessage("Please enter a valid email.");
    } else if (errorMessage?.includes('"password" length')) {
      setErrorMessage("Password length must be at least 6 characters long.");
    }
  }, [errorMessage]);
  useEffect(() => {
    if (currentUser) {
      navigate("/index", { replace: true });
    }
  }, [currentUser, navigate]);
  if (currentUser) {
    return <div className="h-screen bg-gray-100"></div>;
  }
  return (
    <div>
      <BackButton />
      {successMessage && (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          className="fixed inset-0 flex justify-center items-center z-10"
        >
          <div className="w-128 bg-white p-10 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">{successMessage}</h2>
            <button
              onClick={successMessageToggle}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-400"
            >
              OK
            </button>
          </div>
        </div>
      )}
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
          onSubmit={handleRegister}
          className="h-156 w-120 border-2 border-gray-400 rounded-xl shadow-xl flex flex-col justify-around items-center gap-10"
        >
          <img src={LogoBlack} alt="logoblack" className="h-24 mt-5" />
          <div className="flex justify-center flex-col gap-9 w-3/4 h-72">
            <div className="flex justify-center items-center gap-5">
              <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
                <FaUser />
                <input
                  type="text"
                  placeholder="First Name:"
                  className="bg-transparent outline-none w-full"
                  name="fName"
                  onChange={handleFNameChange}
                />
              </div>
              <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
                <FaUser />
                <input
                  type="text"
                  placeholder="Last Name:"
                  className="bg-transparent outline-none w-full"
                  name="lName"
                  onChange={handleLNameChange}
                />
              </div>
            </div>
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
            <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
              <RiLockPasswordFill />
              <input
                type="password"
                placeholder="Password:"
                className="bg-transparent outline-none w-full"
                name="password"
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="h-60 flex flex-col items-center gap-10">
            <button
              type="submit"
              className="w-1/3 px-4 py-2 text-2xl font-bold border-2 border-teal-600 rounded-xl hover:cursor-pointer hover:bg-teal-600 hover:text-white transition-colors duration-300"
            >
              Sign Up
            </button>
            <div className="w-120 flex flex-col items-center">
              <p>
                Already got an account? Sign in{" "}
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

export default Register;
