import axios from 'axios'
import {MessageBox,Message} from "element-ui";
import cookie from 'js-cookie'
//创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8989',//api的base_url
  timeout: 2000//时间单位:ms
})
//http request 拦截器   每次请求中
service.interceptors.request.use(
  config => {
    //判断cookie里面是否有字段的值
    if (cookie.get('lc_token')) {
      //把获取cookie值放到header里面
      config.headers['token'] = cookie.get('lc_token');
    }
    return config
  },
    err => {
    return Promise.reject(err);
  })
//http response 拦截器
service.interceptors.response.use(
  response => {
    //debugger
    if (response.data.code == 28004) {
      console.log("response.data.resultCode是28004")
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      // debugger
      window.location.href="/login"
      return
    }else{
      if (response.data.code !== 20000) {
        //25000：订单支付中，不做任何提示
        if(response.data.code != 25000) {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 100044          })
        }
      } else {
        return response;
       }
     }
    },
    error => {
    return Promise.reject(error.response)// 返回接口返回的错误信息});
      });
export default service
