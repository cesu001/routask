import axios from "axios";
import { type AddTaskProps } from "../../types";
const API_URL = import.meta.env.VITE_API_URL;

class TaskService {
  fetchCalendarData(_id: string) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.get(`${API_URL}/task` + `/calendar/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
  addCalendar(title: string) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.post(
      `${API_URL}/task` + "/calendar",
      {
        title,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
  }
  editCalendar(_id: string, editCTitle: string) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.put(
      `${API_URL}/task` + `/calendar/edit/${_id}`,
      {
        title: editCTitle,
      },
      { headers: { Authorization: token } },
    );
  }
  deleteCalendar(_id: string) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.delete(`${API_URL}/task` + `/calendar/delete/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
  fetchTasks() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.get(`${API_URL}/task` + "/fetch", {
      headers: {
        Authorization: token,
      },
    });
  }
  addTask({
    title,
    calendar,
    priority,
    progress,
    date,
    cycle,
    cycleInterval,
    location,
    notes,
  }: AddTaskProps) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.post(
      `${API_URL}/task` + "/add",
      {
        title,
        calendar,
        priority,
        progress,
        date,
        cycle,
        cycleInterval,
        location,
        notes,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
  }
  editTask({
    _id,
    title,
    calendar,
    priority,
    progress,
    date,
    cycle,
    cycleInterval,
    location,
    notes,
  }: AddTaskProps & { _id: string }) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.put(
      `${API_URL}/task` + `/edit/${_id}`,
      {
        title,
        calendar,
        priority,
        progress,
        date,
        cycle,
        cycleInterval,
        location,
        notes,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
  }
  archiveTask(_id: string) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.put(
      `${API_URL}/task` + `/archive/${_id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    );
  }
  deleteTask(_id: string) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.delete(`${API_URL}/task` + `/delete/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new TaskService();
