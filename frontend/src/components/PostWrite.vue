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
              type="text"
              placeholder="Publier ici..."
              aria-label="publication"
              id="publication"
            />
          </div>
          <font-awesome-icon
            class="ms-1"
            :icon="['fas', 'image']"
            size="2x"
            for="imageFile"
          />
          <div>
            <button
              class="btn btn-primary btn-icon-text btn-edit-profile"
              @click="toUpdate"
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

export default {
  name: "PostWrite",
  // Logique pour récuperer les datas depuis la base de données MySQL
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
  },
};
</script>

<style lang="scss" scoped>
.profile-body {
  div {
    padding-left: 3px;
    padding-right: 3px;
  }
  .img-xs {
    width: 3rem;
    height: auto;
  }
}

// card footer

.card-header {
  padding: 0 0 0 0;
  margin-bottom: 0;
  background-color: #00000000;
}

.card {
  box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
}
</style>