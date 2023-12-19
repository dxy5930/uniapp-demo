<template>
	<div>
		<u-tabs
			:current="activeTabIndex"
			:list="tabs"
			keyName="title"
			@click="handleTabClick"
		></u-tabs>
		<swiper-list
			:list="tabs"
			:current="activeTabIndex"
			@onSwiperChange="handleSwiperChange"
			@refresh="onRefresherRefresh"
		></swiper-list>
	</div>
</template>

<script>
	import SwiperList from "../../components/SwiperList/SwiperList";
	import { getClassificationList } from "../../http/api";
	const arr = [{ label: "老数据" }];
	const newarr = [{ label: "新数据" }];
	export default {
		components: {
			SwiperList,
		},
		data() {
			return {
				tabs: [
					{ id: 1, title: "Tab 1", data: [] },
					{ id: 2, title: "Tab 2", data: [] },
					{ id: 3, title: "Tab 3", data: [] },
				],
				activeTabIndex: 0,
			};
		},
		mounted() {
			this.tabs.forEach(res => {
				res.loading = false;
			});
			this.loadData(this.activeTabIndex);
		},
		methods: {
			handleTabClick(tab) {
				console.log(tab);
				const { index } = tab;
				this.activeTabIndex = index;
				this.loadData(this.activeTabIndex);
			},
			handleSwiperChange(current) {
				this.activeTabIndex = current;
				this.loadData(this.activeTabIndex);
			},
			async loadData(index) {
				const res = await getClassificationList();
				const tab = this.tabs[index];
				if (tab && tab.data.length === 0) {
					// 发起接口请求，获取数据
					// 假设使用 axios 进/////行异步请求
					setTimeout(() => {
						tab.data = arr;
					}, 1000);
				}
			},
			loadMore(index) {
				const tab = this.tabs[index];
				if (tab) {
					// 模拟加载更多数据
					if (!this.tabs[index].loading && tab.data.length < 50) {
						this.tabs[index].loading = true;
						setTimeout(() => {
							tab.data.push(...arr);
							this.tabs[index].loading = false;
						}, 1000);
					}
				}
			},

			onRefresherRefresh(index) {
				const activeTab = this.tabs[this.activeTabIndex];
				if (activeTab) {
					// 发起接口请求，刷新数据
					// 假设使用 axios 进行异步请求
					setTimeout(() => {
						activeTab.data.unshift(...newarr);
					}, 1000);
				}
			},
		},
	};
</script>

<style scoped></style>
