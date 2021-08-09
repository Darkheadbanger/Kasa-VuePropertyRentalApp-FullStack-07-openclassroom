<template>
  <div
    class="modal fade"
    id="postModalImage"
    tabindex="-1"
    aria-labelledby="postImageModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog imageModal">
      <div class="modal-content">
        <panZoom
          selector=".zoomable"
          :options="{ minZoom: 0.5, maxZoom: 1 }"
          @init="onInit"
        >
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
              :src="post.imageUrl"
              alt="Image de Post"
            />
          </div>
        </panZoom>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "postModalImage",

  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["post"]),
  },
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