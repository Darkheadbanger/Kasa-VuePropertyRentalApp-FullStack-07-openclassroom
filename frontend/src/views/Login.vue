<template>
  <div id="body">
    <h1 class="text-white">Welcome</h1>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <font-awesome-icon icon="user" />
            </div>
            <div class="card-body">
              <form @submit.prevent="_loginForm">
                <div class="formAuth">
                  <div class="formAuth__group">
                    <label for="email">Email</label>
                    <input
                      v-model="email"
                      name="email"
                      type="email"
                      checked="true"
                      placeholder="Votre email"
                    />
                  </div>
                </div>
                <div class="formAuth">
                  <div class="formAuth__group">
                    <label for="password">Mot de passe</label>
                    <input
                      v-model="password"
                      name="password"
                      type="password"
                      checked="true"
                      placeholder="Votre mot de passe"
                    />
                  </div>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
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
                <div id="nav">
                  <router-link class="link" to="/forgot"
                    >Mot de passe oublié ?</router-link
                  >
                  |
                  <router-link class="link" to="/signup"
                    >S'inscrire</router-link
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
export default {
  name: "Login",
  component: {},
  data() {
    return {
      formValues: {
        email: "",
        password: "",
      },
      showError: false,
      error: "",
      succes: "",
    };
  },
  methods: {
    _loginForm: function () {
      console.log(this.password, this.email);
      const email = this.email;
      const password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.showError = true;
          this.error = error.response.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#body {
  @include imageBg;
  background-size: cover;
  height: 710px;
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
            :not(:focus):invalid {
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