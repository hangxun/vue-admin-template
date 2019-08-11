import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_baseURL,
  timeout: 5000, // 请求超时时间
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
    if (response.data.code === 200) {
      return response
    } else {
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
