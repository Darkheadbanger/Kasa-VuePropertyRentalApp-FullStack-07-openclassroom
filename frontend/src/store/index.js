import { createStore } from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";

Vue.useContext(Vuex);

export default new createStore({
  modules: {
    auth,
  },
  plugins: [createPersistedState],
});
