<template>
  <div
    class="modal fade"
    id="postModal"
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
          <label id="postModal" for="message-text" class="col-form-label"
            >Modifiez votre post ici : {{ post ? post.id : "" }}</label
          >
          <div id="postModal" class="d-flex justify-content-center">
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
                  ref="resetInput"
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
              @click="_updatePost"
              :disabled="!postContent && !image"
              data-bs-dismiss="modal"
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
import { mapGetters } from "vuex";

export default {
  name: "modalUpdate",

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
    _updatePost: function () {
      const postContent = this.postContent;
      console.log(postContent);
      const image = this.image;
      console.log(image);
      const dynamicId = this.post.id;
      console.log(dynamicId);
      this.$store.dispatch("updatePost", { postContent, image, dynamicId });
      // this.$refs["resetInput"].value = "";
      this.$refs["resetInput"].value = "";
    },
  },

  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user", "posts", "post"]),
  },
};
</script>

<style lang="scss" scoped>
#FileInput {
  display: none;
}
</style>