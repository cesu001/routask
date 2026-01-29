import BackButton from "./BackButton";
import Footer from "./Footer";
import LogoBlack from "../assets/routask-high-resolution-logo-grayscale-transparent.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ResetPasswordNew = () => {
  const { _id, token } = useParams();
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const setErrorMessage = useAuthStore((state) => state.setErrorMessage);
  const fetchResetPwd = useAuthStore((state) => state.fetchResetPwd);
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");
  const [pwdChangeMsg, setPwdChangeMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPwdChange, setIsPwdChange] = useState(false);
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const handleCheckNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCheckNewPassword(e.target.value);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !checkNewPassword) {
      setErrorMessage("Please fill in all password fields.");
      return;
    }
    if (newPassword !== checkNewPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      if (_id && token) {
        let response = await resetPassword({ _id, token, newPassword });
        if (response) {
          setPwdChangeMsg(response.message);
          setIsPwdChange(!isPwdChange);
        }
      }
    } catch (err: unknown) {
      console.error("ResetPasswordNew Component caught error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRedirect = () => {
    navigate("/login");
  };
  const errorMessageToggle = () => {
    setErrorMessage(null);
  };
  useEffect(() => {
    if (_id && token) {
      fetchResetPwd({ _id, token })
        .then((data) => {
          if (data?.email) setEmail(data.email);
        })
        .catch((err: unknown) => {
          console.error("Fetch failed.", err);
        });
    }
  }, [_id, token, fetchResetPwd, setEmail]);
  useEffect(() => {
    if (errorMessage?.includes("newPassword")) {
      setErrorMessage(
        "New password length must be at least 6 characters long.",
      );
    }
    // set invalid token as invalid id
    if (errorMessage?.includes("Not verified.")) {
      setErrorMessage("User not found.");
    }
  }, [errorMessage, setErrorMessage]);
  return (
    <div>
      <div>
        {isPwdChange && (
          <div
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            className="fixed inset-0 flex justify-center items-center z-10"
          >
            <div className="w-128 bg-white p-10 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">{pwdChangeMsg}</h2>
              <button
                onClick={handleRedirect}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-400"
              >
                Login again.
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
              {errorMessage?.includes("Invalid") ? (
                <p className="text-lg">
                  {errorMessage?.includes("ID")
                    ? "Please ensure you have valid ID."
                    : "Please ensure you have valid token."}
                </p>
              ) : (
                <p className="text-lg">
                  {errorMessage?.includes("User not found.")
                    ? "Please ensure you have valid email."
                    : "Please check your new password again."}
                </p>
              )}
              <button
                onClick={() => {
                  if (errorMessage?.includes("User not found.")) {
                    errorMessageToggle();
                    navigate("/reset");
                  } else if (errorMessage?.includes("Invalid")) {
                    errorMessageToggle();
                    navigate("/reset");
                  } else {
                    errorMessageToggle();
                  }
                }}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-400"
              >
                OK
              </button>
            </div>
          </div>
        )}
        <div className="h-224 flex justify-center items-center">
          <form
            onSubmit={handleResetPassword}
            className="h-156 w-120 border-2 border-gray-400 rounded-xl shadow-xl flex flex-col justify-around items-center gap-10"
          >
            <img src={LogoBlack} alt="logoblack" className="h-24 mt-5" />
            <div className="flex justify-around flex-col gap-9 w-3/4 h-72">
              <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
                <MdEmail />
                <input
                  type="email"
                  placeholder="Email:"
                  className="bg-transparent outline-none w-full"
                  name="email"
                  disabled
                  value={email}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold">New Password :</h2>
                <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
                  <RiLockPasswordFill />
                  <input
                    type="password"
                    placeholder="New Password:"
                    className="bg-transparent outline-none w-full"
                    name="password"
                    onChange={handleNewPasswordChange}
                    value={newPassword}
                  />
                </div>
                <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
                  <RiLockPasswordFill />
                  <input
                    type="password"
                    placeholder="New Password Check:"
                    className="bg-transparent outline-none w-full"
                    name="password"
                    onChange={handleCheckNewPasswordChange}
                    value={checkNewPassword}
                  />
                </div>
              </div>
            </div>
            <div className="h-60 flex flex-col items-center gap-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-1/3 px-4 py-2 text-2xl font-bold border-2 border-teal-600 rounded-xl transition-colors duration-300 
                ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-600 hover:text-white hover:cursor-pointer"}`}
              >
                {isLoading ? "Resetting..." : "Reset"}
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
    </div>
  );
};

export default ResetPasswordNew;
