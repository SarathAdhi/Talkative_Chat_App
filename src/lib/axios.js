import axios from "axios";

const Axios = axios.create({
  baseURL: "https://talkative-chat-app.vercel.app/api",
  // baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
