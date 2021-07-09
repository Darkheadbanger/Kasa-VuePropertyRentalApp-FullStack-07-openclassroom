<template>
  <div>
    <nav></nav>
    <router-view />
    <!--custom directives to home-->
  </div>
</template>

<script lang="ts">
import axios from "axios";
// import Home from "./views/Home.vue";

export default {
  name: "App",

  created() {
    // let routeid = this.$route.params.user;
    const userAPI = `user`; //:id ? => il faut faire get id dynamiquement
    axios
      .get(userAPI)
      .then((response) => {
        // this.user = response.data;
        // dispatch against user
        this.$store.dispatch("user", response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
