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
    <label>
      <font-awesome-icon class="ms-1" :icon="['fas', 'image']" size="2x" />
      <input
        type="file"
        id="FileInput"
        ref="image"
        name="image_attachment_upload"
        v-on:change="handleFileUpload()"
      />
    </label>
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
// card footer

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
  #FileInput {
    display: none;
  }
}
</style>