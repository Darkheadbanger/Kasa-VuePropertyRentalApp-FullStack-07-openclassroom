import { createStore } from "vuex";

const state = {
  user: null,
};
export default createStore({
  state,
  getters: {
    user: (state) => {
      // Get current value of the user, which in this case user is null
      return state.user;
    },
  },
  actions: {
    user(context, user) {
      // "user" method is a user from mutations, the variable is user
      // context.commit is for trigger the mutations
      context.commit("user", user);
    },
  },
  mutations: {
    // This is state.user is equal to actions,
    user(state, user) {
      state.user = user;
    },
  },
});
