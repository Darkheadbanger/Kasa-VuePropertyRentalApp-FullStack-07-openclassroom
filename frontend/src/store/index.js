import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
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
    user({ commit }, user) {
      // localStorage("userToken");
      // "user" method is a user from mutations, the variable is user
      // context.commit is for trigger the mutations
      commit("user", user);
    },
  },
  plugins: [
    createPersistedState({
      key: "keyname",
      paths: window.localStorage,
    }),
  ],
  mutations: {
    // This is state.user is equal to actions,
    user(state, user) {
      state.user = user; //foncitonne
    },
  },
});
