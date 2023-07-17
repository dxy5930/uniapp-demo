let envConfig = null;
if (process.env.NODE_ENV === "production") {
  envConfig = require("./env.production.js");
} else {
  envConfig = require("./env.development.js");
}
//自定义一个uniEnv的全局变量，把配置导入到全局变量
process.uniEnv = {};
for (let key in envConfig) {
  process.uniEnv[key] = envConfig[key];
}
