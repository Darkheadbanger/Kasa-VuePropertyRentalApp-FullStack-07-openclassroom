<template>
  <div>
    <Home></Home>
    <router-view />
    <!--custom directives to home-->
  </div>
</template>

<script>
import axios from "axios";
import Home from "./views/Home.vue";

export default {
  name: "App",
  component: {
    Home,
  },
  created() {
    const userAPI = `user`; //:id ? => il faut faire get id dynamiquement
    axios
      .get(userAPI)
      .then((response) => {
        this.$store.dispatch("user", response.data);
        console.log(response);
      })
      .catch(() => {
        // console.log(error);
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
