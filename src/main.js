import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Axios
import Axios from "axios";

// set global axios
window.get = (...args) => {
  return new Promise((resolve, reject) => {
    Axios.get(...args)
      .then(resolve)
      .catch(reject);
  });
};

// Vue Multiselect
import "vue-multiselect/dist/vue-multiselect.min.css";
import Multiselect from "vue-multiselect";

Vue.component("multiselect", Multiselect);

// My own styles
import "./styles/style.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
