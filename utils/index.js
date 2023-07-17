/**
 * 
 Authored by xinyudai
 Email 1053227515@qq.com
 */

/** uniapp-api**/
/* eslint-disable */
/**常规页面跳转
 * @param {string} url - 跳转的路径
 * @param {object} params - 携带的参数
 * @return {Promise} -返回的promise对象
 * @throws {Error} - 可能会抛出的错误
 */
export function navigate(url, params = {}) {
  try {
    url += (url?.indexOf("?") < 0 ? "?" : "&") + param(params);

    return new Promise((resovle, reject) => {
      uni.navigateTo({
        url,
        success: (e) => {
          resovle(e);
        },
        fail: (e) => {
          reject(e);
        },
      });
    });
  } catch (e) {
    throw new Error("跳转失败");
  }
}

/**
 * 隐藏状态栏
 * @throws {Error} - 可能会抛出的错误
 */
export function hideStatusBar() {
  try {
    //#ifdef APP_PLUS
    plus.navigator.setFullscreen(true);
    //#endif
  } catch (error) {
    throw new Error("隐藏状态栏失败", error);
  }
}

/**
 * 横屏
 * @throws {Error} - 可能会抛出的错误
 * */
export function landscape() {
  try {
    //#ifdef APP_PLUS
    plus.screen.lockOrientation("landscape-secondary");
    plus.screen.lockOrientation("landscape-primary");
    //#endif
  } catch (error) {
    throw new Error("横屏失败", error);
  }
}

/**
 * 获取app信息
 * @return {Promise} - 返回app信息的Promise对象
 */
export function getAppInfo() {
  //#ifdef APP_PLUS
  return new Promise((resolve, reject) => {
    plus.runtime.getProperty(plus.runtime.appid, (info) => {
      resolve(info);
    });
  });
  //#endif
}

/**获取平台信息
 * @return {stirng} - 返回的平台： android；ios
 */
export function getPlatform() {
  return uni.getSystemInfoSync().platform;
}

/**
 * 安装app
 * @param {string} tempFilePath - app文件路径
 * @param {object} options - 安装选项
 * @param {function} cb - 安装回调函数
 */
export function installApp(tempFilePath, options, cb) {
  //#ifdef APP_PLUS
  plus.runtime.install(tempFilePath, options, cb());
  //#endif
}

/**拨打电话
 * @param {string} phone - 电话号码
 * @throws {Error} - 可能会抛出的错误
 */
export function phone(phone) {
  try {
    uni.makePhoneCall({
      phoneNumber: phone, // 电话号码
    });
  } catch (error) {
    throw Error("存储异常", error);
  }
}

/**
 * 同步存储
 * @param {string} key - 存储的键名
 * @param {any} value - 存储的值
 * @throws {Error} - 当存储异常时抛出错误
 */
export function setStorage(key, value) {
  try {
    uni.setStorageSync(key, value);
  } catch (e) {
    throw Error("存储异常", e);
  }
}

/**同步获取存储
 * @param {string} key - 需要获取的key值
 * @return {obejct} - 返回的json对象
 * @throws {Error} - 可能抛出的错误
 */
export function getStorage(key) {
  try {
    const res = uni.getStorageSync(key);
    return res;
  } catch (e) {
    throw Error("获取存储异常", e);
  }
}

/**
 * 同步移除所有存储
 * @param {string} key - 存储的键名
 * @throws {Error} - 当删除存储异常时抛出错误
 */
export function removeStorage(key) {
  try {
    uni.removeStorageSync(key);
  } catch (e) {
    throw Error("删除存储异常", e);
  }
}

/**
 * 登录
 * @param {string} provider - 登录方式
 * @return {Promise} - 返回登录code的Promise对象
 */
export function login(provider = "") {
  return new Promise((resolve, reject) => {
    uni.login({
      provider,
      success: (event) => {
        resolve(event);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**
 * 显示loading
 * @param {string} title - 标题内容
 * @param {boolean} mask - 是否显示遮罩层
 * @param {function} cb  - 成功回调函数
 */
export function loading(title, cb, mask = false) {
  uni.showLoading({
    title,
    mask,
    success: () => {
      cb();
    },
  });
}

/**
 * 关闭loading
 */
export function hideLoading() {
  uni.hideLoading();
}

/**
 * 显示模态框
 * @param {string} title - 提示的标题
 * @param {string} content - 提示的内容
 * @param {function} confirm - 为 true 时，表示用户点击了确定按钮
 * @param {function} cancel - 为 true 时，表示用户点击了取消
 * @param {boolean} showCancel - 是否显示取消按钮，默认为 true
 * @param {string} cancelText - 取消按钮的文字，默认为"取消"
 * @param {string} cancelColor - 取消按钮的文字颜色，默认为"#000000"
 * @param {string} confirmText - 确定按钮的文字，默认为"确定"
 * @param {string} confirmColor - 确定按钮的文字颜色
 */
export function showModal(
  title,
  content,
  confirm,
  cancel,
  showCancel = true,
  cancelText = "取消",
  cancelColor = "#000000",
  confirmText = "确定",
  confirmColor = "#007aff"
) {
  uni.showModal({
    title,
    content,
    showCancel,
    cancelText,
    cancelColor,
    confirmText,
    confirmColor,
    success: function (res) {
      if (res.confirm) {
        console.log("用户点击确定");
        confirm();
      } else if (res.cancel) {
        console.log("用户点击取消");
        cancel();
      }
    },
  });
}

/**
 * 获取用户信息
 * @param {string} provider - 登录方式
 * @returns {Promise} - 返回登录code的Promise对象
 */
export function getUserInfo(provider = "") {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      provider,
      success: (e) => {
        resolve(e);
      },
      fail: (e) => {
        reject(e);
      },
    });
  });
}

/**关闭启动屏
 * @throws {error} - 可能会抛出的错误
 */
export function closeSplashScreen() {
  try {
    //#ifdef APP_PLUS
    // 如果是APP，则关闭启动屏
    plus.navigator.closeSplashscreen();
    //#endif
  } catch (e) {
    throw Error("关闭启动屏异常", e);
  }
}

/**打开文档
 * @param {string} fileUrl - 文件地址
 * @param {steing} fileType - 文件类型
 * @return {Promise} - 返回分享结果的Promise对象
 */
export function openDocument(fileUrl, fileType) {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url: fileUrl,
      success: (res) => {
        var filePath = res.tempFilePath;
        uni.openDocument({
          fileType,
          filePath: filePath,
          showMenu: false,
          success: (res) => {
            resolve(res);
          },
          fail: (res) => {
            reject(res);
          },
        });
      },
    });
  });
}

/**设置导航栏标题
 * @param {string} title - 导航栏标题字符串
 * @throws {Error} - 当标题设置异常时抛出错误
 */
export function setNavbarTitle(title) {
  try {
    uni.setNavigationBarTitle({
      title,
    });
  } catch (e) {
    throw Error("标题设置异常", e);
  }
}

/**复制
 * @param {string} data - 复制文本字符串
 * @throws {Error} - 当标题设置异常时抛出错误
 */
export function copy(data) {
  try {
    uni.setClipboardData({
      data,
      success: function () {
        toast("复制成功");
      },
      fail: (e) => {
        toast("复制失败");
      },
    });
  } catch (e) {
    throw Error("复制失败", e);
  }
}

/**上传
 * @param {string} imgUrl - 图片地址
 * @param {stirng} uploadUrl - 上传地址
 * @return {Promise} - 返回分享结果的Promise对象
 */
export function upload(imgUrl, uploadUrl) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: uploadUrl,
      filePath: imgUrl,
      name: "all",
      success: (res) => {
        resolve(res.data.data);
      },
      fail: (res) => {
        reject(res);
      },
    });
  });
}

/**下载文件
 * @param {string} fileUrl - 文件地址
 * @param {function} cb - 下载进度回调函数
 * @return {Promise} - 返回分享结果的Promise对象
 */
export function downloadFile(fileUrl, cb) {
  return new Promise((resolve, reject) => {
    const downloadTask = uni.downloadFile({
      url: fileUrl,
      success: (res) => {
        resolve({
          statusCode: res.statusCode,
          progress: 100, // 下载完成时的进度为 100
          filePath: res.filePath,
          tempFilePath: res.tempFilePath,
        });
      },
      fail: (res) => {
        reject(res);
        toast("下载失败，请重试");
      },
    });

    const handleProgressUpdate = (res) => {
      if (res.progress == 100) {
        toast("下载完成");
      }
      if (cb && typeof cb === "function") {
        cb(res);
      }
    };
    downloadTask.onProgressUpdate(handleProgressUpdate);
  });
}

/**保存文件
 * @param {string} fileUrl - 文件地址
 * @return {Promise} - 返回分享结果的Promise对象
 */
export function saveFile(fileUrl) {
  return new Promise((resolve, reject) => {
    // #ifndef MP-WEIXIN
    uni.saveFile({
      tempFilePath: fileUrl,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        toast("文件保存失败");
        reject(err);
      },
    });
    // #endif

    // 满足测试条件，取消下载任务。
    // if (res.progress > 50) {
    //   downloadTask.abort();
    // }
    // #ifdef MP-WEIXIN
    const FileSystemManager = wx.getFileSystemManager();
    FileSystemManager.saveFile({
      tempFilePath: fileUrl,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });

    // #endif
  });
}

/**预览图片
 * @param {array} urlList - 图片地址列表
 * @return {Promise} - 返回分享结果的Promise对象
 */
export function priviewImage(urlList) {
  return new Promise((resolve, reject) => {
    uni.previewImage({
      urls: urlList,
      longPressActions: {
        itemList: [],
        success: (data) => {
          resolve(data);
        },
        fail: (err) => {
          reject(err);
        },
      },
    });
  });
}

/**
 * 分享小程序
 * @param {string} provider - 分享平台
 * @param {string} scene - 分享场景
 * @param {number} type - 分享类型
 * @param {string} summary - 分享摘要
 * @return {Promise} - 返回分享结果的Promise对象
 */
export function share(
  provider = "weixin",
  scene = "WXSceneTimeline",
  type = 5,
  summary = "快来看！我在幼学口袋上发现......"
) {
  return new Promise((resolve, reject) => {
    uni.share({
      provider,
      scene,
      type,
      summary,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**清除所有缓存
 * @throws {error} -可能会抛出的错误
 */
export function clearStorage() {
  try {
    uni.clearStorageSync();
  } catch (e) {
    throw Error("删除所有存储异常");
  }
}

/** toast提示
 * @param {string} data - 提示内容
 * @param {number} duration - 显示时长
 * @throws {Error} - 可能会抛出的错误
 */
export function toast(data, duration = 2000) {
  try {
    uni.showToast({
      title: data,
      duration,
      icon: "none",
    });
  } catch (e) {
    throw new Error("uni.showToast()调用失败");
  }
}

/**
 * 停止下拉刷新
 */
export function stopPullFeresh() {
  try {
    uni.stopPullDownRefresh();
  } catch (e) {}
}

/**
 * 获取设备屏幕可用高度
 * @return {number} - 返回设备屏幕可用高度
 */
export function getScreenHeight() {
  return uni.getSystemInfoSync().windowHeight;
}

/**获取屏幕宽度
 * @return {number} - 返回设备屏幕宽度
 */
export function getScreenWidth() {
  return uni.getSystemInfoSync().windowWidth;
}

/**
 * 关闭所有页面，跳转到某一页面
 * @param {string} url - 跳转的url
 * @param {object} params - 跳转的参数
 */
export function reLaunch(url, params = {}) {
  try {
    url += (url?.indexOf("?") < 0 ? "?" : "&") + param(params);
    uni.reLaunch({
      url,
    });
  } catch (e) {
    throw new Error("跳转失败");
  }
}

/**跳转到tabbar页面
 * @param {string} url - tabbar页面路径
 * @throws {Error} - 可能会抛出错误
 */
export function switchTab(url) {
  try {
    return new Promise((resovle, reject) => {
      uni.switchTab({
        url, // 跳转的url
        success: (e) => {
          resovle(e); // 成功回调
        },
        fail: (e) => {
          reject(e); // 失败回调
        },
      });
    });
  } catch (e) {
    throw new Error("跳转失败");
  }
}

/**返回
 * @param {number} delta - 返回的层数
 * @throws {Error} - 可能会抛出错误
 */
export function navigateBack(delta = 1) {
  try {
    uni.navigateBack({
      delta,
    });
  } catch (e) {
    throw new Error("跳转失败");
  }
}

/**
 * 重定向跳转
 * @param {string} url - 跳转的url
 * @param {object} params - 跳转的参数
 * @return {Promise} - 返回跳转结果的Promise对象
 */
export function redirectTo(url, params = {}) {
  try {
    url += (url?.indexOf("?") < 0 ? "?" : "&") + param(params);
    return new Promise((resovle, reject) => {
      uni.redirectTo({
        url,
        success: (e) => {
          resovle(e);
        },
        fail: (e) => {
          reject(e);
        },
      });
    });
  } catch (e) {
    throw new Error("跳转失败");
  }
}

/**
 * 获取当前路由
 * @return {string} - 返回当前路由
 */
export function getCurrentPage() {
  let routes = getCurrentPages();
  let currentRoute = routes[routes.length - 1].route;
  return currentRoute;
}

/** 原生js部分**/

/** 格式化参数对象
 * @param {obejct} data- 需要格式化的对象
 * @return {string} - 返回url
 */
export function param(data) {
  let url = "";
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : "";
    url += "&" + k + "=" + value;
  }
  return url ? url.substring(1) : "";
}

/**
 * 对数组进行排序
 * @param {array} arr - 需要排序的数组
 * @param {string} property - 排序的依据字段
 * @param {boolean} desc - 是否降序，默认为false
 * @return {array} - 排序之后的数组
 */
export function sort(arr, property, desc = false) {
  return arr.sort(function (a, b) {
    const val1 = a[property];
    const val2 = b[property];
    if (desc) {
      return val2.localeCompare(val1);
    } else {
      return val1.localeCompare(val2);
    }
  });
}

/** 编码数据
 * @param {object} e - 需要编码的数据
 * @return {string} - 返回编码之后的数据
 */
export function encode(e) {
  try {
    return encodeURIComponent(JSON.stringify(e));
  } catch {
    throw new Error("编码失败");
  }
}

/** 解码数据
 * @param {string} e - 需要解码的数据
 * @return {object} - 返回解码之后的数据
 */
export function decode(e) {
  try {
    return JSON.parse(decodeURIComponent(e));
  } catch {
    throw new Error("解码失败");
  }
}

/** 分组
 * @param {array} arr - 需要分组的数组
 * @param {string} property - 分组的依据字段
 * @return {array} - 分组之后的数组
 */
export function group(arr, property) {
  let map = {};
  for (let i = 0; i < arr.length; i++) {
    const ai = arr[i];
    if (!map[ai[property]]) map[ai[property]] = [ai];
    else map[ai[property]].push(ai);
  }
  let res = [];
  Object.keys(map).forEach((key) => {
    res.push({
      [property]: key,
      data: map[key],
    });
  });
  return res;
}

/**
 * 判断数据是否为空
 * @param {any} data - 需要判断的数据
 * @return {boolean} - 返回是否为空
 */
export function isEmpty(data) {
  switch (typeof data) {
    case "undefined":
      return true; // 未定义
    case "string":
      if (data.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true; // 字符串为空
      break;
    case "boolean":
      if (!data) return true; // 布尔值为false
      break;
    case "number":
      if (0 === data || isNaN(data)) return true; // 数字为0或NaN
      break;
    case "object":
      if (null === data || data.length === 0) return true; // 对象为null或长度为0
      for (var i in data) {
        return false; // 对象不为空
      }
      return true;
  }
  return false; // 其他情况不为空
}

/**  普通数组去重
 * @param {array} arr - 需要去重的数组
 * @return {array} - 去重之后的数组
 */
export function reduce(data) {
  if (isEmpty(data)) return;
  return [...new Set(data)];
}

/**  数组对象去重
 * @param {array} arr - 需要去重的数组
 * @return {array} - 去重之后的数组
 */
export function mapReduce(arr, field) {
  let obj = {};
  return arr.reduce(
    (pre, cur) =>
      obj[cur.field] ? pre : (obj[cur.field] = true && [...pre, cur]),
    []
  );
}

/**
 * 判断数据类型
 * @param {any} data - 需要判断的数据
 * @return {string} - 返回数据类型
 */
export function judgeType(data) {
  return Object.prototype.toString.call(data);
}

/** 格式化时间
 * @param {string} formater - 目标格式
 * @param {string} t - 需要格式化的时间
 * @return {string} - 返回格式化之后的时间
 */
export function dateFormater(formater = "YYYY-MM-DD HH:mm:ss", t) {
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + "",
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater
    .replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? "0" : "") + M)
    .replace(/DD/g, (D < 10 ? "0" : "") + D)
    .replace(/HH|hh/g, (H < 10 ? "0" : "") + H)
    .replace(/mm/g, (m < 10 ? "0" : "") + m)
    .replace(/ss/g, (s < 10 ? "0" : "") + s);
}

/**
 * 返回指定范围之间的随机数
 * @param {number} lower - 下限
 * @param {number} upper - 上限
 * @return {number} - 返回随机数
 */
export function random(lower, upper) {
  lower = +lower || 0;
  upper = +upper || 0;
  return Math.random() * (upper - lower) + lower;
}

/** 指定层数扁平化数组
 * @param {array} array - 需要扁平化的数组
 * @param {number} layers - 扁平层数
 * @return {array} - 返回新数组
 */
export function flatArray(array = [], layers = 1) {
  return array.flat(layers);
}

/** 无限数组扁平化
 * @param {array} array - 需要扁平化的数组
 * @return {array} - 返回新数组
 */
export function flatArrayInfinity(array = []) {
  return array.flat(Infinity);
}

/** 数组之间的交集
 * @param {array} a - 数组a
 * @param {array} b - 数组b
 * @return {array} - 返回新数组
 */
export function intersection(a, b) {
  const s = new Set(b);
  return a.filter((x) => s.has(x));
}

/** 去除字符串所有空格
 * @param {string} data - 需要去除的字符串
 * @return {string} - 返回去除之后的字符串
 */
export function trimAll(data) {
  return data.trim();
}

/** 去除开头的空格
 * @param {string} data - 需要去除的字符串
 * @return {string} - 返回去除之后的字符串
 */
export function trimS(data) {
  return data.trimStart();
}

/** 去除结尾的空格
 * @param {string} data - 需要去除的字符串
 * @return {string} - 返回去除之后的字符串
 */
export function trimE(data) {
  return data.trimEnd();
}

/**
 * 校验身份证号码
 * @param {string} num - 需要校验的身份证号码
 * @return {boolean} - 返回校验结果，true为合法，false为不合法
 */
export function isIdCardNo(num) {
  return /^[1-9][0-9]{5}(18|19|(2[0-9]))[0-9]{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)[0-9]{3}[0-9Xx]$/.test(
    num
  );
}

/**
 * 校验电话号码
 * @param {string} str - 需要校验的电话号码
 * @return {boolean} - 返回校验结果，true为合法，false为不合法
 */
export function isMobile(str) {
  if (!/^([0-9]{3,4})?[0-9]{7,8}$|^([0-9]{3,4}-)?[0-9]{7,8}$/.test(str)) {
    return false;
  }
  return true;
}

/** 手机号脱敏
 * @param {string} mobile - 需要脱敏的手机号
 * @return {string} - 返回脱敏的手机号
 */
export function hideMobile(mobile) {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
}

/** 判断是否是4位数验证码
 * @param {string} code - 需要校验的验证码
 * @return {boolean} - 返回校验结果，true为合法，false为不合法
 */
export function isVerificationCode(code, digit = 4) {
  return new RegExp(`^[0-9]{${digit}}$`).test(code);
}

/**
 * 校验电子邮件
 * @param {string} str - 需要校验的电子邮件
 * @return {boolean} - 返回校验结果，true为合法，false为不合法
 */
export function isEmail(str) {
  var result = str.match(
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  );
  if (result == null) return false;
  return true;
}

/** 数组对象根据指定字段去重
 * @param {array} arr - 数组
 * @param {string} key - key值
 * @return {array} - 返回去重数组
 */
export function uniqueArrayObject(arr = [], key = "id") {
  if (arr.length === 0) return;
  let list = [];
  const map = {};
  arr.forEach((item) => {
    if (!map[item[key]]) {
      map[item[key]] = item;
    }
  });
  list = Object.values(map);
  return list;
}

/**
 * 拆分整数和小数
 * @param {number} tranvalue - 需要拆分的数值
 * @return {array} - 返回一个数组，第一个元素为整数部分，第二个元素为小数部分
 */
export function splits(tranvalue) {
  var value = new Array("", "");
  let str = tranvalue.toString();
  temp = str.split(".");
  for (var i = 0; i < temp.length; i++) {
    value = Number(temp);
  }
  return value;
}

/**dom操作**/
/** 返回顶部*/
export function scrollToTop() {
  var c = document.documentElement.scrollTop || document.body.scrollTop;

  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}

/**
 * 滚动到元素位置
 * @param {string} element - 元素选择器
 * @return {void}
 * @example smoothScroll('#target');
 */
export function smoothScroll(element) {
  const query = uni.createSelectorQuery();
  query
    .select(element)
    .boundingClientRect((data) => {
      let pageScrollTop = Math.round(data.top);
      uni.pageScrollTo({
        scrollTop: pageScrollTop, //滚动的距离
        duration: 100, //过渡时间
      });
    })
    .exec();
}
