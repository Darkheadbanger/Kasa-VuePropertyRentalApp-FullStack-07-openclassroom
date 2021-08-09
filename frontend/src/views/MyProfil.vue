<template>
  <div>
    <Nav></Nav>
    <!-- <Home></Home> bg -->
    <div class="container">
      <div class="profile-page tx-13">
        <Header></Header>
        <div class="profile-body d-flex flex-column flex-md-row justify-content-center">
          <!-- left wrapper start -->
          <ProfileInformation></ProfileInformation>
          <!-- left wrapper end -->
          <!-- middle wrapper start -->
          <div class="col-xl-6 row-cols middle-wrapper">
            <PostWrite></PostWrite>
            <div class="row mt-4 mt-md-4 mt-lg-0">
              <div class="col-md-12">
                <div class="card rounded">
                  <div v-for="myPost in posts" :key="myPost.id">
                    <Post :post="myPost"></Post>
                  </div>
                </div>
              </div>
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
import ProfileInformation from "../components/profileInformation.vue";

// import axios from "axios";

export default {
  name: "MyProfil",
  components: {
    Nav,
    Header,
    Post,
    PostWrite,
    ProfileInformation,
  },

  data() {
    return {
      myPosts: "",
      users: "",
    };
  },
  mounted() {
    const dynamicId = this.user.id;
    this.$store.dispatch("getAllMyPost", dynamicId);
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
    ...mapGetters(["user", "posts"]),
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: #f9fafb;
  margin-top: 20px;
}
</style>