<template>
  <div class="card rounded mb-5">
    <div class="card-header">
      <div class="d-flex">
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
          <label>
            <font-awesome-icon
              class="ms-1"
              :icon="['fas', 'image']"
              size="2x"
              for="imageFile"
            />
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
              @click="_createPost"
              :disabled="!postContent && !image"
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import axios from "axios";
export default {
  name: "PostWrite",
  data() {
    return {
      postContent: "",
      image: "",
      max: 280,
    };
  },
  methods: {
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
    },
    _createPost: function () {
      const postContent = this.postContent;
      const image = this.image;
      this.$store
        .dispatch("createPost", { postContent, image })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          this.showError = true;
          this.error = error.response.data;
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

.card-header {
  padding: 0 0 0 0;
  margin-bottom: 0;
  background-color: #00000000;
  #FileInput {
    display: none;
  }
}

.card {
  box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
}
</style>