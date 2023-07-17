# App热更新

App热更新模块，支持apk安装以及wgt升级，支持显示弹窗升级、静默更新以及强制更新，支持进度显示，支持覆盖原生tabbar、原生导航栏。
可用于自建热更新渠道，不依赖于云服务，无云服务费用支出，也可以适配官方更新中心。

## 使用说明
### 1.将此项目导入自己的项目工程
### 2.在page.json中注册页面，如下
  ```javascript
    {
      "path": "uni_modules/guyue-updater/pages/updater",
      "style": {
        "navigationStyle": "custom",
        "backgroundColor": "transparent",
        "disableScroll": true,
        "app-plus": {
          "backgroundColorTop": "transparent",
          "background": "transparent",
          "scrollIndicator": false,
          "titleNView": false,
          "popGesture": "none",
          "bounce": "none",
          "animationType": "fade-in",
          "animationDuration": 200
        }
      }
    }
  ```
### 3.将版本检测函数导入需要使用的页面
  一般在App.vue中的onLaunch导入或者首页导入，需要自行完成热更新检查，一般在APP启动时发起一个请求获取热更新数据，数据获取后，可以调用该组件完成更新。
  ```javascript
    import Updater from '@/uni_modules/guyue-updater/index';

    Updater.update({
    	title: '发现新版本',
    	content: '1. 我们更新了新的UI设计\n2. 我们更新了新的UI设计\n3. 我们更新了新的UI设计\n4. 我们更新了新的UI设计\n',
      versionName: '1.3.6',
      downUrl: 'https://cdn.xxx.cn/mp/__UNI__1F29D65.wgt',
      force: false,
    })
  ```
## 参数说明
```javascript
export type UpdateParams = {
	content: string; // 必填，更新内容，内容中使用 \n 进行换行
	downUrl: string; // 必填，wgt热更新请给出 .wgt 的文件地址，APK整包更新请设置下载apk地址，ios请设置苹果商店的连接地址;
	title?: string; // 用于显示弹窗标题，默认 发现新版本
  versionName?: string; // 版本名，用于显示更新版本，如 1.0.0
  quiet?: boolean; // 是否是静默更新，开启后，不会有弹窗，会在后台下载更新文件，在下次启动APP时使用更新
  force?: boolean; // 是否是强制更新，开启后，弹窗无法被关闭，必须更新
	updateBtnText?: string; // 升级按钮文字，默认 立即升级
	downMsgTip?: string; // 仅android，默认 下载中，请稍后
	downSucTip?: string; // 仅android，默认 下载完成，安装中
	downErrorTip?: string; // 仅android，默认 下载失败，请重试
}
```

## Android如何跳转到应用市场更新

downUrl 设置为应用市场的地址即可，如： market://details?id={这里写你的应用包名}

## iOS 如何跳转到AppStore

downUrl 设置为AppStore的地址即可，如： itms-apps://itunes.apple.com/cn/app/hello-uni-app/id1417078253