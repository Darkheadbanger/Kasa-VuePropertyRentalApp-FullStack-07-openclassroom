<template>
  <div>
    <h3>Hello</h3>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  created() {
    let routeid = this.$route.params.user;
    const userAPI = `api/account/me/${routeid}`; //:id ? => il faut faire get id dynamiquement
    axios
      .get(userAPI)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
