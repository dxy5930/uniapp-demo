// 开发环境
const dev = {
    baseUrl: 'https://dev.....',
    appid: 'wx11111111111111'
}

// 测试环境
const test = {
    baseUrl: 'https://test.....',
    appid: 'wx22222222222222'
}

// staging环境
const stage = {
    baseUrl: 'https://test.....',
    appid: 'wx22222222222222'
}


// 生产环境
const production = {
    baseUrl: 'https://production.....',
    appid: 'wx333333333333333'
}

// 注意:这里的属性名要和上面package.json中定义的扩展节点编译名称相同
const ENV_CONFIG = {
    dev,
    test,
    stage,
    production,
}

module.exports = ENV_CONFIG