<template>
  <div class="d-flex flex-column">
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
          ref="resetInput"
          placeholder="Commenter..."
          aria-label="Commenter"
          id="commentText"
        />
        <!-- exampleModal -->
      </div>
      <label class="addImage">
        <font-awesome-icon
          class="ms-1"
          :icon="['fas', 'image']"
          size="2x"
          for="imageFile"
        />
        <span class="title-image">Ajouter image</span>
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
          @click="_createComment"
          :disabled="!comment && !image"
        >
          Publier
        </button>
      </div>
    </div>
    <div class="p-2 mb-3">
      <template v-if="preview">
        <img :src="preview" class="img-fluid" />
        <div class="d-flex">
          <p class="mb-0 mt-2">file name: {{ image.name }}</p>
          <font-awesome-icon
            class="trash mt-1"
            :icon="['fas', 'trash-alt']"
            @click="resetImage"
            size="2x"
            for="imageFile"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
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

      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    _createComment: function () {
      const commentaire = this.comment;
      const image = this.image;
      const postId = this.postId;
      console.log(postId);
      this.$store.dispatch("createComment", { commentaire, image, postId });
      this.$refs["resetInput"].value = "";
    },

    resetImage: function () {
      this.image = null;
      this.preview = null;
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

  .addImage {
    margin: 0 5px 0 5px;
    color: grey;
    cursor: pointer;
    &:hover {
      color: blue;
    }
    .title-image {
      margin: 0 5px 0 5px;
    }
  }
  .trash {
    margin-left: 5rem !important;
    &:hover {
      color: red;
      cursor: pointer;
    }
  }
}
</style>