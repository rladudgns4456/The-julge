import axios from "axios";

const instance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/0-1/the-julge",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
