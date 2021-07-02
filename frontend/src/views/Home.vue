<template>
  <div>
    <h3 v-if="userProfil">
      Vue Home, {{ userProfil.firstName }}, {{ userProfil.lastName }}
    </h3>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      userProfil: null,
    };
  },
  components: {},
  created() {
    //recuperer le token d'user connecter
    // ${dynamicId}
    const dynamicId = this.$route.data.params.userId
    const userProfilAPI =`api/account/me/${dynamicId}`;
    axios
      .get(userProfilAPI)
      .then((response) => {
        this.userProfil = response.data.userId;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
