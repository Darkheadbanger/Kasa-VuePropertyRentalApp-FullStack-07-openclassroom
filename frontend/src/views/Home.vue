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
export default {
  name: "Home",
  props: ["user"],
  methods: {
    logOutClick() {
      localStorage.removeItem("userToken");
      this.$router.push("/login");
    },
  }, 
};
</script>
