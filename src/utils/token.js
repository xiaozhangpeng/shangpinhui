//对外暴露一个函数
// 存储token
export const setToken = (token) => {
        localStorage.setItem('TOKEN', token);
    }
    // 获取token
export const getToken = () => {
    // 曾出现错误，return没有写
    // return是否书写是看自己需不需要返回值，需要则写
    return localStorage.getItem('TOKEN');
}

// 清楚本地存储的token
export const removeToken = () => {
    localStorage.removeItem('TOKEN');

}