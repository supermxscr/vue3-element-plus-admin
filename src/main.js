import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'
import Cookies from 'js-cookie'
import  pagination from "@/components/pagination"
import { httpRequest } from '@/api/http'
import wangeditor from "@/components/wangeditor"
import moment from "moment"
require('./mock')

const app = createApp(App)

app.component('Pagination', pagination)
app.component('Wangeditor', wangeditor)
app.mixin({
  methods: {
    $httpRequest: httpRequest
  }
})

app.use(store).use(ElementPlus, { locale }).use(router).use(Cookies).use(moment).mount('#app')
router.beforeEach((to, from, next) => {
  if(sessionStorage.getItem('isLogin') && sessionStorage.getItem('isLogin') !== 'false'){
    if (to.path === '/'){
      next({path:'/home'})
    }else{
      next()
    }
    store.commit('save',{loading:true})
  }else{
    if (to.path === '/login') {
      next()
    }
    next({path:'/login'}) 
  }
  store.commit('setActiveMenu',to.path)
  
}
)