import { createStore } from 'vuex'
import _ from 'lodash'
export default createStore({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
    navMenuCollapse: false,
    tagsViews:[],
    activeMenu: '',
    loading: false,
    avatar: '30',
    username: null,
  },
  mutations: {
    save(state,val){
      Object.assign(state, val)
    },
    setNavMenuCollapse(state){
      state.navMenuCollapse = !state.navMenuCollapse
    },
    setTagsViews(state,payload){
      state.tagsViews.push(payload)
      state.tagsViews = _.uniqBy(state.tagsViews, 'path')
    },
    delTagsViews(state,payload){
      state.tagsViews =  _.pullAllBy(state.tagsViews,[payload],'path')
    },
    setActiveMenu(state,payload){
      state.activeMenu = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
