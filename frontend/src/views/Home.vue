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
    const userAPI = 'api/account/me/';
    axios
      .get(userAPI + 'user')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
