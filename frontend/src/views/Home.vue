<template>
  <div>
    <Nav></Nav>
    <!-- <Home></Home> bg -->
    <div class="container">
      <div class="profile-page tx-13">
        <Header></Header>
        <div class="row profile-body d-flex flex-row justify-content-center">
          <!-- Pour mettre de publication -->
          <!-- middle wrapper start -->
          <div class="col-xl-6 middle-wrapper">
            <PostWrite></PostWrite>
            <div class="row mt-4 mt-md-4 mt-lg-0">
              <div class="col-md-12">
                <div class="card rounded">
                  <div v-for="post in posts" :key="post.id">
                    <Post :post="post"></Post>
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
import Nav from "../components/Nav.vue";
import Header from "../components/Header.vue";
import Post from "../components/Post.vue";
import PostWrite from "../components/PostWrite.vue";

export default {
  name: "Home",
  components: {
    Nav,
    Header,
    Post,
    PostWrite,
  },
  data() {
    return {
      posts: [],
    };
  },

  created() {
    this.$store
      .dispatch("getAllPost")
      .then((response) => {
        this.posts = response.data.post;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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