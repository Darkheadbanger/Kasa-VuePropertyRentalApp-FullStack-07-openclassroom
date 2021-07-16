<template>
  <div class="row">
    <div class="col-12 mb-4">
      <div class="profile-header">
        <div class="cover">
          <div class="gray-shade"></div>
          <figure>
            <img
              src="../assets/bg1.jpg"
              class="img-fluid"
              alt="profile cover"
            />
          </figure>
          <div
            class="
              cover-body
              d-flex
              justify-content-between
              flex-md-row flex-column
              align-items-center
            "
          >
            <div class="d-flex justify-content-between">
              <div>
                <router-link :to="{ name: 'MyProfil' }">
                  <img
                    class="img-xs rounded-circle profile-pic"
                    src="../assets/icon-above-font.png"
                    alt=""
                  />
                </router-link>
              </div>
              <div class="d-flex flex-column">
                <span class="profile-name"
                  >{{ user.firstName }} {{ user.lastName }}</span
                >
                <span class="profile-name d-flex justify-content-start">
                  ({{ user.userName }})</span
                >
              </div>
            </div>
            <div>
              <button
                class="btn btn-primary btn-icon-text btn-edit-profile"
                @click="toUpdate"
              >
                <font-awesome-icon :icon="['fas', 'edit']" />
                Edit profile
              </button>
            </div>
          </div>
        </div>
        <div class="header-links">
          <ul class="links d-flex align-items-center mt-3 mt-md-0">
            <li class="header-link-item d-flex align-items-center active me-3">
              <font-awesome-icon :icon="['fas', 'home']" />
              <a class="pt-1px text-decoration-none" href="#">Home</a>
            </li>
            <span class="me-3">|</span>
            <li
              class="
                header-link-item
                ml-3
                pl-3
                border-left
                d-flex
                align-items-center
              "
              v-if="(user.admin = 1)"
            >
              <font-awesome-icon :icon="['fas', 'users']" />
              <a class="pt-1px text-decoration-none" href="#">Users list</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//  getting the current user via the state by mapGetters

export default {
  name: "MyProfil",
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
.profile-header {
  box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
  border: 1px solid #f2f4f9;

  .cover {
    position: relative;
    border-radius: 0.25rem 0.25rem 0 0;

    img {
      border-radius: 0.25rem 0.25rem 0 0;
      width: 100%;
      height: 20vw;
    }

    .gray-shade {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: linear-gradient(rgba(255, 255, 255, 0.1), #fff 99%);
    }

    .cover-body {
      position: absolute;
      bottom: -20px;
      left: 0;
      z-index: 2;
      width: 100%;
      padding: 0 20px;

      .profile-pic {
        border-radius: 50%;
        width: 4rem;
        height: auto;
      }

      .profile-name {
        font-weight: 600;
      }
    }
  }

  .header-links {
    padding: 15px;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    background: #fff;
    border-radius: 0 0 0.25rem 0.25rem;

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;

      li {
        a {
          color: #000;
          transition: all 0.2s ease;
        }

        &:hover,
        &.active,
        &:hover a,
        &.active a {
          color: #727cf5;
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .profile-page .profile-header .cover figure {
    height: 110px;
    overflow: hidden;
  }
}

@media (min-width: 2400px) {
  .profile-page .profile-header .cover figure {
    height: 280px;
    overflow: hidden;
  }
}

@media (max-width: 767px) {
  .profile-page .profile-header .cover figure img {
    transform: scale(2);
    margin-top: 15px;
  }
}

@media (min-width: 2400px) {
  .profile-page .profile-header .cover figure img {
    margin-top: -55px;
  }
}

@media (max-width: 767px) {
  .profile-page .profile-header .cover .cover-body .profile-pic {
    width: 70px;
  }
}

.profile-page {
  .profile-header {
    .cover .cover-body .profile-name {
      margin-left: 17px;
    }

    .header-links {
      padding: 15px;
      display: flex;
      justify-content: center;
      background: #fff;
      border-radius: 0 0 0.25rem 0.25rem;

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>