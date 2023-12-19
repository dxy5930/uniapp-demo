<template>
	<view class="container">
		<view class="main" @tap.stop>
			<view class="header">
				<image src="../assets/bg1.png" class="bg1" />
				<image src="../assets/bg2.png" class="bg2" />
				<view class="version-title">{{ updateParams.title }}</view>
				<view class="version-name" v-if="updateParams.versionName">V{{ updateParams.versionName }}</view>
			</view>
			<view class="title">更新内容:</view>
			<scroll-view scroll-y class="content" @touchmove.stop>{{sanitizedContent}}</scroll-view>

			<view class="progress" v-if="downloading">
				<view class="slider">
					<view class="active-slider" :style="{ width: `${progress}%` }">
						<view class="bar" />
						<view class="dot">
							<view class="text">{{ progress }}%</view>
							<view class="circle" />
						</view>
					</view>
				</view>
			</view>
			<view class="button" :class="{ active: !downloading || downloadError }" @click="handleButton">
				{{ downloadText }}
			</view>
		</view>
		<view class="bottom" v-if="!updateParams.force" @click="back">
			<view class="line" />
			<image src="../assets/close.png" class="close" />
		</view>
	</view>
</template>

<script>
	import {
		download,
		install
	} from "../updater";

	export default {
		data() {
			return {
				updateParams: {},
				progress: 0,
				downloading: false,
				downloadSucc: false,
				downloadError: false,
			};
		},
		computed: {
			sanitizedContent() {
				const content = this.updateParams.content || "";
				return content;
			},
			downloadText() {
				if (this.downloadSucc) {
					return this.updateParams.downSucTip;
				}
				if (this.downloadError) {
					return this.updateParams.downErrorTip;
				}
				if (this.downloading) {
					return this.updateParams.downMsgTip;
				}
				return this.updateParams.updateBtnText;
			},
		},
		onLoad(params) {
			const data = {
				title: "发现新版本",
				updateBtnText: "立即升级",
				downMsgTip: "下载中，请稍后",
				downSucTip: "下载完成，安装中",
				downErrorTip: "下载失败，请重试",
				quiet: false,
				force: false,
				...JSON.parse(decodeURIComponent(params.data)),
			};
			this.updateParams = data;
		},
		onBackPress() {
			return this.updateParams.force;
		},
		methods: {
			back() {
				if (!this.updateParams.force) {
					uni.navigateBack();
				}
			},
			// 开始更新
			start() {
				if (!this.updateParams.downUrl) {
					return;
				}

				// ios 跳转到appstore，.apk、.wgt 直接安装更新
				const isResource = [".apk", ".wgt"].some((ext) =>
					this.updateParams.downUrl.toLocaleLowerCase().includes(ext)
				);
				if (plus.os.name !== "Android" || !isResource) {
					plus.runtime.openURL(this.updateParams.downUrl);
					return;
				}

				this.downloading = true;
				const self = this;

				download({
					url: self.updateParams.downUrl,
					onProgress(progress) {
						self.progress = progress;
					},
					onSuccess(filePath) {
						self.downloadSucc = true;
						self.downloadError = false;
						install(filePath, true);
					},
					onFail() {
						self.downloading = false;
						self.downloadSucc = false;
						self.downloadError = true;
					},
				});
			},
			handleButton() {
				console.log(this.updateParams)
				if (!this.downloading) {
					return this.start();
				}
				if (this.downloadError) {
					this.progress = 0;
					this.downloading = false;
					this.downloadSucc = false;
					this.downloadError = true;
					return this.start();
				}
			},
		},
	};
</script>

<style lang="less">
	page {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0);
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.main {
		width: 75%;
		background-color: #fff;
		border-radius: 8rpx;
		padding-bottom: 10rpx;
	}

	.header {
		position: relative;

		.bg1 {
			width: 100%;
			height: calc(100vw * 0.375);
			border-top-left-radius: 8rpx;
			border-top-right-radius: 8rpx;
		}

		.bg2 {
			position: absolute;
			top: -40%;
			right: 13%;
			width: 35.9%;
			height: calc(100vw * 0.5441);
		}

		.version-title {
			position: absolute;
			top: 13%;
			left: 8%;
			color: #961c00;
			font-size: 40rpx;
		}

		.version-name {
			position: absolute;
			top: 36%;
			left: 24%;
			background-color: #e54139;
			color: #fff;
			font-size: 26rpx;
			line-height: 26rpx;
			padding: 8rpx 20rpx;
			border-radius: 20rpx;
		}
	}

	.title {
		background-color: #ff6d42;
		color: #fff;
		display: inline-block;
		margin-top: 12rpx;
		margin-left: 30rpx;
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 8rpx 20rpx;
		border-radius: 8rpx;
	}

	.content {
		width: calc(100% - 60rpx);
		margin: 12rpx auto 0;
		font-size: 28rpx;
		line-height: 2;
		max-height: 240rpx;
		white-space: pre-wrap;
	}

	.button {
		margin: 20rpx 30rpx;
		background-color: #ffaa00;
		color: #fff;
		font-size: 30rpx;
		text-align: center;
		padding: 20rpx 0;
		border-radius: 14rpx;
		opacity: 0.5;
		pointer-events: none;

		&:active {
			opacity: 0.6;
		}

		&.active {
			opacity: 1;
			pointer-events: initial;
		}
	}

	.progress {
		padding: 50rpx 50rpx 18rpx;

		.slider {
			position: relative;
			width: 100%;
			height: 10rpx;
			border-radius: 5rpx;
			background-color: #e2e2e2;

			.active-slider {
				display: flex;
				flex-direction: row;
				align-items: center;
				position: absolute;
				left: 0;
				top: 0;
				width: 0%;
				height: 10rpx;
				border-radius: 5rpx;

				.bar {
					flex: 1;
					height: 100%;
					background-color: #e84116;
					border-top-left-radius: 5rpx;
					border-bottom-left-radius: 5rpx;
				}

				.dot {
					position: relative;
					margin-left: -12rpx;

					.text {
						position: absolute;
						top: -34rpx;
						left: -50%;
						color: #e84116;
						font-size: 24rpx;
						font-weight: 500;
					}

					.circle {
						width: 12rpx;
						height: 12rpx;
						border: 6rpx solid #e84116;
						border-radius: 50%;
						background-color: #fff;
					}
				}
			}
		}
	}

	.bottom {
		display: flex;
		flex-direction: column;
		align-items: center;

		.line {
			width: 3rpx;
			height: 50rpx;
			background-color: #fff;
		}

		.close {
			width: 64rpx;
			height: 64rpx;
			margin-top: -4rpx;
		}
	}
</style>