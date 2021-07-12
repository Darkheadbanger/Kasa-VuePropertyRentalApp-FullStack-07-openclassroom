module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData:
          // @ alias to src, vue.congi.js is a global scope
          `
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
          @import "@/scss/main.scss";
        `,
      },
    },
  },
};
