// Pour definir l'autorisation de chaque utilisateur
import axios from "axios";
import authHeader from "./auth-header";

const myAPI = "http://localhost:3000/api";

class userRoles {
  getPublicContent() {
    return axios.get(myAPI + "admin"); // Non admin car il' ny a pas de authHeder
  }

  getAdminContent() {
    return axios.get(myAPI + "admin", {
      headers: authHeader,
    });
  }
}
