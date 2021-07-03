<template>
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
                <button type="submit"><span>Se connecter</span></button>
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
                  <router-link to="/">Mot de passe oublié ?</router-link> |
                  <router-link to="/signup">S'inscrire</router-link>
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
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      // showError: false,
      showError: false,
      error: "",
      succes: "",
    };
  },

  methods: {
    submit() {
      const loginAPI = "api/auth/login";
      axios
        .post(loginAPI, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("userToken", response.data.token);
          this.showError = false;
          this.succes = response.data
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
#body {
  background: url("../assets/groupomania.png") no-repeat center center fixed;
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
      background-color: rgb(52, 58, 65);
      color: white;
    }
  }
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $colorNotClicked;

    &.router-link-exact-active {
      color: $colorClicked;
    }
  }
}
</style>
