<template>
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
            >Modifiez votre post ici :</label
          >
          <div class="d-flex justify-content-center">
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

              <div class="col-sm-5 col-md-8 ms-3">
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
              <input
                type="file"
                id="file"
                ref="image"
                v-on:change="handleFileUpload()"
              />
              <font-awesome-icon
                class="ms-1"
                :icon="['fas', 'image']"
                size="2x"
                for="imageFile"
              />
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
              @click="submitUpdatePost"
            >
              Republier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "modalUpdate",
  props: ["postId"],

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
    submitUpdatePost() {
      console.log("submitPost");
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("postContent", this.postContent);
      console.log("formData", formData);
      const createUpdatePost = `/api/post/${this.postId}`;
      console.log(createUpdatePost)
      axios
        .put(createUpdatePost, formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>