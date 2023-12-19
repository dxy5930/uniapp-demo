import axios from "axios";
import qs from "qs";
import Vue from "vue";
import settle from "axios/lib/core/settle";
import buildURL from "axios/lib/helpers/buildURL";
import { toast } from "../utils/index";
import { STATUSCODES } from "../constant";
import ENV_CONFIG from '../config/env'
import axiosRetry from 'axios-retry';

const service = axios.create({
  withCredentials: true,
  crossDomain: true,
  baseURL: baseURL,
  timeout: 6000,
});

let baseURL = ENV_CONFIG[process.env.VUE_APP_ENV_TYPE].baseUrl;


// 配置 Axios Retry
axiosRetry(service, {
  retries: 3, // 设置重试次数
  retryCondition: (error) => {
    // 指定需要重试的状态码
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      STATUSCODES.includes(error.response.status)
    );
  },
  retryDelay: (retryCount) => {
    // 设置重试延迟时间（毫秒）
    return retryCount * 1000;
  },
});

service.interceptors.request.use(
  (config) => {
    try {
      const { isRetry = false } = config;
      if (!isRetry) {
        axiosRetry(service, { retries: 0 }); // 禁用重试
      }

      const token = uni.getStorageSync("token");
      if (token) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.authorization = token; //Authorization是登录接口返回
      }
      config.headers["Content-Type"] =
        config.method.toLocaleLowerCase() === "post"
          ? "application/x-www-form-urlencoded"
          : "application/json";
      return config;
    } catch (e) {
      console.log("请求拦截器：", e);
      //   uni.hideNavigationBarLoading();
      //   uni.hideLoading();
      toast("发生错误，请稍后重试");
    }
  },
  (err) => {
    // uni.hideNavigationBarLoading();
    // uni.hideLoading();
    return Promise.reject(err);
  }
);
// http response 拦截器
service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  //接口错误状态处理，也就是说无响应时的处理
  (error) => {
    return Promise.reject(error);

    // uni.hideNavigationBarLoading();
    // uni.hideLoading();
    // const {
    // 	response: {
    // 		status: status,
    // 		errMsg: statusText,
    // 		data: {
    // 			message
    // 		}
    // 	}
    // } = error;
    // const token = uni.getStorageSync("token");
    // if (status == 401 && token) { // 登录过期处理
    // 	uni.clearStorageSync()
    // 	uni.showToast({
    // 		title: '登录已过期，请重新登录',
    // 		icon: 'none',
    // 		duration: 2000
    // 	})
    // } else {
    // 	uni.showToast({
    // 		title: `请求错误，请稍后重试`,
    // 		position: 'center',
    // 		icon: 'none',
    // 		duration: 2000
    // 	})
    // 	console.error(`请求错误${status||''}：${statusText||message||''}`)
    // }
  }
);

axios.defaults.adapter = function (config) {
  //自己定义个适配器，用来适配uniapp的语法
  return new Promise((resolve, reject) => {
    // console.log(config)
    uni.request({
      method: config.method.toUpperCase(),
      url:
        config.baseURL +
        buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response?.data,
          status: response?.statusCode,
          errMsg: response?.errMsg,
          header: response?.header,
          config: config,
        };
        settle(resolve, reject, response);
      },
    });
  });
};
export default service;
