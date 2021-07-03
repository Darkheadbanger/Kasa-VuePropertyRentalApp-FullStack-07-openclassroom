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
                <button type="submit">
                  <span>Se connecter</span>
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
                  <router-link class="link" to="/"
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
import axios from "axios";
import "../loginSignup.scss";

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
          this.succes = response.data;
          if (response) {
            this.$router.push("/");
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

<style lang="scss" scoped>
@import "../scss/loginSignup.scss";
</style>