// search仓库
// 引入接口
import { reqGetSearchInfo } from "@/api";
// 创建对象
const state = {
    // 返回的数据是对象，需要将格式设置为对象
    searchList: {}
};
const mutations = {

    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }

};
const actions = {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
        // 当前这个reqSearchInfo这个函数在调用服务器数据的时候，至少传递一个参数（空对象）
        // params形参，是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};

// 计算属性getters
// 项目当中getters的主要作用是：简化仓库中的数据（简化数据而生）
// getters可以把我们将来在组件当中需要用到的数据简化一下（将来组件中获取数据就方便了）
const getters = {

    // 需要注意的是，当前形参的state，并非大仓库中的那个state，而是本仓库中的

    goodsList(state) {
        // 这样书写是有问题的,修改后是后面一个=>||[]
        // 如果服务器的数据回来了，那state.searchList.goodsList是一个数组
        // 假如网络不给力或者没有网络，state.searchList.goodsList返回的是undefined
        return state.searchList.goodsList || []
    },
    attrsList(state) { return state.searchList.attrsList },
    trademarkList(state) { return state.searchList.trademarkList }

};


// 对外暴露Store类的一个实例
export default ({
    state,
    mutations,
    actions,
    getters
})