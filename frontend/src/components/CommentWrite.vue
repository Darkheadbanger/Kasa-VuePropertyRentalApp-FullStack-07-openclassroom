<template>
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
        v-model="comment"
        :maxlength="max"
        type="text"
        placeholder="Commenter..."
        aria-label="Commenter"
        id="commentText"
        
      />
      <!-- exampleModal -->
    </div>
    <input type="file" id="file" ref="image" v-on:change="handleFileUpload()" />
    <font-awesome-icon class="ms-1" :icon="['fas', 'image']" size="2x" />
    <div>
      <button
        class="btn btn-primary btn-icon-text btn-edit-profile"
        @click="submitComment"
      >
        Publier
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "CommentWrite",
  props: ["postId"],
  data() {
    return {
      comment: "",
      image: "",
      max: 280,
    };
  },
  methods: {
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
    },
    submitComment() {
      console.log("submitComment");
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("comment", this.comment);
      console.log("formData", formData);
      const createComment = `api/comment/${this.postId}`;
      axios
        .post(createComment, formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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