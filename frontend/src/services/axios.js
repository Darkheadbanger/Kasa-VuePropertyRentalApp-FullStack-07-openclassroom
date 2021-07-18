import axios from "axios";
//refactoring, chaque request url 'API va passer par ce URL prefix automatiquement car on le mets en global dans main.js
axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;
const token = localStorage.getItem("userToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = {
    "x-access-token": token,
  };
}
