<template>
  <view class="content vertical-center">
    <u-empty :mode="mode" :icon="icon"> </u-empty>
  </view>
</template>

<script>
export default {
  name: "Empty",
  props: {
    mode: {
      type: String,
      default: "data",
    },
    icon: {
      type: String,
      default: "http://cdn.uviewui.com/uview/empty/data.png",
    },
  },
  data() {
    return {};
  },
  onLoad() {},
  methods: {},
};
</script>

<style>
.content {
  width: 100%;
  height: 100%;
}
</style>
