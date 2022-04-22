//引入axios
import axios from 'axios';
import nprogress from 'nprogress';
import "nprogress/nprogress.css"


//创建axios实例
const request = axios.create({

    baseURL: "/mock",
    timeout: 5000
});

//请求拦截器
request.interceptors.request.use((config) => {
    nprogress.start();
    return config;

});
// 响应拦截器
request.interceptors.response.use((res) => {
    nprogress.done();
    return res.data

}, (error) => {
    //服务器响应失败的回调函数
    return Promise.reject(new Error('faile'))
});

//对外暴露request，导出
export default request;