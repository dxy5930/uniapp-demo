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

import { router, RouterMount } from "./router/router.js"; //路径换成自己的
Vue.use(router);

Vue.prototype.$store = store;
Vue.prototype.$env = ENV_CONFIG;
App.mpType = "app";

const app = new Vue({
  store,
  ...App,
});
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, "#app");
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
