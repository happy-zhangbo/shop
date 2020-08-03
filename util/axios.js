/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import {baseUrl} from '@/config/env';
import {serialize} from '@/util/util'
// import {getToken} from '@/util/auth'
import website from '../config/website';

	
axios.defaults.baseURL = baseUrl

axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

//HTTPrequest拦截
axios.interceptors.request.use(config => {
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
  //config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
  //if (getToken() && !isToken) {
    //config.headers['Blade-Auth'] = 'bearer ' + getToken() // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
 // }
  //headers中配置serialize为true开启序列化
  if (config.method === 'post' && meta.isSerialize === true) {
    config.data = serialize(config.data);
  }
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(res => {
  const status = res.data.code || 200
  const message = res.data.msg || '未知错误';
  //如果在白名单里则自行catch逻辑处理
  //if (statusWhiteList.includes(status)) return Promise.reject(res);
  //如果是401则跳转到登录页面
  if (status === 401) {
	  
  }
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
	uni.showToast({
	    title: message,
	    duration: 2000,
		icon:"none"
	});
    return Promise.reject(new Error(message))
  }
  return res.data;
}, error => {
  return Promise.reject(new Error(error));
})
axios.defaults.adapter = function(config) {
    return new Promise((resolve, reject) => {
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
		var baseURL = ''
		if(config.baseURL){
			baseURL = config.baseURL
		}
        uni.request({
            method: config.method.toUpperCase(),
            url: baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };

                settle(resolve, reject, response);
            }
        })
    })
}
export default axios;
