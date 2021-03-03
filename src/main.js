import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'
import Cookies from 'js-cookie'
import pagination from "@/components/pagination"
import wangeditor from "@/components/wangeditor"
import moment from "moment"

require('./mock')

const app = createApp(App)

app.component('Pagination', pagination)
app.component('Wangeditor', wangeditor)

app.use(store).use(ElementPlus, {
  locale
}).use(router).use(Cookies).use(moment).mount('#app')
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('isLogin') && sessionStorage.getItem('isLogin') !== 'false') {
    let access = JSON.parse(store.state.access).flat()
    router.options.routes.forEach(v => {
      let isAllHidden = []
      if (v.children) {
        v.children.forEach(i => {
          if (i.access) {
            if (access.some(j => j == i.access.value)) {
              i.hidden = false
              if(v.children.length == 1){
                v.hidden = false
              }
              isAllHidden.push(i.hidden)
            }else {
              i.hidden = true
              if(v.children.length == 1){
                v.hidden = true
              }
              isAllHidden.push(i.hidden)
            }
            if(isAllHidden.includes(false)){
              v.hidden = false
            }else {
              v.hidden = true
            }
          }
        })
      }
    })
    // console.log('router.options.routes',router.options.routes)
    if (to.path === '/') {
      next({
        path: '/home'
      })
    } else {
      next()
    }
    store.commit('save', {
      loading: true
    })
  } else {
    if (to.path === '/login') {
      next()
    }
    next({
      path: '/login'
    })
  }
  store.commit('setActiveMenu', to.path)
})