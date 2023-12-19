<script>
	import { mapActions, mapState } from "vuex";
	import {
		setStorage,
		getAppInfo,
		getPlatform,
		switchTab,
		closeSplashScreen,
		redirectTo,
	} from "./utils/index";
	import { ROUTES } from "./constant/index";
	//#ifdef APP_PLUS
	import Updater from "./uni_modules/guyue-updater/index";
	//#endif

	export default {
		computed: {
			...mapState({
				hasLogin: state => state.User.isLoggedIn,
				userInfo: state => state.User.user,
			}),
		},
		methods: {
			...mapActions(["User", "login"]),
		},

		onLaunch: async function () {
			console.log("App Launch");
			console.log(
				"当前环境：-----------",
				this.$env[process.env.VUE_APP_ENV_TYPE].baseUrl
			);

			//#ifdef APP_PLUS
			/**判断用户登录 */
			// const userInfo = getStorage("user");
			console.log(this.hasLogin, this.userInfo);
			if (this.hasLogin) {
				this.$store.dispatch("User/login", this.userInfo);
				await switchTab(ROUTES.INDEX);
			} else {
				await redirectTo(ROUTES.LOGIN);
			}
			closeSplashScreen();
			//#endif
			/**更新弹框 */
			//#ifdef APP_PLUS
			const platform = getPlatform();
			const appInfo = await getAppInfo();
			setStorage("version", appInfo.version);
			Updater.update({
				title: "发现新版本",
				content:
					"1. 我们更新了新的UI设计\n2. 我们更新了新的UI设计打大叔大叔大叔的设计打大叔大叔大叔的\n3. 我们更新了新的UI设计\n4. 我们更新了新的UI设计\n5. 我们更新了新的UI设计",
				versionName: "1.0.1",
				downUrl:
					platform.toLocaleLowerCase() == "android"
						? "https://updatetest.inhandle.com/apk/class/gunqiuyouxi.apk"
						: "itms-apps://itunes.apple.com/cn/app/id1288515707",
				force: false,
			});
			// 安卓热更新'https://cdn.xxx.cn/mp/__UNI__1F29D65.wgt',
			// 安卓强更 market://details?id={这里写你的应用包名}
			// 苹果市场 itms-apps://itunes.apple.com/cn/app/hello-uni-app/id1417078253
			//#endif
		},
		onShow: function () {
			console.log("App Show");
		},
		onHide: function () {
			console.log("App Hide");
		},
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
