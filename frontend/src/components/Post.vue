<template>
  <div class="card-header">
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center justify-content-between">
        <img
          class="rounded-circle profile-pic"
          src="../assets/icon-above-font.png"
          alt=""
        />
        <div class="ml-2 d-flex flex-column me-3">
          <div v-if="post" class="ml-2 d-flex flex-column me-3">
            <span class="mt-5"
              >{{ user.firstName }} {{ user.lastName }} <br />({{
                user.userName
              }})</span
            >
            <!-- <span class="mt-5"
              >{{ post.user.firstName }} {{ post.user.lastName }} <br />({{
                post.user.userName
              }})</span
            >
            Ici haut, source d'erreur -->
            <span class="tx-11 text-muted mb-5 d-flex justify-content-start">
              {{ formattedTime }}
            </span>
          </div>
        </div>
        <div
          class="btn-group"
          v-if="showButton == (user.id == post.userId || user.isAdmin == 1)"
        >
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
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#postModal"
                data-bs-whatever="@mdo"
                v-if="showButton == (user.id == post.userId)"
                @click="showModalUpdate(post)"
              >
                <!-- <span>{{ post.id }}</span> -->
                <font-awesome-icon :icon="['fas', 'edit']" /> Edit post
              </button>
              <!-- <portal to="modals" v-if="showModal">
                <product-details-modal v-bind:post="post" />
              </portal> -->
            </li>
            <li>
              <button
                class="dropdown-item"
                @click="deletePost"
                v-if="
                  showButton == (user.id == post.userId || user.isAdmin == 1)
                "
              >
                <font-awesome-icon :icon="['fas', 'trash-alt']" />
                Supprimer post
              </button>
            </li>
          </ul>
          <!-- Modal -->
          <!-- <UpdatePost  :postId="post.id"></UpdatePost> -->
          <!-- fin modal -->
        </div>
      </div>
    </div>
    <div class="card-body">
      <div v-if="post">
        <p class="mb-3 tx-14 ms-3">
          {{ post.postContent }}
        </p>
        <!-- Creation d'image et zoom dans un espece de modal, imagePost est pour viser le modal -->
        <!--
        <div
          class="imageBox-target modal-dialog modal-fullscreen"
          id="imagePost"
          tabindex="-1"
          aria-labelledby="imagePost"
          aria-hidden="true"
        >

        <span>hhahahaha</span>

          <img
            class="img-fluid d-flex"
            :src="post.imageUrl"
            alt="Image de Post"
          />
          <a class="imageBox-close" href="#"></a>
        </div> -->

        <a
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          <img
            class="img-fluid d-flex"
            :src="post.imageUrl"
            alt="Image de Post"
          />
        </a>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog bg-transparent">
            <div class="modal-dialog">
              <div class="modal-content">
                <font-awesome-icon
                  :icon="['fas', 'window-close']"
                  type="button"
                  class="button window position-absolute top-0 end-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />

                <img
                  class="img-fluid d-flex"
                  src="https://wallpaperaccess.com/full/1495918.jpg"
                  alt="Image de Post"
                />
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex post-actions">
          <!-- <label
            class="
              d-flex
              align-items-center
              text-muted
              me-4
              ms-4
              text-decoration-none
            "
          >
            <font-awesome-icon class="mb-1 me-2" :icon="['fas', 'thumbs-up']" />
            Like
          </label> -->
          <label
            class="
              d-flex
              align-items-center
              text-muted
              me-4
              text-decoration-none
            "
            for="commentText"
          >
            <font-awesome-icon class="mb-1 me-2" :icon="['fas', 'comment']" />
            Comment
          </label>
        </div>
        <CommentWrite :postId="post.id"></CommentWrite>
        <!-- V-for le tableau que je parcours est a droite de int, le commentaire dans le tableau de commentaier -->
        <div v-for="comment in post.comments" :key="comment.id">
          <Comment :comment="comment"></Comment>
        </div>
        <UpdateComment></UpdateComment>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import Comment from "./Comment.vue";
import CommentWrite from "./CommentWrite.vue";

export default {
  name: "Post",
  props: ["post"],
  components: {
    Comment,
    CommentWrite,
  },
  data() {
    return {
      formattedTime: "",
      now: 0,
      created_At: moment(),
      showButton: true,
      postModalId: null,
    };
  },
  methods: {
    getFormattedTime(date) {
      let now = moment(); //todays date
      let end = moment(date); // another date
      let duration = moment.duration(now.diff(end));
      let month = duration.asMonths();
      let days = duration.asDays();
      let hours = duration.asHours();
      let minutes = duration.asMinutes();
      let seconds = duration.asSeconds();

      if (seconds > 0 && seconds < 60) {
        return Math.round(seconds) + "s";
      }

      if (minutes > 0 && minutes < 60) {
        return Math.round(minutes) + "m";
      }

      if (hours > 0 && hours < 24) {
        return Math.round(hours) + "h";
      }

      if (days > 0) {
        return end.format("D MMM");
      }

      if (month > 0 && month <= 12) {
        return end.format("D MMM YYY");
      }
    },

    deletePost: function () {
      const dynamicId = this.post.id;
      console.log("dynamicId");
      this.$store.dispatch("deletePost", { dynamicId });
    },

    showModalUpdate(post) {
      this.$store.dispatch("post", post);
    },
  },

  watch: {
    now() {
      this.formattedTime = this.getFormattedTime(this.post.updatedAt);
    },
  },

  created() {
    this.formattedTime = moment();
    this.formattedTime = this.getFormattedTime(this.post.updatedAt);
    setInterval(() => {
      this.now = moment();
    }, 3000);
  },

  // Logique pour récuperer les datas depuis la base de données MySQL
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user", "posts", "post"]),
  },
}; //  Pour le corps de la poste
</script>

<style lang="scss" scoped>
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
  .card-body {
    .modal {
      .window {
        color: red;
        margin: 2px 7px 0 0;
      }
    }
  }
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