<template>
  <view class="flex-around-center">
    <view
      v-for="(item, index) of providerList"
      :key="index"
      @click="thirdPartyLogin(item)"
      >{{ item.label }}</view
    >
  </view>
</template>

<script>
import { ERROR_CODES, LOGIN_TYPE, ROUTES } from "../../constant";
import { getUserInfo, login, toast, switchTab } from "../../utils/index";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      providerList: [
        { label: "微信登录", value: "weixin" },
        { label: "qq登录", value: "qq" },
        { label: "apple登录", value: "apple" },
      ],
      userInfo: {},
    };
  },
  mounted() {},
  methods: {
    ...mapActions("User", ["login"]),
    async thirdPartyLogin(e) {
      const { value } = e;
      let loginRes = "";
      let getUserInfoRes = "";
      try {
        loginRes = await login(value);
        console.log("登录", loginRes);
      } catch (error) {
        toast(ERROR_CODES[error.code]);
        console.log("登录失败", error);
        return;
      }
      const access_token = loginRes?.authResult?.access_token;
      try {
        getUserInfoRes = await getUserInfo(value);
        console.log("获取用户信息", getUserInfoRes);
      } catch (error) {
        toast(ERROR_CODES[error.code]);
        console.log("获取用户失败", error);
        return;
      }

      if (value == LOGIN_TYPE.WEIXIN) {
        this.userInfo = {
          nickName: getUserInfoRes?.userInfo?.nickName,
          gender: getUserInfoRes?.userInfo?.gender,
          headImgUrl: getUserInfoRes?.userInfo?.avatarUrl,
          openId: getUserInfoRes?.userInfo?.openId,
          unionId: getUserInfoRes?.userInfo?.unionId,
          access_token: access_token,
          appLoginType: value,
        };
      } else if (value == LOGIN_TYPE.QQ) {
        this.userInfo = {
          nickName: getUserInfoRes?.userInfo?.nickname,
          gender: getUserInfoRes?.userInfo?.gender == "男" ? 0 : 1,
          headImgUrl: getUserInfoRes?.userInfo?.avatarUrl,
          openId: getUserInfoRes?.userInfo?.openId,
          unionId: "",
          access_token: access_token,
          appLoginType: value,
        };
      }

      this.$store.dispatch("User/login", this.userInfo);
      await switchTab(ROUTES.SHOP);
    },
  },
};
</script>

<style></style>
