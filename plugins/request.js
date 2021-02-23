import axios from "axios";

export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
});

// 通过插件机制，获取上下文对象，query,params,req,res,app,store等
// 插件导出函数，必须作为默认成员
export default ({store}) => {
    // 请求拦截器
    request.interceptors.request.use(function (config) {
        const {user} = store.state;
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`;
        }
        return config;
    }, function (error) {
        // 如果请求失败，还没有发出去，就会进入这里
        return Promise.reject(error);
    });
}

// 响应拦截器

// export default request;
