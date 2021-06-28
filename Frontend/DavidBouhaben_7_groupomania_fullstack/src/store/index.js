import { Vuex } from "vuex";
import { auth } from "./auth.module";

const store = Vuex({
  modules: {
    auth,
  },
});

export default store;