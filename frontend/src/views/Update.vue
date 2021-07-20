<template>
  <div>
    <Nav></Nav>
    <!-- <Home></Home> bg -->
    <div class="container">
      <div class="profile-page tx-13">
        <Header></Header>
        <div
          class="row profile-body d-flex flex-row justify-content-center ms-5"
        >
          <!-- Pour mettre de publication -->
          <!-- middle wrapper start -->
          <div class="col-xl-6 middle-wrapper">
            <div class="row mt-2 mt-md-2 mt-lg-0">
              <div class="col-md-12">
                <div class="card rounded">
                  <div class="card-header">
                    <div class="d-flex flex-column justify-content-start">
                      <div class="d-flex justify-content-start border-bottom">
                        <div class="ml-2 d-flex me-3">
                          <span class="mt-3 mb-3"
                            >Paramètres généraux du compte</span
                          >
                        </div>
                      </div>
                      <div
                        class="
                          d-flex
                          justify-content-between
                          border-bottom
                          edit-row edit-row--transition
                        "
                      >
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">Prénom:</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">{{ user.firstName }}</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <div class="col-sm-6 col-md-9 mt-2">
                            <input
                              class="form-control mr-sm-2 bg-light"
                              type="text"
                              placeholder="Edit"
                              aria-label="Edit"
                              id="searchText"
                            />
                          </div>
                        </div>
                        <div class="mt-2">
                          <button
                            class="
                              btn btn-primary btn-icon-text btn-edit-profile
                            "
                            @click="updateFirstName"
                          >
                            <font-awesome-icon :icon="['fas', 'edit']" />
                            Edit
                          </button>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between border-bottom">
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">Nom:</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">{{ user.lastName }}</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <div class="ml-2 d-flex">
                            <div class="col-sm-6 col-md-9 mt-2">
                              <input
                                class="form-control mr-sm-2 bg-light"
                                type="text"
                                placeholder="Edit"
                                aria-label="Edit"
                                id="searchText"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="mt-2">
                          <button
                            class="
                              btn btn-primary btn-icon-text btn-edit-profile
                            "
                            @click="updateFirstName"
                          >
                            <font-awesome-icon :icon="['fas', 'edit']" />
                            Edit
                          </button>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between border-bottom">
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">Pseudeo:</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">{{ user.userName }}</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <div class="ml-2 d-flex">
                            <div class="col-sm-6 col-md-9 mt-2">
                              <input
                                class="form-control mr-sm-2 bg-light"
                                type="text"
                                placeholder="Edit"
                                aria-label="Edit"
                                id="searchText"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="mt-2">
                          <button
                            class="
                              btn btn-primary btn-icon-text btn-edit-profile
                            "
                            @click="updateFirstName"
                          >
                            <font-awesome-icon :icon="['fas', 'edit']" />
                            Edit
                          </button>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between border-bottom">
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">Email:</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">{{ user.email }}</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <div class="ml-2 d-flex">
                            <div class="col-sm-6 col-md-9 mt-2">
                              <input
                                class="form-control mr-sm-2 bg-light"
                                type="text"
                                placeholder="Edit"
                                aria-label="Edit"
                                id="searchText"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="mt-2">
                          <button
                            class="
                              btn btn-primary btn-icon-text btn-edit-profile
                            "
                            @click="updateFirstName"
                          >
                            <font-awesome-icon :icon="['fas', 'edit']" />
                            Edit
                          </button>
                        </div>
                      </div>
                      <div class="mt-2 mb-2">
                        <button
                          class="
                            btn btn-danger btn-icon-text btn-edit-profile
                            d-flex
                            justify-content-center
                          "
                          @click="delteUser"
                        >
                          Supprimer compte
                        </button>
                      </div>

                      <!-- <div class="d-flex justify-content-between border-bottom">
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">Admin :</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">{{ user.isZdmin }}</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <input
                            class="form-check-input mt-0"
                            type="checkbox"
                            value=""
                            aria-label="Checkbox for following text input"
                          />
                        </div>
                      </div> -->
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