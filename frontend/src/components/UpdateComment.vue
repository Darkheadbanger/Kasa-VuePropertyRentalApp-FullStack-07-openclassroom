.<template>
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
            >Modifiez votre commentaire ici :
          </label>
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
                  v-model="commentText"
                  :maxlength="max"
                  type="text"
                  ref="resetInput"
                  placeholder="Publier ici..."
                  aria-label="publication"
                  id="publication"
                />
              </div>
              <!-- add button here -->
              <AddImageButton v-on:change="handleFileUpload()"></AddImageButton>
              <!-- add button end here -->
            </div>
          </div>
          <!-- Preview image start here -->
          <div class="p-2 mb-3">
            <template v-if="preview">
              <img :src="preview" class="img-fluid" />
              <div class="d-flex">
                <p class="mb-0 mt-2">file name: {{ image.name }}</p>
              </div>
            </template>
          </div>
          <!-- Preview image end here -->
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="closedButton()"
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
import AddImageButton from "./AddImageButton.vue";

export default {
  name: "UpdateComment",
  components: {
    AddImageButton,
  },
  data() {
    return {
      commentText: "",
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

    closedButton() {
      this.image = null;
      this.preview = null;
    },

    updateComment: function () {
      const commentaire = this.commentText;
      const image = this.image;
      const dynamicId = this.comment.id;
      console.log(dynamicId);
      this.$store.dispatch("updateComment", { image, commentaire, dynamicId });
      // this.$refs["resetInput"].value = "";
      this.$refs["resetInput"].value = "";
    },
  },
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["comment"]),
  },
};
</script>

<style lang="scss" scoped>
#FileInput {
  display: none;
}
</style>