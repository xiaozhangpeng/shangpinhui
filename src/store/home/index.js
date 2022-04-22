// home仓库

//引入reqCategoryList方法并调用
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"


// 创建对象
const state = {
    // state中的数据默认初始值很关键，不能乱写
    // 若服务器返回的时对象，则初始值是对象
    // 若服务器返回的是数组，则初始值是数组
    categoryList: [],
    // 轮播图的数组
    bannerList: [],
    // Floor的数组
    floorList: []
};
const mutations = {
    // 修改仓库中过的数据唯一手段
    // categoryList是服务器返回的数据
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};
const actions = {
    // 通知API里面的接口函数调用，向服务器发送请求，获取服务器的数据

    // async和await是同时存在的，返回成功的回调
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result);
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },

    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        // console.log(result);
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },

    // 获取floor的数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }

    }
};
// 计算属性
const getters = {};


// 对外暴露Store类的一个实例
export default ({
    state,
    mutations,
    actions,
    getters
})