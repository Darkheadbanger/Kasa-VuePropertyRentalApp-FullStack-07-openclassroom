import axios from "axios";
// import Vue from "vue";
//refactoring, chaque request url 'API va passer par ce URL prefix automatiquement car on le mets en global dans main.js

// export default () => {
//   // let headers = {
//   //   "cache-control": "no-cache",
//   // };
//   let token = localStorage.getItem("userToken");
//   if (token && token !== "") {
//     axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//   }

//   const instance = axios.create({
//     baseURL: "http://localhost:3000/",
//     // headers,
//   });

//   instance.interceptors.response.use(
//     (response) => {
//       if (response.status === 401) {
//         alert("Vous n'êtes pas autorisé");
//       }
//       return response;
//     },
//     (error) => {
//       if (error.response && error.response.data) {
//         // ajouter code
//         return Promise.reject(error.message);
//       }
//     }
//   );
//   return instance;
// };

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;
let token = localStorage.getItem("userToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
