<template>
  <header>
    <nav
      class="
        navbar navbar-dark
        bg-success bg-gradient
        d-flex
        justify-content-md-between
      "
    >
      <a class="a_logo navbar-brand d-flex justify-content-start" href="#">
        <img
          class="img img-fluid d-inline align-left p-2"
          src="../assets/icon-above-font.png"
          alt="Groupomania logo"
        />
        <span class="p2 title title__style h6 align-self-center">
          <div class="align-items-start">Welcome to</div>
          <div>GroupomaniaNetwork</div>
        </span>
      </a>
      <form class="d-flex">
        <div class="col-sm-6 col-md-12">
          <input
            class="form-control mr-sm-2 bg-light"
            type="text"
            placeholder="Search..."
            aria-label="Search"
            id="searchText"
          />
        </div>
        <button type="button" class="btn btn-secondary">
          <font-awesome-icon icon="search" />
        </button>
      </form>

      <nav class="navbar navbar-expand-md">
        <div class="container-fluid">
          <a class="a_profil navbar-brand" href="#">
            <img
              class="
                img_profil
                rounded-circle
                img-fluid
                d-inline
                align-left
                p-2
                d-none d-lg-block
              "
              src="../assets/icon-above-font.png"
              alt="Groupomania logo"
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <font-awesome-icon :icon="['fas', 'arrow-down']" />
          </button>
          <div class="collapse navbar-collapse ml-auto hidden-sm-up float-md-right" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="
                    a_profil
                    nav-link
                    active
                    d-flex
                    flex-column
                    justify-content-end
                  "
                  aria-current="page"
                  href="#"
                >
                  <div class="d-flex flex-row d-md-none">
                    <img
                      class="
                        img_profil
                        rounded-circle
                        img-fluid
                        d-inline
                        align-left
                        p-2
                      "
                      src="../assets/icon-above-font.png"
                      alt="Groupomania logo"
                    />
                    <!-- Il faut utiliser computed pour mettre le nom et prenom -->
                    <!-- <span>{{user.name}}</span> -->
                    <span class="d-flex align-items-center"
                      >David Bouhaben</span
                    >
                  </div>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="#">Accueil</a>
              </li>
              <li class="nav-item">
                <a
                  href="javascript:void(0)"
                  @click="logOutClick"
                  class="nav-link link text-white"
                  >Deconnexion</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
header {
  nav {
    form {
      position: relative;
    }
    .form-long {
      size: 50;
    }
    .a_logo {
      .img {
        width: 5rem;
        height: auto;
      }
      .title {
        .bg-primary {
          @include fontFamilly;
          // background: rgb(145, 169, 120);
        }
      }
    }
    .a_profil {
      .img_profil {
        width: 4rem;
        height: auto;
      }
    }
  }
}
</style>