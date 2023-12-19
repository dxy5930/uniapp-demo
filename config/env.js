// 开发环境
const dev = {
    baseUrl: 'https://dev.....',
    appid: 'wxf0701ab381cd8144'
}

// 测试环境
const test = {
    baseUrl: 'https://test.....',
    appid: 'wxf0701ab381cd8144'
}

// staging环境
const stage = {
    baseUrl: 'https://stage.....',
    appid: 'wxf0701ab381cd8144'
}


// 生产环境
const production = {
    baseUrl: 'https://production.....',
    appid: 'wxf0701ab381cd8144'
}

// 注意:这里的属性名要和上面package.json中定义的扩展节点编译名称相同
const ENV_CONFIG = {
    dev,
    test,
    stage,
    production,
}

module.exports = ENV_CONFIG