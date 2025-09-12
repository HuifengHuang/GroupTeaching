import axios from 'axios';

// 创建 axios 实例
const service = axios.create({
    baseURL: "http://192.168.1.111:80", // 从环境变量读取基础路径
    timeout: 10000, // 超时时间
});

// 请求拦截器（统一添加 token、loading 等）
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器（统一处理错误码、数据过滤等）
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        // console.error(res)
        if (res.code !== 200) {
            // console.error(res.code)
            // 统一处理业务错误（如弹窗提示）
            return Promise.reject(new Error(res.message || 'Error'));
        }
        return res;
    },
    (error) => {
        // 统一处理 HTTP 错误（如 401、404、500）
        return Promise.reject(error);
    }
);

export default service;