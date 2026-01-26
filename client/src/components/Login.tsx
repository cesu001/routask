import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import Footer from "./Footer";
import LogoBlack from "../assets/routask-high-resolution-logo-grayscale-transparent.png";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useAuthStore } from "../store";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const setErrorMessage = useAuthStore((state) => state.setErrorMessage);
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }
    try {
      await login({ email, password });
    } catch (e: any) {
      console.log(e);
    }
  };
  const errorMessageToggle = () => {
    setErrorMessage(null);
  };
  useEffect(() => {
    if (errorMessage?.includes("valid")) {
      setErrorMessage("Please enter a valid email.");
    } else if (errorMessage?.includes("length")) {
      setErrorMessage("Password length must be at least 6 characters long.");
    }
  }, [errorMessage]);
  return (
    <div>
      {currentUser && (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          className="fixed inset-0 flex justify-center items-center z-10"
        >
          <div className="w-128 bg-white p-10 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              You are already logged in.
            </h2>
            <button
              onClick={() => navigate("/index")}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-400"
            >
              Go to Task Index
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
          onSubmit={handleLogin}
          className="h-156 w-120 border-2 border-gray-400 rounded-xl shadow-xl flex flex-col justify-around items-center gap-10"
        >
          <img src={LogoBlack} alt="logoblack" className="h-24 mt-5" />
          <div className="flex justify-center flex-col gap-9 w-3/4 h-72">
            <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
              <MdEmail />
              <input
                onChange={handleEmailChange}
                type="text"
                placeholder="Email:"
                className="bg-transparent outline-none w-full"
              />
            </div>
            <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
              <RiLockPasswordFill />
              <input
                onChange={handlePasswordChange}
                type="password"
                placeholder="Password:"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>
          <div className="h-60 flex flex-col items-center gap-6">
            <button
              type="submit"
              className="w-1/3 px-4 py-2 text-2xl font-bold border-2 border-teal-600 rounded-xl hover:cursor-pointer hover:bg-teal-600 hover:text-white transition-colors duration-300"
            >
              Sign In
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
                Forget password?{" "}
                <Link to="/reset">
                  <span className="text-teal-600 font-bold hover:underline hover:cursor-pointer">
                    Reset Password
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

export default Login;
