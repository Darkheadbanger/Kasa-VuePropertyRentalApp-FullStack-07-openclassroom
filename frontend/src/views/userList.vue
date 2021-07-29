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
          <!-- <div v-for="user in users" :key="user.id">
          </div> -->
          <div class="col-xl-6 middle-wrapper">
            <div class="row mt-4 mt-md-4 mt-lg-0">
              <div class="col-md-xxl">
                <div class="card rounded bg-light">
                  <div class="card-header mb-4 mt-4 d-flex flex-wrap">
                    <UserList
                      v-for="user in users"
                      :key="user.id"
                      :user="user"
                    ></UserList>
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
import UserList from "../components/UserList.vue";
// import axios from "axios";

export default {
  name: "MyProfil",
  components: {
    Nav,
    Header,
    Profile,
    UserList,
  },

  data() {
    return {
      users: {},
    };
  },

  created() {
    this.$store
      .dispatch("getAllUser")
      .then((response) => {
        console.log(response);
        this.users = response.data.users;
        console.log(this.users);
      })
      .catch((error) => {
        console.log(error);
      });
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
// card footer

.card-header {
  padding: 0 0 0 0;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 1px solid #878787;
}

.card {
  box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
}
</style>