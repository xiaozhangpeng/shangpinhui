import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api";
// 封装游客身份模块uuid--->生成一个随机字符串（不能再变了）
import { getUUID } from "@/utils/uuid_token";
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {

    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车返回的结构
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        console.log(result);
        // 代表加入购物车成功
        if (result.code == 200) {
            return 'ok'
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}

// 简化数据
const getters = {
    // 比如:state.goodInfo初始状态为空对象，空对象categoryView属性值为undefined
    // 当前计算出的categoryView属性值至少是一个空对象，假的报错不会有哦
    // 简化路径导航的数据
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 简化售卖属性的数据
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    },

}

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}