<template>
  <view>
    <web-view :src="url" :style="{ height: height + 'px' }"></web-view>
  </view>
</template>

<script>
import { getScreenHeight } from "../../utils/index.js";
export default {
  props: {
    url: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      height: 0,
    };
  },
  onLoad() {},
  onReady() {
    this.height = getScreenHeight();
  },
  methods: {
    showWebview() {
      const self = this;
      uni.loadSubPackage({
        root: "webview",
        complete() {
          self.url = "../../static/WebTest/index.html";
        },
      });
    },
  },
};
</script>

<style></style>
