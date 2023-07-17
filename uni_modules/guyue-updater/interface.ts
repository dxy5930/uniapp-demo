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
};
