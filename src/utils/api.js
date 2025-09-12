// src/api/user.js
import request from '@/utils/request';

export default {
    // 登录接口
    login(data) {
        return request({
            url: '/user/login',
            method: 'post',
            data,
        });
    },

    // 获取用户信息
    getUserInfo(params) {
        return request({
            url: '/user/info',
            method: 'get',
            params,
        });
    },

    test(params) {
        return request({
            url: '/api',
            method: 'get',
            params,
        });
    },
    getAllInterData(params) {
        return request({
            url: '/api/getAllInterData',
            method: 'get',
            params
        });
    },
    getAllDisData(params) {
        return request({
            url: '/api/getAllDisData',
            method: 'get',
            params
        });
    },
    getApi(params) {
        return request({
            url: '/api/getApi',
            method: 'get',
            params
        });
    },
};