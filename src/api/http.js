import axios from 'axios'
import { ElMessage } from 'element-plus';
const service = axios.create({
  baseURL: '/api/',
  timeout: 5000,
  headers: {
  }
})
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    ElMessage.error(error.message ? error.message : '服务器发生异常')
    return Promise.reject(error)
})

export function httpRequest(method, url, params) {
  return service({
    url: url,
    method: method,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DEL' ? params : null
  })
}