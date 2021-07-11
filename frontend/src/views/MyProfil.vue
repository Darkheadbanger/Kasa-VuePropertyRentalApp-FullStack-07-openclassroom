<template>
  <div class="myProfil">
    <Nav></Nav>
    <MyProfil></MyProfil>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
export default {
  name: "myProfil",
  component: {
    Nav,
  },
};
</script>