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
            <div class="card rounded mb-5">
              <div class="card-header">
                <div class="d-flex">
                  <div
                    class="
                      input-group input-group-sm
                      mb-3
                      mt-3
                      d-flex
                      flex-row
                      justify-content-start
                    "
                  >
                    <img
                      class="rounded-circle img-xs"
                      src="../assets/icon-above-font.png"
                      alt=""
                    />

                    <div class="col-sm-5 col-md-8">
                      <input
                        class="form-control mr-sm-2 bg-light"
                        type="text"
                        placeholder="Publier ici..."
                        aria-label="publication"
                        id="publication"
                      />
                    </div>
                    <font-awesome-icon
                      class="ms-1"
                      :icon="['fas', 'image']"
                      size="2x"
                      for="imageFile"
                    />
                    <div>
                      <button
                        class="btn btn-primary btn-icon-text btn-edit-profile"
                        @click="toUpdate"
                      >
                        Publier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-4 mt-md-4 mt-lg-0">
              <div class="col-md-12">
                <div class="card rounded">
                  <div class="card-header">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <img
                          class="rounded-circle profile-pic"
                          src="../assets/icon-above-font.png"
                          alt=""
                        />
                        <div class="ml-2 d-flex flex-column me-3">
                          <span class="mt-5">Mike Popescu</span>
                          <span
                            class="
                              tx-11
                              text-muted
                              mb-5
                              d-flex
                              justify-content-start
                            "
                            >1 min ago</span
                          >
                        </div>
                      </div>
                      <div class="btn-group">
                        <button
                          class="btn btn-light dropdown-toggle me-5"
                          type="button"
                          id="defaultDropdown"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="true"
                          aria-expanded="false"
                        ></button>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="defaultDropdown"
                        >
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
                              Supprimer post</router-link
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <p class="mb-3 tx-14 ms-3">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Accusamus minima delectus nemo unde quae recusandae
                      assumenda.
                    </p>
                    <img
                      class="img-fluid d-flex"
                      src="../assets/groupomania.png"
                      alt=""
                    />
                  </div>
                  <div class="card-footer">
                    <div class="d-flex post-actions">
                      <label
                        class="
                          d-flex
                          align-items-center
                          text-muted
                          me-4
                          ms-4
                          text-decoration-none
                        "
                      >
                        <font-awesome-icon
                          class="mb-1 me-2"
                          :icon="['fas', 'thumbs-up']"
                        />
                        Like
                      </label>
                      <label
                        class="
                          d-flex
                          align-items-center
                          text-muted
                          me-4
                          text-decoration-none
                        "
                        for="commentText"
                      >
                        <font-awesome-icon
                          class="mb-1 me-2"
                          :icon="['fas', 'comment']"
                        />
                        Comment
                      </label>
                    </div>
                    <div
                      class="
                        input-group input-group-sm
                        mb-1
                        mt-3
                        d-flex
                        flex-row
                        justify-content-start
                        border-bottom border-light border-2
                      "
                    >
                      <img
                        class="rounded-circle img-xs"
                        src="../assets/icon-above-font.png"
                        alt=""
                      />

                      <div class="col-sm-6 col-md-9">
                        <input
                          class="form-control mr-sm-2 bg-light"
                          type="text"
                          placeholder="Commenter..."
                          aria-label="Commenter"
                          id="commentText"
                        />
                      </div>
                      <font-awesome-icon
                        class="ms-1"
                        :icon="['fas', 'image']"
                        size="2x"
                      />
                    </div>
                    <!-- Comment  -->
                    <div
                      class="
                        input-group input-group-sm
                        mb-3
                        mt-3
                        d-inline-flex
                        flex-row
                        justify-content-start
                      "
                    >
                      <img
                        class="rounded-circle img-fluid s-image"
                        src="../assets/icon-above-font.png"
                        alt=""
                      />
                      <div class="ms-2 mt-2 rounded bg-light rounded-3">
                        <div class="d-flex flex-column">
                          <div class="ms-perso-2 ms-2 mt-2">
                            <router-link
                              :to="{ name: 'Home' }"
                              class="
                                text-decoration-none
                                me-1
                                text-dark
                                float-start
                              "
                            >
                              <span class="fw-bold">
                                {{ user.firstName }} {{ user.lastName }}
                              </span>
                            </router-link>
                          </div>
                          <div>
                            <span>
                              <div class="me-perso float-start">
                                dwssssssssdddddddddddddddddddddddddddd
                              </div>
                              <div class="w-50 float-start">
                                <img
                                  class="img-fluid d-flex w-50"
                                  src=""
                                  alt=""
                                />
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="btn-group ml-auto p-2 button-right">
                        <button
                          class="btn dropdown-toggle me-5"
                          type="button"
                          id="defaultDropdown"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="true"
                          aria-expanded="false"
                        ></button>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="defaultDropdown"
                        >
                          <li>
                            <router-link class="dropdown-item" :to="{name: 'EditPost'}">
                              <font-awesome-icon :icon="['fas', 'edit']" />
                              Edit commentaire</router-link
                            >
                          </li>
                          <li>
                            <router-link class="dropdown-item" :to="{name: 'deletePost'}">
                              <font-awesome-icon :icon="['fas', 'trash-alt']" />
                              Supprimer commentaire</router-link
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
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

export default {
  name: "Home",
  components: {
    Nav,
    Header,
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

.profile-body {
  div {
    padding-left: 3px;
    padding-right: 3px;
  }
  .profile-pic {
    width: 6rem;
    height: auto;
  }
  p {
    text-align: left;
    padding: 0 0 0 0;
  }
  label {
    margin-right: 5rem;
  }
  .img-xs {
    width: 3rem;
    height: auto;
  }
  .s-image {
    width: 3rem;
    height: 3rem;
  }
}

// card footer

.card-header {
  padding: 0 0 0 0;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0);
}

.card-footer {
  background-color: white;
  border-top: 1px solid #f2f4f9;
  li {
    a {
      color: #000;
      transition: all 0.2s ease;
    }

    &:hover,
    &.active,
    &:hover a,
    &.active a {
      text-decoration: underline;
    }
  }
  .me-perso {
    margin-right: 4rem !important;
  }
  .ms-perso-2 {
    margin-left: 0.15rem !important;
  }
}

.card {
  box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
}
</style>