import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css"
import { FontAwesomeIcon } from "./plugins/font-awesome";

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
