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
          <label for="message-text" class="col-form-label"
            >Modifiez votre commentaire ici :</label
          >
          <div
            class="
              input-group input-group-sm
              mb-3
              mt-3
              d-inline-flex
              flex-row
              justify-content-start
            "
          >
            <img class="rounded-circle img-fluid s-image" src="" alt="" />
            <div class="ms-2 mt-2 rounded bg-light rounded-3">
              <div class="d-flex flex-column">
                <div class="ms-perso-2 ms-2 mt-2">
                  <router-link
                    :to="{ name: 'Home' }"
                    class="text-decoration-none me-1 text-dark float-start"
                  >
                    <span class="fw-bold"> </span>
                  </router-link>
                </div>
                <div>
                  <span>
                    <div class="me-perso float-start"></div>
                    <div class="w-50 float-start">
                      <img class="img-fluid d-flex w-50" src="" alt="" />
                    </div>
                  </span>
                </div>
              </div>
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
              @click="submitFile"
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
import axios from "axios";

export default {
  name: "ModalUpdateComment",
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
    submitComment() {
      console.log("submitComment");
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("comment", this.comment);
      console.log("formData", formData);
      const createComment = `api/comment/${this.commentId}`;
      console.log(createComment);
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
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
  },
};
</script>