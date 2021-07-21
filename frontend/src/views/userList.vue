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
            <div class="row mt-4 mt-md-4 mt-lg-0">
              <div class="col-md-xxl">
                <div class="card rounded bg-light">
                  <div class="card-header d-flex flex-row mb-4 mt-4 flex-wrap">
                    <div class="col-md-4 mb-4">
                      <div class="card user-card">
                        <div class="card-header">
                          <h5>Profile</h5>
                        </div>
                        <div class="card-block">
                          <div class="user-image">
                            <img
                              src="../assets/groupomania.png"
                              class="img-radius img-fluid width-100"
                              alt="User-Profile-Image"
                            />
                          </div>
                          <h6 class="text-center">Alessa Robert</h6>
                          <p class="text-muted text-center">
                            | Inscription date : 23.05.1992 |
                          </p>
                          <hr />
                          <p class="m-t-15 text-muted">
                            (bio) Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 d-flex flex-row">
                      <div class="card user-card">
                        <div class="card-header">
                          <h5>Profile</h5>
                        </div>
                        <div class="card-block">
                          <div class="user-image">
                            <img
                              src="../assets/groupomania.png"
                              class="img-radius img-fluid width-100"
                              alt="User-Profile-Image"
                            />
                          </div>
                          <h6 class="text-center">Alessa Robert</h6>
                          <p class="text-muted text-center">
                            | Inscription date : 23.05.1992 |
                          </p>
                          <hr />
                          <p class="m-t-15 text-muted">
                            (bio) Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 d-flex flex-row">
                      <div class="card user-card">
                        <div class="card-header">
                          <h5>Profile</h5>
                        </div>
                        <div class="card-block">
                          <div class="user-image">
                            <img
                              src="../assets/groupomania.png"
                              class="img-radius img-fluid width-100"
                              alt="User-Profile-Image"
                            />
                          </div>
                          <h6 class="text-center">Alessa Robert</h6>
                          <p class="text-muted text-center">
                            | Inscription date : 23.05.1992 |
                          </p>
                          <hr />
                          <p class="m-t-15 text-muted">
                            (bio) Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 d-flex flex-row">
                      <div class="card user-card">
                        <div class="card-header">
                          <h5>Profile</h5>
                        </div>
                        <div class="card-block">
                          <div class="user-image">
                            <img
                              src="../assets/groupomania.png"
                              class="img-radius img-fluid width-100"
                              alt="User-Profile-Image"
                            />
                          </div>
                          <h6 class="text-center">Alessa Robert</h6>
                          <p class="text-muted text-center">
                            | Inscription date : 23.05.1992 |
                          </p>
                          <hr />
                          <p class="m-t-15 text-muted">
                            (bio) Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry.
                          </p>
                        </div>
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
import Profile from "../components/profileInformation.vue";

export default {
  name: "MyProfil",
  components: {
    Nav,
    Header,
    Profile,
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
  border-bottom: 1px solid #878787;
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