
import defaultSettings from '@/setting.js'
const API = {
  uploadUrl: defaultSettings.baseURL + 'storage/upload', // 上传url
  weather7Day:'https://tianqiapi.com/api?version=v1&appid=61766418&appsecret=7IIFrTTa', // 7日天气
  weather: 'https://tianqiapi.com/api?version=v6&appid=61766418&appsecret=7IIFrTTa', // 实况天气
  list: 'list',
  select: 'select',
  login: 'login',
  register: 'register',
  user: 'user'
}

export default API