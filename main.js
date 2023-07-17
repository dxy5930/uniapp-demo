import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;
import "./env";
// //禁止某些页面分享
// let share = require("../utils/share");
// Vue.mixin(share);
import uView from "uview-ui";
Vue.use(uView);
import store from "./store/index.js";
Vue.prototype.$store = store;
App.mpType = "app";

const app = new Vue({
  store,
  ...App,
});
app.$mount();
