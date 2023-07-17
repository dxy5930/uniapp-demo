<template>
  <view class="content">
    <!-- <view class="tab-box">
      <view
        class="title"
        :class="tabsIndex == 0 ? 'tabs-selected' : 'tabs-no-selected'"
        @click="tabsClick(0)"
        >手机登录
      </view>
      <view
        class="title"
        :class="tabsIndex == 1 ? 'tabs-selected' : 'tabs-no-selected'"
        @click="tabsClick(1)"
        >账号登录
      </view>
    </view> -->
    <view class="name">手机号</view>
    <view class="row-input">
      <input
        v-model="phone"
        @change="onPhoneChange"
        placeholder="请输入手机号"
        maxlength="11"
        placeholder-class="placeholder-input"
      />
    </view>
    <view class="row-input">
      <input
        v-model="code"
        :placeholder="tabsIndex == 0 ? '请输入验证码' : '请输入密码'"
        :password="tabsIndex == 0 ? false : true"
        maxlength="4"
        placeholder-class="placeholder-input"
        @change="onCodeChange"
      />
      <view v-if="tabsIndex == 0" class="code"
        ><u-code :seconds="seconds" ref="uCode" @change="codeChange"></u-code>
        <u-text @tap="getCode" :text="tips" type="error"></u-text>
      </view>
    </view>
    <view class="login-btn" @click="handleLogin">登录</view>
    <view class="agreement"
      >注册即同意
      <text class="link" @click="handleWebview('protocol')">用户协议</text
      >和<text class="link" @click="handleWebview('policy')">隐私政策</text>
    </view>
    <login class="third-login"></login>
  </view>
</template>

<script>
import {
  isEmpty,
  loading,
  switchTab,
  toast,
  hideLoading,
  navigate,
  isVerificationCode,
  isMobile,
} from "../../utils";
import { LOGIN_TYPE, ROUTES } from "../../constant/index";
import { mapActions } from "vuex";
import Login from "../../components/Login/Login";
export default {
  components: {
    Login,
  },
  data() {
    return {
      code: "",
      phone: "",
      tips: "",
      seconds: 20,
      tabsIndex: 0,
    };
  },
  onLoad() {},
  methods: {
    ...mapActions("User", ["login"]),
    async handleLogin() {
      if (isEmpty(this.phone) || !isMobile(this.phone)) {
        toast("请输入正确的手机号");
        return;
      }
      if (isEmpty(this.code) || !isVerificationCode(this.code, 4)) {
        toast("请输入正确的验证码");
        return;
      }
      const loginInfo = {
        nickName: this.phone,
        gender: "",
        headImgUrl: "",
        openId: "",
        unionId: "",
        access_token: "",
        appLoginType: LOGIN_TYPE.PHONE,
      };
      this.$store.dispatch("User/login", loginInfo);
      await switchTab(ROUTES.SHOP);
    },
    onCodeChange(e) {
      console.log("change", e);
    },
    onPhoneChange(e) {
      console.log("change", e);
    },
    codeChange(text) {
      this.tips = text;
    },
    tabsClick(index) {
      this.tabsIndex = index;
    },
    handleWebview(e) {
      navigate(ROUTES.WEBVIEW, { type: e });
    },
    getCode() {
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        loading("正在获取验证码");
        setTimeout(() => {
          hideLoading();
          // 这里此提示会被this.start()方法中的提示覆盖
          toast("验证码已发送");
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start();
        }, 2000);
      } else {
        toast("倒计时结束后再发送");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 150rpx 60rpx;

  .tab-box {
    display: flex;
    align-items: flex-end;

    .title {
      margin-right: 50rpx;
      height: 55rpx;
    }

    .tabs-no-selected {
      font-size: 32rpx;
    }

    .tabs-selected {
      font-size: 40rpx;
      font-weight: bold;
      border-bottom: 6rpx solid #fe8d85;
    }
  }

  .name {
    padding-top: 100rpx;
    font-size: 26rpx;
  }

  .row-input {
    display: flex;
    justify-content: space-between;
    height: 120rpx;
    border-bottom: 1rpx solid #dfdfdf;

    .placeholder-input {
      font-size: 28rpx;
      color: #c5c5c5;
    }

    input {
      height: 120rpx;
    }

    .code {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fe8d85;
      font-size: 26rpx;
    }
  }

  .login-btn {
    margin-top: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100rpx;
    background-color: #fe8d85;
    color: #ffffff;
    border-radius: 50rpx;
  }

  .agreement {
    display: flex;
    justify-content: center;
    letter-spacing: 5rpx;
    line-height: 100rpx;
    font-size: 24rpx;

    .link {
      color: #007aff;
      text-decoration: underline;
    }
  }
}
.third-login {
  margin: 200rpx auto 0;
}
</style>
