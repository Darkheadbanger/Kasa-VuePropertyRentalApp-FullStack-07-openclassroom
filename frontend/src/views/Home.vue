<template>
  <div>
    <Nav></Nav>
    <h3 v-if="user">Token</h3>
    <h3 v-else>Logout</h3>
    <h4 v-if="user">Hi,; {{ user.fistName }} {{ user.lastName }}</h4>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//  getting the current user via the state by mapGetters
import Nav from "../components/Nav.vue";
export default {
  name: "Home",
  components: {
    Nav
  },
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
  },
};
</script>
