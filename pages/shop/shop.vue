<template>
	<view>
		<view class="comments">
			<view class="comments-items" v-for="(item, index) in commentContents" :key="index">
				<image :src="item.face" class="comments-face"></image>
				<view class="comments-body">
					<view class="comments-header">{{item.name}}</view>
					<view class="comments-content">
						{{item.content}}
					</view>

					<view class="comments-info">
						<text class="grey" style="font-size: 24rpx;">昨天 19:30</text>
						<text class="comments-replay-btn" @click="replay()">回复</text>
					</view>

					<view class="comments-reply">

						<view class="reply">

							<view class="comments-items " v-for="(item2, index2) in item.reply" :key="index2">
								<image :src="item2.face" class="comments-face"></image>
								<view class="comments-body">
									<view class="comments-header">
										{{item2.name}}
										<template v-if="item2.reply_name">
											<svg t="1600674701420" class="icon reply-more-icon-rotate"
												viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
												p-id="3631" width="14" height="14">
												<path
													d="M113.27683429 155.94627634l799.4199333 0c44.24124361 0 80.02419363 35.50497793 80.02419365 79.74225054 0 20.57390573-7.89043628 39.17023849-20.57390572 53.25945242l-395.33984827 527.4996929c-26.49074017 34.93712067-76.36290417 42.2676418-111.58990998 15.78087266-6.20274865-4.5110899-11.55172587-9.86403813-15.78087266-15.78087266L49.59342845 283.31308797c-26.20482607-34.9410917-19.15624802-85.09519879 16.0628158-111.30399583C80.03137236 161.01728144 96.65410329 155.94627634 113.27683429 155.94627634L113.27683429 155.94627634z"
													p-id="3632" fill="#B7B7B7"></path>
											</svg>
											{{item2.reply_name}}
										</template>
									</view>
									<view class="comments-content">
										{{item2.content}}
									</view>

									<view class="comments-info">
										<text class="grey" style="font-size: 24rpx;">昨天 19:30</text>
										<text class="comments-replay-btn" @click="replay(item2.name)">回复</text>
									</view>

								</view>
							</view>
						</view>


					</view>


					<view class="comments-more" @click="showMore()">
						<text style="margin-right: 10rpx;font-size:36rpx;">—</text>
						<text v-if="loadingState=='loadmore'">展开3条回复</text>
						<text v-if="loadingState!='loadmore'">{{loadingState=="nomore"?"收起":"展开更多"}}</text>
						<svg t="1600674701420" class="icon comments-more-icon"
							:class="{'comments-more-icon-rotate':loadingState=='nomore'}" viewBox="0 0 1024 1024"
							version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3631" width="14" height="14">
							<path
								d="M113.27683429 155.94627634l799.4199333 0c44.24124361 0 80.02419363 35.50497793 80.02419365 79.74225054 0 20.57390573-7.89043628 39.17023849-20.57390572 53.25945242l-395.33984827 527.4996929c-26.49074017 34.93712067-76.36290417 42.2676418-111.58990998 15.78087266-6.20274865-4.5110899-11.55172587-9.86403813-15.78087266-15.78087266L49.59342845 283.31308797c-26.20482607-34.9410917-19.15624802-85.09519879 16.0628158-111.30399583C80.03137236 161.01728144 96.65410329 155.94627634 113.27683429 155.94627634L113.27683429 155.94627634z"
								p-id="3632" fill="#B7B7B7"></path>
						</svg>
					</view>
				</view>
			</view>
		</view>
		<view class="comment_input">

		</view>
	</view>
</template>

<script>

	export default {
	
		data() {
			return {
				loadingState: 'loadmore', //加载前值为loadmore，没有数据为nomore
				commentContents: [{
					"content": "故国三千里，深宫二十年。一声何满子，双泪落君前。",
					"name": " - 小码",
					"face": "https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png",
					"date": "08/10 08:00",
					"reply": [{
						"content": "故国三千里，深宫二十年。一声何满子，双泪落君前。",
						"name": " - 小码",
						"reply_name": "",
						"face": "https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png",
						"date": "08/10 08:00",
					}]
				}, {
					"content": "故国三千里，深宫二十年。一声何满子，双泪落君前。",
					"name": " - 小码",
					"face": "https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png",
					"date": "08/10 08:00",
					"reply": [{
						"content": "故国三千里，深宫二十年。一声何满子，双泪落君前。",
						"name": " - 小码",
						"reply_name": " - 大码",
						"face": "https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png",
						"date": "08/10 08:00",
					}, {
						"content": "故国三千里，深宫二十年。一声何满子，双泪落君前。",
						"name": " - 小码",
						"reply_name": "",
						"face": "https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png",
						"date": "08/10 08:00",
					}]
				}, ]
			};
		},
		methods: {
			replay(replayName) {
				console.log(replayName);
			},
			showMore() {
				console.log('加载更多')
			}
		},

	}
</script>

<style lang="less">
	.grey {
		color: #999999;
	}

	.common_flex {
		display: flex;
		font-weight: normal;
	}

	.comments {

		.comments-items {
			display: flex;
			margin-bottom: 32rpx;

			.comments-face {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}

			.comments-body {
				width: calc(100% - 100rpx);
				padding-left: 16rpx;

				.comments-header {
					margin-top: 8rpx;
					margin-bottom: 8rpx;
					color: #8D8C91;
					font-weight: bold;
				}

				.comments-info {
					margin-top: 8rpx;

					.comments-replay-btn {
						color: #8E8D95;
						margin-left: 32rpx;
						font-weight: bold;
						letter-spacing: 2rpx;
					}
				}

				.comments-reply {
					margin-top: 16rpx;
				}

				.comments-more {
					margin-top: 8rpx;
					color: #999999;
					word-spacing: 10rpx;
					display: flex;
					align-items: center;

					.comments-more-icon {
						margin-left: 8rpx;

					}

					.comments-more-icon-rotate {
						transform: rotate(180deg);
					}
				}
			}

		}
	}


	.reply {

		.comments-items {
			margin-bottom: 8rpx;

			.comments-face {
				width: 70rpx;
				height: 70rpx;
			}

			.comments-body {
				.comments-header {
					font-size: 26rpx;
					display: flex;
					align-items: center;

					.reply-more-icon-rotate {
						transform: rotate(270deg);
						width: 24rpx;
						height: 24rpx;
						margin: 0 6rpx;
					}
				}



				.comments-content {
					font-size: 26rpx;
				}

				.comments-info {
					margin-top: 8rpx;

					.comments-replay-btn {
						font-size: 26rpx;
					}
				}


			}

		}
	}
</style>