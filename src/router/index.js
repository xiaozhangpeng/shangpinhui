//配置路由的地方
import Vue from 'vue'
import Router from 'vue-router'

import store from "@/store"


//使用插件
Vue.use(Router)

// 引入路由组件
import routes from "./routes"


//重写push方法
//解决当多次传参相同时，程序报错的问题
//先把Router原型对象的push方法重写一遍
let originPush = Router.prototype.push;

let originReplace = Router.prototype.replace;

//重写push/replace
//第一个参数，告诉原来push方法，你往哪里跳转（传递那些参数）
//第二个参数，resolve成功的回调
//第三个参数，reject失败的回调
Router.prototype.push = function(location, resolve, reject) {
    // 第一种情况：resolve成功回调和reject失败回调同时回传
    // console.log(this)
    if (resolve && reject) {
        //call|apply区别
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call和apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject);
    }
    // 第二中情况：除第一种的所有其他情况
    else {
        originPush.call(this, location, () => {}, () => {})

    }
}

// 重写replace方法
Router.prototype.replace = function replace(location, resolve, reject) {
    if (reject && resolve) {
        return originReplace.call(this, location, resolve, reject);
    } else {
        return originReplace.call(this, location, () => {}, () => {})
    }
}


//配置路由
let router = new Router({
    // mode:'history',

    // 注册路由组件
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的这个y=0，代表的滚动条在最上方
        // y=100表示距离顶部有100px
        return { y: 0 }
    }
});

//全局守卫：前置守卫（在路由跳转之前进行判断，前置守卫用到的多一些）
router.beforeEach(async(to, from, next) => {

    // 用户登陆了，才会有token
    let token = store.state.user.token;
    //用户信息
    let name = store.state.user.userInfo.name;
    // console.log(token);
    // console.log(name)
    // 用户已经登陆过了
    if (token) {
        // 用户已经登陆了，就不能去login登录页面，只能停留在首页
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {
            // 登录，并且去的不是login[可能是home/search等]
            // 如果name有，正常放行
            if (name) {
                // console.log("有name,正常放行")
                next();
            } else {
                try
                // 如果没有na   me,需要派发action让仓库存储用户信息在跳转
                {
                    // 当用户刷新的时候，name丢失需要重新派发请求数据
                    await store.dispatch('getUserInfo');
                    // console.log("没有name，请求数据")
                    next()
                } catch (error) {
                    //token失效了,获取不到用户的信息，需要重新登录
                    //清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }

    }
    // 用户还没有登录
    else {
        let toPath = to.path;
        // 未登录，不能去交易相关[trade],不能去支付相关[pay/paysuccess],不能去个人中心[center]
        // 未登录的只能去登录界面  indexOf('/trade')==-1的含义是不包含trade字段 而indexOf('/trade')!=-1含义是包含trade字段 --反反为正
        // 使用indexOf可以一举两得,把包含目标字段的所有路由全部概括
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath); //解决的是:当用户未登录的情况下点击我的订单,在跳转登录页面并登录完成之后,可以直接跳转到我的订单页面,而不是首页
        }
        // 去的不是上面这些路由(home|search|shopCart)--放行
        next()
    }

});

export default router;