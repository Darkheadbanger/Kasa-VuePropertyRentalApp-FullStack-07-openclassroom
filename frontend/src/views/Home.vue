<template>
  <div>
    <Nav></Nav>
    <!-- <Home></Home> -->
    <div class="container">
      <div class="profile-page tx-13">
        <div class="row">
          <div class="col-12 margin-bottom">
            <div class="profile-header">
              <div class="cover d-flex justify-content-between">
                <div class="grey-shade"></div>
                <figure>
                  <img
                    src="../assets/bg1.jpg"
                    class="img-fluid img-bg"
                    alt="background profil"
                  />
                </figure>
                <div
                  class="
                    cover-body
                    d-flex
                    justify-content-between
                    align-items-end
                  "
                >
                  <div>
                    <img
                      src="../assets/icon-above-font.png"
                      alt="profile picture"
                      class="img-fluid img rounded-circle"
                    />
                    <span class="profile-name"
                      >{{ user.firstName }} {{ user.lastName }}</span
                    >
                  </div>
                  <div class="d-none d-md-block">
                    <button
                      class="btn btn-primary btn-icon-text btn-edit-profile"
                    >
                      Edit profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 v-if="user">Token</h3>
    <h3 v-else>Logout</h3>
    <h4 v-if="user">Hi,; {{ user.fistName }} {{ user.lastName }}</h4>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//  getting the current user via the state by mapGetters
import Nav from "../components/Nav.vue";
// import Home from "../components/homePost.vue";

export default {
  name: "Home",
  components: {
    Nav,
    // Home,
  },
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
  },
};
</script>

<style lang="scss" scoped>
body {
  .margin-bottom {
    margin-bottom: 2rem;
  }
  .profile-page {
    margin-top: 20px;
    .img {
      width: 5rem;
      height: auto;
    }
    .cover {
      .cover-body {
        position: absolute;
        bottom: -22px;
        left: 0;
        z-index: 2;
        widows: 100%;
        padding: 0 120px;
        .btn-edit-profile {
          margin: 0 70rem;
        }
      }
      .grey-shade {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: linear-gradient(rgba(255, 255, 255, 0.1), #fff 99%);
        .img-bg {
          width: 0%;
        }
      }
      .profile-name {
        font-family: "Times New Roman", Times, serif;
        font-size: 20px;
        font-weight: bold;
        margin-left: 17px;
      }
    }
  }
}
</style>