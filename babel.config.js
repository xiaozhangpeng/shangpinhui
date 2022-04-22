module.exports = {
    presets: [
        '@vue/app',
    ],
    //按需引入element-ui,所设置的配置
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}