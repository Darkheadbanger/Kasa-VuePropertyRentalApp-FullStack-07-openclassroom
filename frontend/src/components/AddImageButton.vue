<template>
  <label class="addImage">
    <font-awesome-icon
      class="ms-1"
      :icon="['fas', 'image']"
      size="2x"
      for="imageFile"
    />
    <span class="title-image">Ajouter image</span>
    <input
      accept="image/*"
      type="file"
      id="FileInput"
      ref="image"
      name="image_attachment_upload"
      v-on:change="handleFileUpload()"
    />
  </label>
</template>

<script>
export default {
  name: "AddImageButton",

  data() {
    return {
      image: "",
    };
  },

  methods: {
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>