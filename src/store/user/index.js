// 用户模块（登录与注册）
import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo, reqLogout } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/token";

const state = {
    code: '',
    token: getToken(),
    userInfo: {}

}
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //清楚本地数据
    CLEAR(state) {
        // 把仓库中相关用户信息清空
        state.token = '';
        state.userInfo = {};
        //本地存储数据清空
        removeToken()

    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码的这个接口，把验证码返回，但是正常情况下，后台是把验证码发给用户手机上的【省钱】
        let result = await reqGetCode(phone);
        // console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data)
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册
    async UserRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    // 登录业务[token:令牌]
    async UserLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // console.log(result);
        //服务器下发token,用户唯一标识符（uuid）
        // 将来经常通过token找服务器要用户信息进行展示
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
                // 持久化存储token
            setToken(result.data.token);
            return 'ok';
        } else
            return Promise.reject(new Error('faile'))

    },

    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        // console.log(result);
        if (result.code == 200) {
            // 提交mutation:只有mutation才可以修改state
            commit('GETUSERINFO', result.data);

        } else {
            return Promise.reject(new Error('faile'))
        }

    },

    //退出登录
    async userLogout({ commit }) {
        // 只是向服务器发送一次请求，通知服务器清楚token
        let result = await reqLogout()
        if (result.code == 200) {
            // action里面不能操作state，需要提交mutations修改state
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }

    }

}
const getters = {


}

export default {
    state,
    mutations,
    actions,
    getters
}