<template>
  <div>
    <Nav></Nav>
    <!-- <Home></Home> bg -->
    <div class="container">
      <div class="profile-page tx-13">
        <Header></Header>
        <div class="row profile-body d-flex flex-row justify-content-center">
          <!-- left wrapper start -->
          <Profile></Profile>
          <!-- left wrapper end -->
          <!-- middle wrapper start -->
          <div class="col-xl-6 middle-wrapper">
            <PostWrite></PostWrite>
            <div v-for="myPost in myPosts" :key="myPost.id">
              <Post :post="myPost"></Post>
            </div>
          </div>
          <!-- middle wrapper end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//  getting the current user via the state by mapGetters
import Nav from "../components/Nav.vue";
import Header from "../components/Header.vue";
import Post from "../components/Post.vue";
import PostWrite from "../components/PostWrite.vue";
import Profile from "../components/profileInformation.vue";
import axios from "axios";

export default {
  name: "MyProfil",
  components: {
    Nav,
    Header,
    Post,
    PostWrite,
    Profile,
  },

  data() {
    return {
      myPosts: "",
    };
  },
  created() {
    const userIdDynamic = this.user.id;
    const getAllMyPost = `api/post/${userIdDynamic}`;
    axios
      .get(getAllMyPost)
      .then((response) => {
        console.log(response);
        this.myPosts = response.data.myPost;
        console.log(this.myPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // Logique pour pouvoir aller vers la page update si on clique update
  methods: {
    toUpdate() {
      this.$router.push({ name: "Update" });
    },
  },

  // Logique pour récuperer les datas depuis la base de données MySQL
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: #f9fafb;
  margin-top: 20px;
}
</style>