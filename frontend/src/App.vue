<template>
  <div><router-view :user="user" /><!--custom directives to home--></div>
</template>

<script lang="ts">
import axios from "axios";
// import Home from "./views/Home.vue";

export default {
  name: "App",
  components: {},
  data() {
    return {
      user: "",
    };
  },
  created() {
    // let routeid = this.$route.params.user;
    const userAPI = `api/account/me/`; //:id ? => il faut faire get id dynamiquement
    axios
      .get(userAPI)
      .then((response) => {
        this.user = response.data;
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
