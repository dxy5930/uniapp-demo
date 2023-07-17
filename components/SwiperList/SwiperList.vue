<template>
  <swiper :current="current" @change="handleSwiperChange">
    <swiper-item v-for="(tab, index) in list" :key="index">
      <scroll-view
        style="height: 100vh; border: 1px solid #e00000"
        class="scroll-view"
        scroll-y
        refresher-enabled
        @scrolltolower="loadMore(index)"
        @refresherrefresh="refresh(index)"
      >
        <div v-for="(item, itemIndex) of tab.data" :key="itemIndex">
          {{ item.label }}
        </div>
        <div v-if="tab.loading">Loading more...</div>
      </scroll-view>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
  },

  methods: {
    refresh(index) {
      this.$emit("refresh", index);
    },
    handleSwiperChange(e) {
      this.$emit("onSwiperChange", e.detail.current);
    },
  },
};
</script>

<style scoped></style>
