import Vue from "vue";
import App from "./App.vue";

import axios from "axios";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { RecycleScroller } from "vue-virtual-scroller";

Vue.prototype.axios = axios;
Vue.component("RecycleScroller", RecycleScroller);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
