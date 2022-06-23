import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
