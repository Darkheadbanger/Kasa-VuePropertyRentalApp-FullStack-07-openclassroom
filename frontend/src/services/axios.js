import axios from "axios";
import router from '../router/index'
//refactoring, chaque request url 'API va passer par ce URL prefix automatiquement car on le mets en global dans main.js

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;
let token = localStorage.getItem("userToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("error 401");
      localStorage.clear("userToken");
      //  we need to dispatch this user to null
      // this.$store.dispatch("user", null);
      router.push({ name: "Login" });
      
      //place your reentry code
    }
    return error;
  }
);
