import axios from "axios";
import type {
  FetchResetPwdProps,
  LoginData,
  RegisterData,
  ResetPwdProps,
} from "../../types";
const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  login({ email, password }: LoginData) {
    return axios.post(`${API_URL}/user` + "/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register({ fName, lName, email, password }: RegisterData) {
    return axios.post(`${API_URL}/user` + "/register", {
      fName,
      lName,
      email,
      password,
    });
  }
  forgotPassword(email: string) {
    return axios.post(`${API_URL}/user` + "/forgot-password", {
      email,
    });
  }
  fetchResetPwd({ _id, token }: FetchResetPwdProps) {
    return axios.get(`${API_URL}/user` + `/reset-password/${_id}/${token}`);
  }
  resetPassword({ _id, token, newPassword }: ResetPwdProps) {
    return axios.put(`${API_URL}/user` + `/reset-password/${_id}/${token}`, {
      newPassword,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || "null");
  }
}
export default new AuthService();
