<template>
  <div class="d-md-block col-md-4 me-5 mb-5">
    <div class="card rounded">
      <div
        class="
          card-body
          d-flex
          align-items-start
          justify-content-start
          flex-column
          me-3
          ms-3
        "
      >
        <div class="d-flex mb-2">
          <div class="mr-auto p-2">
            <h6 class="card-title mb-3">About</h6>
          </div>
          <div class="btn-group ml-auto p-2 ms-5 button-right">
            <button
              class="btn btn-light dropdown-toggle me-5"
              type="button"
              id="defaultDropdown"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded="false"
            ></button>
            <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
              <li>
                <router-link class="dropdown-item" :to="{ name: 'Update' }">
                  <font-awesome-icon :icon="['fas', 'edit']" /> Edit
                  profile</router-link
                >
              </li>
            </ul>
          </div>
        </div>

        <p class="about">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
        <div class="mt-3">
          <label class="tx-11 font-weight-bold mb-0 text-uppercase"
            >Joined:</label
          >
          <p class="text-muted">{{ formattedTime }}</p>
        </div>
        <div class="mt-3 last-name">
          <label class="tx-11 font-weight-bold mb-0 text-uppercase">Nom:</label>
          <p class="text-muted">{{ users.lastName }}</p>
        </div>
        <div class="mt-3 first-name">
          <label class="tx-11 font-weight-bold mb-0 text-uppercase"
            >Prénom:</label
          >
          <p class="text-muted">{{ users.firstName }}</p>
        </div>
        <div class="mt-3 pseudeo">
          <label
            class="
              tx-11
              font-weight-bold
              mb-0
              text-uppercase
              d-flex
              justify-content-start
            "
            >Pseudeo:</label
          >
          <p class="text-muted">{{ users.userName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";
export default {
  name: "profileInformation",
  // Logique pour récuperer les datas depuis la base de données MySQL
  data() {
    return {
      formattedTime: "",
      now: 0,
      created_At: moment(),
      users: "",
    };
  },

  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
  },
  methods: {
    getFormattedTime(date) {
      let now = moment(); //todays date
      let end = moment(date); // another date
      let duration = moment.duration(now.diff(end));
      let years = duration.asYears();

      if (years > 0) {
        return end.format("D/MMM/Y");
      }
    },
  },

  watch: {
    now() {
      this.formattedTime = this.getFormattedTime(this.users.createdAt);
    },
  },

  mounted() {
    const userIdDynamic = this.user.id;
    const getUserProfil = `api/account/me/${userIdDynamic}`;
    axios
      .get(getUserProfil)
      .then((response) => {
        console.log(response);
        this.users = response.data;
        console.log(this.users);
        // Methods pour la date
        this.formattedTime = moment();
        this.formattedTime = this.getFormattedTime(this.users.createdAt);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: #f9fafb;
  margin-top: 20px;
  .about {
    text-transform: capitalize;
  }
  .last-name {
    text-transform: capitalize;
  }
  .first-name {
    text-transform: capitalize;
  }
  .pseudeo {
    text-transform: capitalize;
  }
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

.card {
  box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
}
</style>