<template>
  <div
    id="commentImageModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="commentImageModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog imageModal">
      <div class="modal-content">
        <div class="zoomable">
          <font-awesome-icon
            :icon="['fas', 'window-close']"
            type="button"
            class="button window position-absolute top-0 end-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
          <img
            class="img-fluid d-flex"
            :src="comment ? comment.imageUrl : ''"
            alt="Image de Post"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "commentModalImage",

  data() {
    return {
      image: "",
    };
  },
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["comment"]),
  },
  // methods: {
  //   onInit(panZoomInstance) {
  //     console.log(panZoomInstance.getTransform());
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.modal {
  .window {
    color: red;
    margin: 3px 9px 0px 0px;
  }
}

.imageModal {
  overflow: visible;
}
.aCursor {
  cursor: pointer;
}
</style>
