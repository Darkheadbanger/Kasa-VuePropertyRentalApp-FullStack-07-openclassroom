import authentification from "../services/auth.service";
// Je recupère le localStorage de la connexion user
const user = JSON.parse(localStorage.getItem("user"));

// Le state initial sont sois en etat de connexion (loggedIN: true) sois pas connectée (loggedIN: false)
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };
export const auth = {
  // Namespaced true pour annuler le 'global' donc eviter que de multiples modules travailles dans le même modules
  namespaced: true,
  state: initialState,
  action: {
    async signin({ commit }, user) {
      try {
        await authentification.signin(user);
        commit("ConnexionReussit", user);
        return await Promise.resolve(user);
      } catch (error) {
        commit("ConnexionEchouee");
        return await Promise.reject(error);
      }
    },
    logout({ commit }) {
      authentification.logout();
      commit("LogoutReussit");
      return Promise.reject(error, JSON({ error: "L'inscription à échouée" }));
    },
    async register({ commit }, user) {
      try {
        const response = await authentification.register(user);
        commit("InscriptionReussit !");
        return await Promise.resolve(response.data);
      } catch (error) {
        commit("InscriptionEchouee!");
        return await Promise.reject(
          error,
          JSON({ error: "L'inscription échouée" })
        );
      }
    },
  },
  Mutations: {
    ConnexionReussit(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    ConnexionEchouee(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    LogoutReussit(state, user) {
      state.status.loggedIn = false;
      state.user = user.null;
    },
    InscriptionReussit(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    InscriptionEchouee(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
  },
};