// //引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from "@/pages/Detail"
// import AddCartSuccess from "@/pages/AddCartSuccess"
// import ShopCart from "@/pages/ShopCart"
// import Trade from "@/pages/Trade"
// import Pay from "@/pages/Pay"
// import PaySuccess from "@/pages/PaySuccess"
// import Center from "@/pages/Center"
// // 引入二级路由
// import MyOrder from "@/pages/Center/MyOrder"
// import GroupOrder from "@/pages/Center/GroupOrder"

// 配置路由
export default [{
        path: '/center',
        name: 'Cenetr',
        component: () =>
            import ('@/pages/Center'),
        meta: { show: true },
        children: [{
                path: 'myorder',
                component: () =>
                    import ('@/pages/Center/MyOrder'),
            },
            {
                path: 'grouporder',
                component: () =>
                    import ('@/pages/Center/GroupOrder'),
            },
            // 默认重定向
            {
                path: '/center',
                redirect: '/center/myorder'
            }

        ]
    },


    {
        path: '/paysuccess',
        name: 'PaySuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: { show: true }

    },

    {
        path: '/pay',
        name: 'Pay',
        component: () =>
            import ('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        }

    },

    {
        path: '/trade',
        name: 'Trade',
        component: () =>
            import ('@/pages/Trade'),
        meta: { show: true },
        // 路由独享守卫  解决的是:用户只能从shopcart页面跳转到trade页面.其他页面跳转过来的都不被允许
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next();
            } else {
                // next(false)---从哪来回哪去
                next(false)
            }
        }

    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: { show: true }
    },


    {
        path: '/addcartsuccess',
        name: 'AddCartSuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: { show: true }
    },

    {
        // 路由跳转的时候需要拿到参数
        path: '/detail/:skuid',
        name: 'Detail',
        component: () =>
            import ('@/pages/Detail'),
        meta: { show: true }


    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('@/pages/Home'),
        meta: { show: true },

    },
    {
        path: '/search/:keyword?',
        name: 'Search',
        component: () =>
            import ('@/pages/Search'),
        meta: { show: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('@/pages/Register'),
        meta: { show: false }
    },
    // 重定向
    {
        path: '*',
        redirect: '/home'
    }

]