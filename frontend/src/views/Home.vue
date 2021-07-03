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
    // const userAPI = `api/account/me/user`;
    const userAPI = 'api/account/me/31';
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
