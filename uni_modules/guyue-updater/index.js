import { getCurrentPage } from "../../utils";
import { download, install } from "./updater";

export default class Updater {
  static update(options) {
    // 静默更新
    if (options.quiet) {
      download({
        url: options.downUrl,
        onSuccess(filePath) {
          install(filePath, false);
        },
      });
    } else if (options.downUrl) {
      if (getCurrentPage().includes("login")) return;
      uni.navigateTo({
        url: `/uni_modules/guyue-updater/pages/updater?data=${encodeURIComponent(
          JSON.stringify(options)
        )}`,
        animationType: "fade-in",
        animationDuration: 200,
      });
    }
  }
}
