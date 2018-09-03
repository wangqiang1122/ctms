/* eslint-disable no-param-reassign,prefer-arrow-callback */

import axios from 'axios';
import auth from '@/service/auth';
import storage from '@/service/storage';
import { MessageBox, Message } from 'element-ui';

const axiosIns = axios.create({
  timeout: 30000,
});

if (process.env.NODE_ENV === 'development') {
  axiosIns.defaults.baseURL = '/api/v1';
} else if (process.env.NODE_ENV === 'production') {
  axiosIns.defaults.baseURL = '/api/v1';
}

function errorMsgBox(statusText, msg) {
  MessageBox(`错误类型：${statusText}； 错误描述：${msg}`, '异常提示', {
    confirmButtonText: '确定',
  });
}

axiosIns.interceptors.request.use(
  (config) => {
    if (storage.getToken()) {
      config.headers.Authorization = storage.getToken();
    }
    if (config.url.indexOf('f0') < 0 && !storage.getAccount()) {
      auth.logoutErr();
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosIns.interceptors.response.use(
  (res) => {
    const data = res.data;
    const headers = res.headers;
    if (headers.authorization) {
      // 处于缓存期，获得新token
      storage.setToken(headers.authorization);
    }
    if (!data) {
      Message.error('服务器返回错误，请联系管理员！');
    }
    return Promise.resolve(data);
  },
  (error) => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      const status = error.response.status;
      if (status === 403) {
        // 超出缓存期，或TOKEN无效，重新登录
        Message.warning('登录超时，请重新登录！');
        setTimeout(() => {
          auth.logoutErr();
        }, 2000);
      } else if (status === 401) {
        const msg = '未授权访问的资源。';
        errorMsgBox(status, msg);
      } else if (status === 404) {
        const msg = '请求文件不存在。';
        errorMsgBox(status, msg);
      } else if (status >= 500) {
        const msg = '服务器错误。';
        errorMsgBox(status, msg);
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMsgBox('Error', '网络连接异常');
    }
    return Promise.reject(error);
  },
);
const ajaxMethod = ['get', 'post', 'delete', 'put'];
const api = {};
ajaxMethod.forEach((method) => {
  api[method] = function fun(uri, data, config) {
    return new Promise((resolve) => {
      axiosIns[method](uri, data, config).then((response) => {
        resolve(response);
      });
    });
  };
});

export default api;

