module.exports = {
    // 关闭Eslint
    lintOnSave: false,
    // 在项目打包时,自动删除map文件
    productionSourceMap: false,


    //代理服务器，解决跨域问题
    devServer: {
        proxy: {
            '/api': {
                // 服务器的地址
                target: 'http://39.98.123.211',
            },
        },
    },
}