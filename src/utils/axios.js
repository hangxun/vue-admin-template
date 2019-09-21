import axios from 'axios'
import { Message } from 'element-ui'

const baseUrlObj = {
  development: '//localhost:3000',
  production: '//localhost:3000',
  test: '//localhost:3000'
}

// 创建axios实例
const service = axios.create({
  baseURL: baseUrlObj[process.env.VUE_APP_ENV],
  timeout: 5000,
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (token) {
    //   config.headers['token'] = token
    // }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错
     */
    let message = response.data.message
    if (response.data.code === 200) {
      return response
    } else {
      message && Message.error(message)
      return Promise.reject(response)
    }
  },
  error => {
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      // console.log('网络请求超时，请稍后重试！')
    }
    return Promise.reject(error)
  }
)

export default service
