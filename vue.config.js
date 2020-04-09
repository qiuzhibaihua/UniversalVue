/**
 * process.env.NODE_ENV==='production'  (打包环境)
 * process.env.NODE_ENV==='development' (开发环境)
 */
module.exports = {
    lintOnSave: false,
    devServer: {
        // 代理
        proxy: {
            '/api': {
                // 代理路径
                target: process.env.VUE_APP_BASE_API,
                // target: 'http://120.132.31.159:80/gateway-api/',
                ws: false,
                changeOrigin: true,
                // 别称
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    //build config
    //项目url路径,请勿擅自修改
    publicPath:"./",
    //run build 打包输出的文件夹 使用nginx代理需要修改
    outputDir:"dzblAdmin",
    //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir:"static",
    indexPath:"index.html",
    chainWebpack: config => {
        // 一个规则里的 基础Loader
        // svg是个基础loader
        const svgRule = config.module.rule('svg')

        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()

        // 添加要替换的 loader
        svgRule
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })

    }

}