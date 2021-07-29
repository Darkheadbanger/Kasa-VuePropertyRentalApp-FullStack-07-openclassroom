import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import axios from "axios";
let ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    user: null, //!localStorage.getItem("userToken")
    post: null,
    posts: null,
    comment: null,
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
    posts: (state) => {
      //  get current value of the post
      return state.posts;
    },
    comment: (state) => {
      //  get current value of the comment
      return state.comment;
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
            commit("post");
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    // Impression de tous les posts
    getAllPost({ commit } /*posts*/) {
      const getAllPost = "api/post";
      return new Promise((resolve, reject) => {
        axios
          .get(getAllPost)
          .then((response) => {
            console.log(response);
            // posts.posts = response.data.post;
            commit("posts", response.data.post);
            console.log(this.posts);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    // impression de mes posts
    getAllMyPost({ commit }, posts) {
      // const userIdDynamic = posts.DynamicId;
      const getAllMyPost = `api/post/${posts.DynamicId}`;
      return new Promise((resolve, reject) => {
        axios
          .get(getAllMyPost)
          .then((response) => {
            console.log(response);
            // posts.thisMyPosts = response.data.myPost;
            commit("posts", response.data.myPost);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    deleteComment({ commit }, comment) {
      const deleteComment = `api/comment/${comment.dynamicId}`;
      return new Promise((resolve, reject) => {
        axios
          .delete(deleteComment)
          .then((response) => {
            console.log(response);
            commit("comment");
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    deletePost({ commit }, post) {
      const deletePost = `api/post/${post.dynamicId}`;
      return new Promise((resolve, reject) => {
        axios
          .delete(deletePost)
          .then((response) => {
            console.log(response);
            commit("deletePost");
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    createComment({ commit }, comment) {
      console.log("this.comment");
      let formData = new FormData();
      formData.append("image", comment.image);
      formData.append("comment", comment.commentaire);
      console.log("formData", formData);
      const createComment = `api/comment/${comment.postId}`;
      return new Promise((resolve, reject) => {
        axios
          .post(createComment, formData)
          .then((response) => {
            console.log(response);
            commit("comment");
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
    posts(state, posts) {
      state.posts = posts;
    },
    comment(state, comment) {
      state.comment = comment;
    },
  },
});
