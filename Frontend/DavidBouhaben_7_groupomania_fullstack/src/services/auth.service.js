import axios from "axios";
//recuperation de l'API backend
const myAPI = "http://localhost:3000/api/auth/";

// la classe authentification qui permet de recuperer email, password, username etc et traduire de la valeur javascript en json pou pouvoir créer un compte et se connecter mais aussi de se deconnecter
class authentification {
  async signin(userToken) {
    const response = await axios.post(myAPI + "login", {
      email: userToken.email,
      password: userToken.password,
    });
    // on recupère l'api recupéré avec axios pour dire que si la réponse est bon (bien récupéré), alors on le stocke dans le localstorage avec un nom user et le traduire en JSON si non, on le retourne
    if (response.data.accessToken) {
      localStorage.setItem("userToken", JSON.stringify(response.data));
    } else {
      return response.data;
    }
  }
  //On supprime l'api nommé user stocké dans le localstorage
  logout() {
    localStorage.removeItem("user");
  }
  //Pour s'inscrire. On prend user comme argument, ensuite on recupère l'api avec axios avec le nom signup
  register(user) {
    return axios.post(myAPI + "signup", {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.lastName,
      email: user.email,
    });
  }
}
export default new authentification();