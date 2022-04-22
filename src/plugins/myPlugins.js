// Vue插件一定要暴露一个对象
let myPlugins = {};

myPlugins.install = function(Vue, options) {

    // Vue.prototype.$bus:任何组件都可以使用
    // Vue.directive
    // Vue.component
    // 自定义属性
    Vue.directive(options.name, (element, params) => {
        element.innerHTML = params.value.toUpperCase();
    })


}

export default myPlugins;