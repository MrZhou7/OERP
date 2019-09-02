import axios from 'axios';
import { Message } from 'element-ui';
import router from '@/router'

var service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
    // "token":'14a1347f412b319b0fef270489f'
  }
});
export default {
  post(url, param) {
    return new Promise((resolve, reject) => {
      service({
        method: 'post',
        url,
        data: param
      }).then(res => {
        if (res.data.code === 0 || res.data.errorCode === 0 || res.data.error_code === 0 || res.data.data == 'success') {
          resolve(res);
        } else {
          Message({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(err => {
        if (err.response.data.error_code === 10001) {
          router.push({ path: this.redirect || '/login' });
        } else if (!err.response) {
          console.log('请求错误');
          // Message是element库的组件，可以去掉
          Message({
            showClose: true,
            message: '请求错误',
            type: 'error'
          });
        } else {
          reject(err.response);
          Message({
            showClose: true,
            message: err.response.data.msg,
            type: 'error'
          });
        }
      });
    });
  }
};
