<template>
  <div class="card rounded mb-5">
    <div class="card-header">
      <div class="d-flex flex-column">
        <div
          class="
            input-group input-group-sm
            mb-3
            mt-3
            d-flex
            flex-row
            justify-content-start
          "
        >
          <img
            class="rounded-circle img-xs"
            src="../assets/icon-above-font.png"
            alt=""
          />

          <div class="col-sm-5 col-md-8">
            <input
              class="form-control mr-sm-2 bg-light"
              v-model="postContent"
              :maxlength="max"
              type="text"
              placeholder="Publier ici..."
              aria-label="publication"
              id="publication"
            />
          </div>
          <!-- add button here -->
          <AddImageButton v-on:change="handleFileUpload()"></AddImageButton>
          <!-- add button end here -->
          <div>
            <button
              class="btn btn-primary btn-icon-text btn-edit-profile"
              @click="_createPost"
              :disabled="!postContent && !image"
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
                class="trash mt-1 ms-5"
                :icon="['fas', 'trash-alt']"
                @click="resetImage"
                size="2x"
                for="imageFile"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddImageButton from "./AddImageButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "PostWrite",
  components: {
    AddImageButton,
  },
  data() {
    return {
      resetPost: "",
      postContent: "",
      image: "",
      max: 280,
      preview: "",
    };
  },
  methods: {
    handleFileUpload() {
      let input = event.target;
      console.log(event);
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    resetImage() {
      this.image = null;
      this.preview = null;
    },
    _createPost() {
      const postContent = this.postContent;
      const image = this.image;
      this.$store.dispatch("createPost", { postContent, image });
      this.image = null;
      this.preview = null;
      this.postContent = null;
    },
  },
  // Logique pour récuperer les datas depuis la base de données MySQL
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user", "addPost"]),
  },
};
</script>

<style lang="scss" scoped>
// card footer

.card-header {
  padding: 0 0 0 0;
  margin-bottom: 0;
  background-color: #00000000;
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

.card {
  box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
}
</style>