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
              {{ comment.user.firstName }} {{ comment.user.lastName }}
            </span>
          </router-link>
        </div>
        <div>
          <div class="me-perso float-start mb-5">
            {{ comment.comment }}
          </div>
          <div class="w-50 mt-5 mb-3 me-5">
            <a
              data-bs-toggle="modal"
              data-bs-target="#commentImageModal"
              data-bs-whatever="@mdo"
              @click="showModal(comment)"
            >
              <img class="img-fluid" :src="comment.imageUrl" alt="" />
            </a>
          </div>
          <!-- Modal start here -->
          <!-- Modal end here -->
        </div>
      </div>
    </div>
    <div
      class="btn-group ml-auto p-2 button-right"
      v-if="showButton == (user.id == comment.userId || user.isAdmin == 1)"
    >
      <span></span>
      <button
        class="btn btn-light dropdown-toggle me-5"
        type="button"
        id="defaultDropdown1"
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        aria-expanded="false"
      ></button>
      <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
        <li>
          <button
            class="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#commentModal"
            data-bs-whatever="@mdo"
            v-if="showButton == (user.id == comment.userId)"
            @click="showModal(comment)"
          >
            <font-awesome-icon :icon="['fas', 'edit']" /> Edit commentaire
          </button>
        </li>
        <li>
          <button
            class="dropdown-item"
            @click="_deleteComment"
            v-if="
              showButton == (user.id == comment.userId || user.isAdmin == 1)
            "
          >
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            Supprimer commentaire
          </button>
        </li>
      </ul>
      <!-- Modal -->
      <!-- <UpdateComment :commentId="comment.id"></UpdateComment> -->
      <!-- fin modal -->
    </div>
  </div>
</template>
<script>
// import UpdateComment from "./UpdateComment.vue";
import { mapGetters } from "vuex";
// import axios from "axios";
export default {
  name: "Comment",
  props: ["comment"],
  // components: { UpdateComment },
  data() {
    return {
      showButton: true,
      commentMidalId: null,
    };
  },
  methods: {
    _deleteComment: function () {
      const dynamicId = this.comment.id;
      this.$store.dispatch("deleteComment", { dynamicId });
    },

    showModal(comment) {
      // Le paramètre va lui dire que c'est ce comment là
      this.$store.dispatch("comment", comment);
    },
  },
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
  },
};
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