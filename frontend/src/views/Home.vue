<template>
  <div>
    <h3 v-if="user">Token</h3>
    <h3 v-else>Logout</h3>
    <h4 v-if="user">Hi,; {{ user.fistName }} {{ user.lastName }}</h4>
    <button href="javascript:void(0)" @click="logOutClick" class="link">
      Logout
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//  getting the current user via the state by mapGetters
export default {
  name: "Home",
  methods: {
    logOutClick() {
      localStorage.removeItem("userToken");
      //  we need to dispatch this user to null
      this.$store.dispatch("user", null);
      this.$router.push("/login");
    },
  },
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
  },
};
</script>
