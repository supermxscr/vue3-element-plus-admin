import { createStore } from 'vuex'

export default createStore({
  state: {
    avatar: '30',
    username: null,
  },
  mutations: {
    save(state,val){
      Object.assign(state, val)
    },
  },
  actions: {
  },
  modules: {
  }
})
