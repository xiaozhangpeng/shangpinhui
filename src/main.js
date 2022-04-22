import Vue from 'vue'
import App from './App.vue'

// 引入全局组件TypeNav
import TypeNav from "@/components/TypeNav"
// 引入全局组件Carousel
import Carousel from "@/components/Carousel"
// 引入全局组件Pagination---分页器
import Pagination from "@/components/Pagination"
// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)



// 引入路由
import router from '@/router'
// 引入仓库store
import store from '@/store'


// 引入mockServe
import "@/mock/mockServe";

// 在全局中引入swiper样式（随时可以调用）
import "swiper/css/swiper.css"

// //引入reqCategoryList方法并调用
// import { reqCategoryList } from "@/api"
// reqCategoryList();


// 统一引入api文件夹里面的全部请求函数
// 统一引入,
import * as API from "@/api";
// console.log(API)

// 按需引入element-ui组件
import { MessageBox } from "element-ui";
// 全局注册element-ui组件(两种注册方式)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
    render: h => h(App),
    // 全局事件总线$bus
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;

    },
    router,
    //注册仓库store
    store,



}).$mount('#app')