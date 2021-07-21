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
              >{{ post.user.firstName }} {{ post.user.lastName }} <br />({{
                post.user.userName
              }})</span
            >
            <span class="tx-11 text-muted mb-5 d-flex justify-content-start">
              <!-- {{ post.createdAt }} -->
              {{ formattedTime }}
            </span>
          </div>

          <div v-else class="ml-2 d-flex flex-column me-3">
            <span class="mt-5"
              >{{ myPost.user.firstName }} {{ myPost.user.lastName }} <br />({{
                myPost.user.userName
              }})</span
            >
            <span class="tx-11 text-muted mb-5 d-flex justify-content-start">
              <!-- {{ post.createdAt }} -->
              {{ formattedTime }}
            </span>
          </div>
        </div>
        <div class="btn-group">
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
              <router-link class="dropdown-item" :to="{ name: 'EditPost' }">
                <font-awesome-icon :icon="['fas', 'edit']" /> Edit
                post</router-link
              >
            </li>
            <li>
              <router-link class="dropdown-item" :to="{ name: 'deletePost' }">
                <font-awesome-icon :icon="['fas', 'trash-alt']" />
                Supprimer post</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div v-if="post" class="card-body">
        <p class="mb-3 tx-14 ms-3">
          {{ post.postContent }}
        </p>
        <img class="img-fluid d-flex" :src="post.imageUrl" alt="" />
      </div>

      <div v-else class="card-body">
        <p class="mb-3 tx-14 ms-3">
          {{ myPost.postContent }}
        </p>
        <img class="img-fluid d-flex" :src="myPost.imageUrl" alt="image post" />
      </div>

      <div class="card-footer">
        <div class="d-flex post-actions">
          <label
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
          </label>
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
        <div
          class="
            input-group input-group-sm
            mb-1
            mt-3
            d-flex
            flex-row
            justify-content-start
            border-bottom border-light border-2
          "
        >
          <img
            class="rounded-circle img-xs"
            src="../assets/icon-above-font.png"
            alt=""
          />
          <div class="col-sm-6 col-md-9">
            <input
              class="form-control mr-sm-2 bg-light"
              type="text"
              placeholder="Commenter..."
              aria-label="Commenter"
              id="commentText"
            />
          </div>
          <font-awesome-icon class="ms-1" :icon="['fas', 'image']" size="2x" />
        </div>
        <!-- Comment  -->
        <div v-for="comment in comments" :key="comment.id">
          <Comment :comment="comment"></Comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
// import data from "../views/Home.vue"
import Comment from "./Comment.vue";
import axios from "axios";

export default {
  name: "Post",
  props: ["post", "myPost"],
  components: {
    Comment,
  },
  data() {
    return {
      formattedTime: "",
      now: 0,
      created_At: moment(),
      comments: [],
    };
  },
  methods: {
    getFormattedTime(date) {
      let now = moment(); //todays date
      let end = moment(date); // another date
      let duration = moment.duration(now.diff(end));
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
        return end.format("MMM D");
      }
    },
  },

  watch: {
    now() {
      this.formattedTime = this.getFormattedTime(this.created_At);
    },
  },

  created() {
    this.formattedTime = moment();
    const created_At_Origine = this.created_At;
    this.formattedTime = this.getFormattedTime(created_At_Origine);
    setInterval(() => {
      this.now = moment();
    }, 3000);

    const getAllComments = "api/comment";
    axios
      .get(getAllComments)
      .then((response) => {
        console.log(response);
        this.comments = response.data.comments;
        console.log(this.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // Logique pour récuperer les datas depuis la base de données MySQL
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
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