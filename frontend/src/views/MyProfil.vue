<template>
  <div>
    <Nav></Nav>
    <!-- <Home></Home> bg -->
    <div class="container">
      <div class="profile-page tx-13">
        <Header></Header>
        <div class="row profile-body d-flex flex-row justify-content-center">
          <!-- left wrapper start -->
          <div class="d-none d-md-block col-md-4 me-5">
            <div class="card rounded">
              <div
                class="
                  card-body
                  d-flex
                  align-items-start
                  justify-content-start
                  flex-column
                  me-3
                  ms-3
                "
              >
                <div class="d-flex mb-2">
                  <div class="mr-auto p-2">
                    <h6 class="card-title mb-3">About</h6>
                  </div>
                  <div class="btn-group ml-auto p-2 ms-5 button-right">
                    <button
                      class="btn btn-light dropdown-toggle me-5"
                      type="button"
                      id="defaultDropdown"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="true"
                      aria-expanded="false"
                    ></button>
                    <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
                      <li>
                        <router-link
                          class="dropdown-item"
                          :to="{ name: 'EditPost' }"
                        >
                          <font-awesome-icon :icon="['fas', 'edit']" /> Edit
                          post</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          class="dropdown-item"
                          :to="{ name: 'deletePost' }"
                        >
                          <font-awesome-icon :icon="['fas', 'trash-alt']" />
                          Edit Supprimer post</router-link
                        >
                      </li>
                    </ul>
                  </div>
                </div>

                <p>
                  Hi! I'm Amiah the Senior UI Designer at Vibrant. We hope you
                  enjoy the design and quality of Social.
                </p>
                <div class="mt-3">
                  <label class="tx-11 font-weight-bold mb-0 text-uppercase"
                    >Joined:</label
                  >
                  <p class="text-muted">November 15, 2015</p>
                </div>
                <div class="mt-3">
                  <label class="tx-11 font-weight-bold mb-0 text-uppercase"
                    >Nom:</label
                  >
                  <p class="text-muted">New York, USA</p>
                </div>
                <div class="mt-3">
                  <label class="tx-11 font-weight-bold mb-0 text-uppercase"
                    >Prénom:</label
                  >
                  <p class="text-muted">me@nobleui.com</p>
                </div>
                <div class="mt-3">
                  <label class="tx-11 font-weight-bold mb-0 text-uppercase"
                    >Pseudep:</label
                  >
                  <p class="text-muted">www.nobleui.com</p>
                </div>
              </div>
            </div>
          </div>
          <!-- left wrapper end -->
          <!-- Pour mettre de publication -->
          <!-- middle wrapper start -->
          <div class="col-xl-6 middle-wrapper">
            <PostWrite></PostWrite>
            <Post></Post>
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

export default {
  name: "MyProfil",
  components: {
    Nav,
    Header,
    Post,
    PostWrite,
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