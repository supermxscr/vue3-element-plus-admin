<template>
  <div class="login">
    <img
      src="@/static/images/login-bg.jpg"
      class="bg"
      fit="cover"
    >
    <h2>登录1</h2>
    <m-login />
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import rules from './rules'
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import mLogin from "./login"

export default {
  name: "Login",
  components:{
    mLogin
  },
  setup(){
    let store = useStore()
    let router = useRouter()
    let state = reactive({
      login:{
        username: "周柏豪",
        password: "123456"
      },
      type: 'password',
      typeClass: 'iconview',
      loading: false,
      rules: rules
    })
    function showPwd(){
      if(state.type == 'password'){
        state.typeClass = 'iconview_off'
        state.type = 'text'
      }else {
        state.typeClass = 'iconview'
        state.type = 'password'
      }
    }
    let loginForm = ref(null);
    onMounted(()=>{
      console.log(loginForm)
    })
    function handleLogin() {
      loginForm.value.validate((valid) => {
        if (valid) {
          store.commit('save',state.login)
          sessionStorage.setItem('isLogin', true)
          if(localStorage.getItem('avatar') != undefined || localStorage.getItem('avatar') != null){
            store.commit('save',{
              avatar: localStorage.getItem('avatar')
            })
          }
          state.loading = true
          router.push({ path: "/home" })
          state.loading = false
        } else {
          return false
        }
    })
    }
    return {
      state, showPwd, handleLogin, loginForm
    }
  }
}
</script>

<style lang="less" scope>
.login {
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 100%;
  height: 100%;
  padding-top: 200px;
  overflow: hidden;
  box-sizing: border-box;
  h2 {
    color: #fff;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: -1;
  }
  .loginBox {
    text-align: center;
    width: 300px;
    padding: 30px;
    box-shadow: 0 0 8px #eeeeee;
    margin-top: 40px;
  }
  .el-button--primary {
    background: transparent;
    border-color: #fff;
    color: #fff;
  }
  .iconfont {
    position: absolute;
    right: 10px;
  }
  .info {
    text-align: left;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    margin-top: -10px;
    .reg {
      text-align: right;
      display: inline-block;
      // width: 83%;
      width: 100%;
      text-decoration: underline;
    }
    .hover {
      text-decoration: underline;
    }
  }
  .reg:hover {
    color: #409eff;
  }
  .hover:hover {
    color: #409eff;
  }
}
</style>
