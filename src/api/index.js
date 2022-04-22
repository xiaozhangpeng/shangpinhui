// 统一管理项目接口的模块
// 引入二次封装axios

import request from "./request"

import mockRequests from "./mockAjax"
import {get } from "core-js/core/dict";

//API接口统一管理，发送请求（TypeNav）
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' });

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' });

// 获取floor的模拟接口数据
export const reqGetFloorList = () => mockRequests({ url: '/floor', method: 'get' });

// 获取search搜索模块数据 地址是:/api/list 请求方式:post
// 当前的这个接口给服务器传递的参数params---他至少是一个空对象
export const reqGetSearchInfo = (params) => request({ url: '/list', method: 'post', data: params })

//获取产品详情信息的接口 地址是/api/item/{ skuId } 请求方式:get
export const reqGoodsInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'get' })

// 将产品添加到购物车中（获取更新某一产品的个数） 地址是/api/cart/addToCart/{ skuId }/{ skuNum } 请求方式：post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表数据接口 地址是：/api/cart/cartList 请求方式:get
export const reqCartList = () => request({ url: '/cart/cartList', method: 'get' });

// 删除购物车产品的接口 地址是:/api/cart/deleteCart/{skuId} 请求方式:DELETE
export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

// 切换商品选中状态 地址是：/api/cart/checkCart/{skuID}/{isChecked} 请求方式是：get
export const reqUpdateCheckedById = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码 地址是/api/user/passport/sendCode/{phone} 请求方式:get
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册 地址是：/api/user/passport/register 请求方式是post  phone code password
export const reqUserRegister = (data) => request({ url: '/user/passport/register', data, method: 'post' })

//登录 地址是/api/user/passport/login 请求方式post   phone password
export const reqUserLogin = (data) => request({ url: '/user/passport/login', data, method: 'post' })

// 获取用户信息【需要带着用户的token向服务器要用户信息】 地址是：/api/user/passport/auth/getUserInfo 请求方式:get
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录 地址是:/api/user/passport/logout 请求方式 get
export const reqLogout = () => request({ url: '/user/passport/logout', method: 'get' });

// 获取用户地址信息 地址是:/api/user/userAddress/auth/findUserAddressList 请求方式:get
export const reqAddressInfo = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取订单交易页信息 地址是:/api/order/auth/trade 请求方式:get
export const reqOrderInfo = () => request({ url: '/order/auth/trade', method: 'get' })

//提交订单的接口 地址是：/api/order/auth/submitOrder?tradeNo={tradeNo} 请求方式：post
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "post" })

//获取支付信息 地址是:/api/payment/weixin/createNative/{orderId} 请求方式:get
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取支付订单状态 地址是：/api/payment/weixin/queryPayStatus/{orderId} 请求方式:get
export const reqPayStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })

// 获取个人中心的数据 地址是:/api/order/auth/{page}/{limit} 请求方式get
export const reqMyOrderList = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'get' })