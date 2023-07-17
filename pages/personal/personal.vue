<template>
  <view class="content">
    <empty v-if="!user"></empty>
    <view v-else>
      <view>姓名：{{ user.nickName }}</view>
      <view>性别：{{ gender }}</view>
      <u-image :src="user.headImgUrl"></u-image>
      <view>登录方式:{{ user.appLoginType }}</view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import { GENDER, ROUTES } from "../../constant";
import { navigate } from "../../utils/index";
import Empty from "../../components/Empty/Empty";
export default {
  components: {
    Empty,
  },
  data() {
    return {};
  },
  computed: {
    gender() {
      return GENDER[this.user.gender] ?? "男";
    },
    ...mapState({
      user: (state) => state.User.user,
    }),
  },

  onLoad() {
    console.log(this.user);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.content {
  height: 100%;
}
</style>
