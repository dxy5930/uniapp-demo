import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;
// //禁止某些页面分享
// let share = require("../utils/share");
// Vue.mixin(share);
import uView from "uview-ui";
Vue.use(uView);
import store from "./store/index.js";
import ENV_CONFIG from "./config/env.js";
Vue.prototype.$store = store;
Vue.prototype.$env = ENV_CONFIG;
App.mpType = "app";

const app = new Vue({
  store,
  ...App,
});
app.$mount();
