<template>
  <div
    class="
      input-group input-group-sm
      mb-3
      mt-3
      d-inline-flex
      flex-row
      justify-content-start
    "
  >
    <img
      class="rounded-circle img-fluid s-image"
      src="../assets/icon-above-font.png"
      alt=""
    />
    <div class="ms-2 mt-2 rounded bg-light rounded-3">
      <div class="d-flex flex-column">
        <div class="ms-perso-2 ms-2 mt-2">
          <router-link
            :to="{ name: 'Home' }"
            class="text-decoration-none me-1 text-dark float-start"
          >
            <span class="fw-bold">
              {{ user.firstName }} {{ user.lastName }}
            </span>
          </router-link>
        </div>
        <div>
          <span>
            <div class="me-perso float-start mb-5">
              {{ comment.comment }}
            </div>
            <div class="w-50 mt-5 mb-3 me-5">
              <img
                class="img-fluid d-flex w-50"
                :src="comment.imageUrl"
                alt=""
              />
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="btn-group ml-auto p-2 button-right">
      <button
        class="btn dropdown-toggle me-5"
        type="button"
        id="defaultDropdown"
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        aria-expanded="false"
      ></button>
      <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
        <li>
          <button
            class="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            <font-awesome-icon :icon="['fas', 'edit']" />
            Edit commentaire
          </button>
        </li>
        <li>
          <button class="dropdown-item" @click="deleteComment">
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            Supprimer commentaire
          </button>
        </li>
      </ul>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div>
              <label for="message-text" class="col-form-label"
                >Modifiez votre commentaire ici :</label
              >
              <div
                class="
                  input-group input-group-sm
                  mb-3
                  mt-3
                  d-inline-flex
                  flex-row
                  justify-content-start
                "
              >
                <img class="rounded-circle img-fluid s-image" src="" alt="" />
                <div class="ms-2 mt-2 rounded bg-light rounded-3">
                  <div class="d-flex flex-column">
                    <div class="ms-perso-2 ms-2 mt-2">
                      <router-link
                        :to="{ name: 'Home' }"
                        class="text-decoration-none me-1 text-dark float-start"
                      >
                        <span class="fw-bold">
                          <!-- {{ user.firstName }} {{ user.lastName }} -->
                        </span>
                      </router-link>
                    </div>
                    <div>
                      <span>
                        <div class="me-perso float-start">
                          {{ comment.comment }}
                        </div>
                        <div class="w-50 float-start">
                          <img
                            class="img-fluid d-flex w-50"
                            :src="comment.imageUrl"
                            alt=""
                          />
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <div>
                <button
                  class="btn btn-primary btn-icon-text btn-edit-profile"
                  @click="submitFile"
                >
                  Republier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- fin modal -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import data from "../views/Home.vue"
import axios from "axios";

export default {
  name: "Comment",
  props: ["comment"],

  data() {
    return {
      formattedTime: "",
      now: 0,
      comments: [],
    };
  },
  methods: {
    deleteComment() {
      const deleteComment = `api/comment/${this.comment.id}`;
      axios
        .delete(deleteComment)
        .then((response) => {
          console.log(response);
        })
        .catch(() => {
          // console.log(error);
        });
    },
  },
  // Logique pour récuperer les datas depuis la base de données MySQL
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
  },
}; //  Pour le corps de la poste
</script>

<style lang="scss" scoped>
// card footer
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

.card-header {
  padding: 0 0 0 0;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0);
}

.card-footer {
  background-color: white;
  border-top: 1px solid #f2f4f9;
  li {
    a {
      color: #000;
      transition: all 0.2s ease;
    }

    &:hover,
    &.active,
    &:hover a,
    &.active a {
      text-decoration: underline;
    }
  }
  .me-perso {
    margin-right: 4rem !important;
  }
  .ms-perso-2 {
    margin-left: 0.15rem !important;
  }
}
</style>