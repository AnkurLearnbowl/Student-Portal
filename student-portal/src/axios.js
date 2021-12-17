import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "http://3.138.207.90:3000",
});

export default instance;
