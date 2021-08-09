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
          placeholder="Commenter..."
          aria-label="Commenter"
          id="commentText"
        />
        <!-- exampleModal -->
      </div>
      <!-- add button here -->
      <AddImageButton v-on:change="handleFileUpload()"></AddImageButton>
      <!-- add button end here -->
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
import AddImageButton from "./AddImageButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CommentWrite",
  props: ["postId"],
  components: {
    AddImageButton,
  },
  data() {
    return {
      comment: "",
      image: "",
      max: 280,
      preview: "",
    };
  },
  methods: {
    handleFileUpload() {
      let input = event.target;
      console.log(input);
      if (input.files) {
        console.log("inside condition");
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
          console.log("assign preview", this.preview);
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
        console.log("end");
      }
    },

    _createComment: function () {
      const commentaire = this.comment;
      const image = this.image;
      const postId = this.postId;
      this.$store.dispatch("createComment", { commentaire, image, postId });
      this.image = null;
      this.preview = null;
      this.comment = null;
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