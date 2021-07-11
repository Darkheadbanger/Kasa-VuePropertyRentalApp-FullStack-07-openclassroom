<template>
  <!--loginSignup.scss-->
  <div id="signup">
    <SignupForm></SignupForm>
  </div>
</template>

<script>
import SignupForm from "../components/Singup.vue";

export default {
  name: "Signup",
  components: {
    SignupForm,
  },
};
</script>