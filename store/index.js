// 在store.js文件中添加以下代码

import Vuex from "vuex";
import Vue from "vue";
import User from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    User,
  },
});

export default store;
