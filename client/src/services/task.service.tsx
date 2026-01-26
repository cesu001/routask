import axios from "axios";
const API_URL = "http://localhost:8080/api/task";
import { type AddTaskProps } from "../../types";

class TaskService {
  fetchCalendarData(_id: string) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.get(API_URL + `/calendar/${_id}`, {
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
      API_URL + "/calendar",
      {
        title,
      },
      {
        headers: {
          Authorization: token,
        },
      }
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
      API_URL + `/calendar/edit/${_id}`,
      {
        title: editCTitle,
      },
      { headers: { Authorization: token } }
    );
  }
  deleteCalendar(_id: string) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + `/calendar/delete/${_id}`, {
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
    return axios.get(API_URL + "/fetch", {
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
      API_URL + "/add",
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
      }
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
      API_URL + `/edit/${_id}`,
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
      }
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
      API_URL + `/archive/${_id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  deleteTask(_id: string) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user") || "null").token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + `/delete/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new TaskService();
