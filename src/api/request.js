//引入axios
import axios from 'axios';
import nprogress from 'nprogress';
import "nprogress/nprogress.css"

// 在当前模块引入store
import store from '@/store'

//创建axios实例
const request = axios.create({

    baseURL: "/api",
    timeout: 5000
});

//请求拦截器
request.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        // 请求头添加一个字段（userTempId）:一定是和后台老师商量好的
        config.headers.userTempId = store.state.detail.uuid_token
    }

    // 需要携带token带给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }


    nprogress.start();
    return config;

});
// 响应拦截器
request.interceptors.response.use((res) => {
    nprogress.done();
    return res.data

}, (error) => {
    //服务器响应失败的回调函数
    alert(error.message)
});

//对外暴露request，导出
export default request;