import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordNew from "./components/ResetPasswordNew";
import TaskIndex from "./components/TaskIndex";
import Profile from "./components/Profile";
import { useAuthStore } from "./store";
import AuthService from "./services/auth.service";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const setCurrentUser = () => {
    useAuthStore.setState({ currentUser: AuthService.getCurrentUser() });
  };
  useEffect(() => {
    setCurrentUser();
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/reset" element={<ResetPassword />}></Route>
        <Route
          path="/reset-password/:_id/:token"
          element={<ResetPasswordNew />}
        ></Route>
        <Route path="/index" element={<TaskIndex />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
