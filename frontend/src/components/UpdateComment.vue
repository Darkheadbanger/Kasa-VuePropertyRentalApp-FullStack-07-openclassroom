<template>
  <div
    class="modal fade"
    id="commentModal"
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
            >Modifiez votre commentaire ici :</label
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
                  v-model="comment"
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
              @click="updateComment"
              :disabled="!comment && !image"
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
// import axios from "axios";

export default {
  name: "UpdateComment",
  props: ["commentId"],
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
    updateComment: function () {
      const commentaire = this.comment;
      const image = this.image;
      const dynamicId = this.commentId.id;
      console.log(dynamicId)
      this.$store.dispatch("updateComment", { image, commentaire, dynamicId });
      // this.$refs["resetInput"].value = "";
      this.$refs["resetInput"].value = "";
    },
  },
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
  },
};
</script>

<style lang="scss" scoped>
#FileInput {
  display: none;
}
</style>