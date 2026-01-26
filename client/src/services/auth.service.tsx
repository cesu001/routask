import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

type LoginProps = {
  email: string;
  password: string;
};

type RegisterProps = { fName: string; lName: string } & LoginProps;

type FetchResetPwdProps = { _id: string; token: string };

type ResetPasswordProps = { newPassword: string } & FetchResetPwdProps;

class AuthService {
  login({ email, password }: LoginProps) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register({ fName, lName, email, password }: RegisterProps) {
    return axios.post(API_URL + "/register", {
      fName,
      lName,
      email,
      password,
    });
  }
  forgotPassword(email: string) {
    return axios.post(API_URL + "/forgot-password", {
      email,
    });
  }
  fetchResetPwd({ _id, token }: FetchResetPwdProps) {
    return axios.get(API_URL + `/reset-password/${_id}/${token}`);
  }
  resetPassword({ _id, token, newPassword }: ResetPasswordProps) {
    return axios.put(API_URL + `/reset-password/${_id}/${token}`, {
      newPassword,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || "null");
  }
}

export default new AuthService();
