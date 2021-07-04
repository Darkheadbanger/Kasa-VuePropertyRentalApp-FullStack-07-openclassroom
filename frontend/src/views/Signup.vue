<template>
  <!--loginSignup.scss-->
  <div id="body">
    <h1>Welcome</h1>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <font-awesome-icon icon="user" />
            </div>
            <div class="card-body">
              <form @submit.prevent="submit">
                <div class="formAuth">
                  <div class="formAuth__group">
                    <label for="firstName">Prénom</label>
                    <input
                      v-model="firstName"
                      name="firstName"
                      type="text"
                      checked="true"
                      placeholder="Votre prénom"
                    />
                  </div>
                </div>
                <div class="formAuth">
                  <div class="formAuth__group">
                    <label for="lastName">Nom</label>
                    <input
                      v-model="lastName"
                      name="lastName"
                      type="text"
                      checked="true"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                <div class="formAuth">
                  <div class="formAuth__group">
                    <label for="userName">Pseudeo</label>
                    <input
                      v-model="userName"
                      name="userName"
                      type="text"
                      checked="true"
                      placeholder="Votre pseudeo"
                    />
                  </div>
                </div>
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
                <button type="submit" @click="submitClick">
                  <span>S'inscrire</span>
                </button>
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
import axios from "axios";

export default {
  name: "Signup",
  components: {},
  data() {
    return {
      form: {
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
    submit() {
      const signUpAPI = "api/auth/signup";
      axios
        .post(signUpAPI, {
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          response.data.accessToken;
          console.log("response", response);
          (this.showError = false), (this.succes = response.data);
          if (response) {
            this.$router.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          this.showError = true;
          this.error = error.response.data;
        });
      //Je regle error pour que si il u a une erreur au password et mail, il y a le message erreur qui sort
      //Si non, c'est ok
      // La then réponse, on recupère le backend pour ensuite l'utiliser
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$colorNotClicked: #2c3e50;
$colorClicked: #42b983;
$spacer: 0.3rem;
$danger: red;
$succes: green;
$cd-txt: rgb(24, 43, 73);
$cd-txt--invalid: #fff;
$cd-txt-btn--before: black;
$cd-txt-btn--after: white;
$bg-btn--before: white;
$bg-btn--after: #343a41;
$shake-intensity: 1%;

@mixin imageBg {
  background: url("../assets/groupomania.png") no-repeat center center
    fixed;
};

#body {
  @include imageBg;
  background-size: auto 100%;
  height: 710px;
  .container {
    width: 30rem;
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
      width: 26.5rem;
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
