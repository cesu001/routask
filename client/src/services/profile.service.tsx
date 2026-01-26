import axios from "axios";
const API_URL = "http://localhost:8080/api/profile";

type UpdateUserProps = {
  _id: string;
  fName: string;
  lName: string;
};

type ChangePasswordProps = {
  _id: string;
  oldPassword: string;
  newPassword: string;
};

class ProfileService {
  fetchUserData(_id: string) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.get(API_URL + `/info/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
  updateUserData({ _id, fName, lName }: UpdateUserProps) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.put(
      API_URL + `/info/${_id}`,
      {
        fName,
        lName,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  changePassword({ _id, oldPassword, newPassword }: ChangePasswordProps) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.put(
      API_URL + `/password/${_id}`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}
export default new ProfileService();
