import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-aweosme";
import "./services/axios";
import panZoom from "vue-panzoom";

createApp(App)
  .use(store)
  .use(router)
  .use(panZoom)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
