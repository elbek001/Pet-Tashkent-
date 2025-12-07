import axios from "axios";

const API = axios.create({
  baseURL: "https://pharmacy-kwc9.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
});

export default API;
