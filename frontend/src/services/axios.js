import axios from "axios";
import router from '../router/index'

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;
let token = localStorage.getItem("userToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  
    // Source d'erreur
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
    }
    return Promise.reject(error);
  }
);
}



