import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import axios from "axios";
let ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    user: null, //!localStorage.getItem("userToken")
    post: null,
  },
  getters: {
    user: (state) => {
      // Get current value of the user, which in this case user is null
      return state.user;
    },
    post: (state) => {
      //  get current value of the post
      return state.post;
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

    signup({ commit }, user) {
      const signUpAPI = "api/auth/signup";
      return new Promise((resolve, reject) => {
        axios
          .post(signUpAPI, {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            password: user.password,
          })
          .then((response) => {
            commit("user", response.data.accessToken);
            // commit ('user', response.data.user)
            console.log("response", response);

            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    // createPost({ commit }, post){
    //   console.log("submitFile");
    //   let formData = new FormData();
    //   formData.append("image", this.image);
    //   formData.append("postContent", this.postContent);
    //   console.log("formData", formData);
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .post("/api/post", formData)
    //       .then((response) => {
    //         console.log(response);
    //         resolve(response);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         reject(error);
    //       });
    //   });
    // },

    // created() {
    //   const getAllPost = "api/post";
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get(getAllPost)
    //       .then((response) => {
    //         console.log(response);
    //         this.posts = response.data.post;
    //         console.log(this.posts);
    //         resolve(response);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         reject(error);
    //       });
    //   });
    // },
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
    post(state, post) {
      state.post = post;
    },
  },
});
