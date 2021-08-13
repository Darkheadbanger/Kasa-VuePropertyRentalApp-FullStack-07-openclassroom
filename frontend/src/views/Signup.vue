<template>
  <!--loginSignup.scss-->
  <div id="body">
    <h1 class="text-title mb-3">Welcome to Groupomania</h1>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <font-awesome-icon icon="user" role="img" />
            </div>
            <div class="card-body">
              <form @submit.prevent="_signupForm">
                <div class="formAuth">
                  <div class="formAuth__group">
                    <label for="firstName">Prénom</label>
                    <input
                      v-on:keydown="invalid = false"
                      v-model="firstName"
                      name="firstName"
                      id="firstName"
                      type="text"
                      checked="true"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                </div>
                <div class="formAuth">
                  <div class="formAuth__group">
                    <label for="lastName">Nom</label>
                    <input
                      v-model="lastName"
                      v-on:keydown="invalid = false"
                      name="lastName"
                      id="lastName"
                      type="text"
                      checked="true"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                </div>
                <div class="formAuth">
                  <div class="formAuth__group">
                    <label for="userName">Pseudeo</label>
                    <input
                      v-model="userName"
                      v-on:keydown="invalid = false"
                      name="userName"
                      id="userName"
                      type="text"
                      checked="true"
                      placeholder="Votre pseudeo"
                      required
                    />
                  </div>
                </div>
                <div class="formAuth">
                  <div class="formAuth__group">
                    <label for="email">Email</label>
                    <input
                      v-model="email"
                      v-on:keydown="invalid = false"
                      name="email"
                      id="email"
                      type="email"
                      checked="true"
                      placeholder="Votre email"
                      required
                    />
                  </div>
                </div>
                <div class="formAuth">
                  <div class="formAuth__group">
                    <label for="password">Mot de passe</label>
                    <input
                      v-model="password"
                      v-on:keydown="invalid = false"
                      name="password"
                      id="password"
                      type="password"
                      checked="true"
                      placeholder="Votre mot de passe"
                      required
                      pattern="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})"
                    />
                  </div>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    type="submit"
                    class="btn btn-light btn-outline-dark me-md-2"
                    @click="submit"
                  >
                    <span>Se connecter</span>
                  </button>
                </div>
                <p v-if="showError" class="error">
                  <span class="error--modifier">
                    {{ error.error
                    }}<!--utilisateur non trouvé-->
                  </span>
                </p>
                <p v-else class="succes">
                  <span class="succes--modifier">
                    {{ succes.message
                    }}<!--utilisateur non trouvé-->
                  </span>
                </p>
                <!-- message frontend -->
                <div id="nav">
                  <router-link class="link" to="/login"
                    >Se connecter</router-link
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "Signup",
  components: {},
  data() {
    return {
      formValues: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
      },
      showError: false,
      error: "",
      succes: "",
    };
  },

  methods: {
    _signupForm() {
      const firstName = this.firstName;
      const lastName = this.lastName;
      const userName = this.userName;
      const email = this.email;
      const password = this.password;

      this.$store
        .dispatch("signup", {
          firstName,
          lastName,
          userName,
          email,
          password,
        })
        .then((response) => {
          console.log(response);
          if (response) {
            this.$router.push({ name: "Login" });
          }
        })
        .catch((error) => {
          console.log(error);
          this.showError = true;
          // this.$router.push({ name: "Signup" });
          this.error = error.response.data;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#body {
  @include imageBg;
  background-size: cover;
  height: 100vh;
  overflow: hidden;
  .text-title {
    color: $title;
  }

  .container {
    opacity: 0.8;
    .card-body {
      form {
        .formAuth {
          &__group {
            display: flex;
            flex-direction: column;
            text-align: left;
            margin-bottom: $spacer;
            input {
              border: 1px solid;
              border-radius: 3rem;
              color: $cd-txt;
              font-family: "Montserrat", sans-serif;
              padding: 0.5rem 1.5rem;
              // transition: 600ms background-color;
            }
            :focus,
            :active {
              border: 2px solid $cd-txt;
            }
            :focus:invalid {
              background-color: $danger;
              border: 1px solid;
              color: $cd-txt--invalid;
              animation: headshake 100ms cubic-bezier(0.4, 0.1, 0.6, 0.9) 2;
            }
          }
        }
        .error {
          margin-bottom: -1em;
          margin-top: 0.2rem;
          &--modifier {
            color: $danger;
          }
        }
        .succes {
          margin-bottom: -1em;
          margin-top: 0.2rem;
          &--modifier {
            color: $succes;
          }
        }
      }
    }
    button {
      margin-top: $spacer;
      background-color: $bg-btn--before;
      color: $cd-txt-btn--before;
      border-radius: 3rem;
      font-family: "Montserrat", sans-serif;
      &:hover {
        background-color: $bg-btn--after;
        color: $cd-txt-btn--after;
        transition: 350ms;
      }
    }
  }
}
#nav {
  padding: 30px;
  .link {
    text-decoration: none;
  }
  a {
    font-weight: bold;
    color: $colorNotClicked;

    &.router-link-exact-active {
      color: $colorClicked;
    }
  }
}

@keyframes headshake {
  25% {
    //vers la droite
    transform: translateX($shake-intensity);
    // vers la gauche
    transform: translateX($shake-intensity);
  }
}
</style>
