// 在store.js文件中添加以下代码

import { getStorage, removeStorage, setStorage } from "../../utils";

const User = {
  namespaced: true,
  state: {
    isLoggedIn: getStorage("isLoggedIn") || false,
    user: getStorage("user") || null,
  },

  mutations: {
    SET_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status;
      setStorage("isLoggedIn", status);
    },
    SET_USER(state, user) {
      state.user = user;
      setStorage("user", user);
    },
  },

  actions: {
    login({ commit }, user) {
      setStorage("token", "your_token_here");
      commit("SET_LOGIN_STATUS", true);
      commit("SET_USER", user);
    },
    logout({ commit }) {
      commit("SET_LOGIN_STATUS", false);
      commit("SET_USER", null);
      removeStorage("token");
    },
  },

  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
  },
};

export default User;
