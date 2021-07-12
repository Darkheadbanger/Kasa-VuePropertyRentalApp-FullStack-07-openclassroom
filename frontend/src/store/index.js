import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import axios from "axios";
let ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    user: null, //!localStorage.getItem("userToken")
  },
  getters: {
    user: (state) => {
      // Get current value of the user, which in this case user is null
      return state.user;
    },
  },
  actions: {
    login({ commit }, user) {
      const loginAPI = "api/auth/login";
      return new Promise((resolve, reject) => {
        axios
          .post(loginAPI, {
            email: user.email,
            password: user.password,
          })
          .then((response) => {
            localStorage.setItem("userToken", response.data.token);
            commit("user", response.data.user);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
  },
  plugins: [
    createPersistedState({
      // key: "keyname",
      // paths: window.localStorage,
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.removeAll(key),
      expires: 1, // 24 heures
    }),
  ],
  mutations: {
    // This is state.user is equal to actions,
    user(state, user) {
      state.user = user; //foncitonne
    },
  },
});
