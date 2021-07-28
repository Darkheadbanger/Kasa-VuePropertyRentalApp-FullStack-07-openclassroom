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

  plugins: [
    createPersistedState({
      key: "keyname",
      paths: window.localStorage,
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.removeAll(key),
      expires: 1, // 24 heures
    }),
  ],

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
    // Creation du post
    createPost({ commit }, post) {
      console.log(post.postContent);
      let formData = new FormData();
      formData.append("image", post.image);
      formData.append("postContent", post.postContent);
      console.log("formData", formData);
      const createPost = "/api/post";
      return new Promise((resolve, reject) => {
        axios
          .post(createPost, formData)
          .then((response) => {
            console.log(response);
            commit("posts");
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    created() {
      const getAllPost = "api/post";
      return new Promise((resolve, reject) => {
        axios
          .get(getAllPost)
          .then((response) => {
            console.log(response);
            this.posts = response.data.post;
            console.log(this.posts);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
  },

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
