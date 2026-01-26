import React, { useEffect, useState } from "react";
import BackButton from "./BackButton";
import LogoutButton from "./LogoutButton";
import Footer from "./Footer";
import LogoBlack from "../assets/routask-high-resolution-logo-grayscale-transparent.png";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const successMessage = useAuthStore((state) => state.successMessage);
  const setSuccessMessage = useAuthStore((state) => state.setSuccessMessage);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const setErrorMessage = useAuthStore((state) => state.setErrorMessage);
  const fetchUserData = useAuthStore((state) => state.fetchUserData);
  const updateUserData = useAuthStore((state) => state.updateUserData);
  const changePassword = useAuthStore((state) => state.changePassword);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");
  const [pwdChangeMsg, setPwdChangeMsg] = useState("");
  const [isPwdChange, setIsPwdChange] = useState(false);

  const handleFNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFName(e.target.value);
  };
  const handleLNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const handleCheckNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCheckNewPassword(e.target.value);
  };
  const handleLogoutAndRedirect = () => {
    logout();
    navigate("/login");
  };
  const successMessageToggle = () => {
    setSuccessMessage(null);
    if (successMessage === "You have been logged out.") {
      navigate("/");
    }
  };
  // save password
  const handelSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !checkNewPassword) {
      setErrorMessage("Please fill in all password fields.");
      return;
    }
    if (oldPassword === newPassword) {
      setErrorMessage("New password must be different from old password.");
      return;
    }
    if (newPassword !== checkNewPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }
    try {
      if (currentUser) {
        let response = await changePassword({
          _id: currentUser.user._id,
          oldPassword,
          newPassword,
        });
        if (response) {
          setPwdChangeMsg(response.message);
          setIsPwdChange(!isPwdChange);
        }
        setOldPassword("");
        setNewPassword("");
        setCheckNewPassword("");
      }
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(errorMessage);

  // save info
  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fName || !lName) {
      setErrorMessage("Please enter your name.");
      return;
    }
    try {
      if (currentUser) {
        let response = await updateUserData({
          _id: currentUser.user._id,
          fName,
          lName,
        });
        setSuccessMessage(response.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const errorMessageToggle = () => {
    setErrorMessage(null);
  };
  useEffect(() => {
    if (errorMessage?.includes("fName")) {
      setErrorMessage("First name length must be at least 2 characters long");
    } else if (errorMessage?.includes("lName")) {
      setErrorMessage("Last name length must be at least 2 characters long");
    } else if (errorMessage?.includes("oldPassword")) {
      setErrorMessage("Old password is incorrect.");
    } else if (errorMessage?.includes("newPassword")) {
      setErrorMessage(
        "New password length must be at least 6 characters long.",
      );
    }
  }, [errorMessage]);

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser?.user._id)
        .then((data) => {
          setFName(data.user.fName || "");
          setLName(data.user.lName || "");
        })
        .catch((e) => {
          console.log(e);
        });
      setEmail(currentUser?.user.email || "");
    }
  }, [currentUser]);
  return (
    <div className="min-h-screen">
      <LogoutButton />
      {!currentUser && !successMessage && (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          className="fixed inset-0 flex justify-center items-center z-10"
        >
          <div className="w-128 bg-white p-10 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              You need to be logged in to view this page.
            </h2>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-400"
            >
              Go to login page.
            </button>
          </div>
        </div>
      )}
      {isPwdChange && (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          className="fixed inset-0 flex justify-center items-center z-10"
        >
          <div className="w-128 bg-white p-10 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">{pwdChangeMsg}</h2>
            <button
              onClick={handleLogoutAndRedirect}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-400"
            >
              Login again.
            </button>
          </div>
        </div>
      )}
      <BackButton />
      {successMessage && (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          className="fixed inset-0 flex justify-center items-center z-60"
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
        <div className="h-172 w-120 border-2 border-gray-400 rounded-xl shadow-xl flex flex-col  items-center gap-2">
          <img src={LogoBlack} alt="logoblack" className="h-20 my-5" />
          <form
            onSubmit={handleSaveInfo}
            className="flex justify-center flex-col gap-6 w-3/4 h-60"
          >
            <h2 className="text-xl font-semibold">Change Info :</h2>
            <div className="flex justify-center items-center gap-5">
              <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
                <FaUser />
                <input
                  type="text"
                  placeholder="First Name:"
                  className="bg-transparent outline-none w-full"
                  name="fName"
                  onChange={handleFNameChange}
                  value={fName}
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
                  value={lName}
                />
              </div>
            </div>
            <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
              <MdEmail />
              <input
                type="email"
                placeholder="Email:"
                className="bg-transparent outline-none w-full"
                name="email"
                onChange={handleEmailChange}
                disabled
                value={email}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-1/3 px-4 py-2 text-2xl font-bold border-2 border-teal-600 rounded-xl hover:cursor-pointer hover:bg-teal-600 hover:text-white transition-colors duration-300"
              >
                Save
              </button>
            </div>
          </form>
          <hr />
          <form
            onSubmit={handelSavePassword}
            className="w-3/4 h-60 flex flex-col gap-3"
          >
            <h2 className="text-xl font-semibold">Change Password :</h2>
            <div className="flex items-center border-2 rounded-full px-4 py-2 gap-1">
              <RiLockPasswordFill />
              <input
                type="password"
                placeholder="Old Password:"
                className="bg-transparent outline-none w-full"
                name="password"
                onChange={handleOldPasswordChange}
                value={oldPassword}
              />
            </div>
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
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-1/3 px-4 py-2 text-2xl font-bold border-2 border-teal-600 rounded-xl hover:cursor-pointer hover:bg-teal-600 hover:text-white transition-colors duration-300"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
