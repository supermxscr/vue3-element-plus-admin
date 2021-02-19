<template>
  <div class="loginBox">
    <el-form
      ref="loginForm"
      :model="state.login"
      size="mini"
    >
      <el-form-item
        prop="username"
        :rules="state.rules.username"
        v-if="state.isRegister"
      >
        <el-input
          v-model="state.login.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        />
      </el-form-item>
      <el-form-item
        prop="account"
        :rules="state.rules.account"
      >
        <el-input
          v-model="state.login.account"
          placeholder="请输入账号"
          prefix-icon="el-icon-user"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="state.rules.password"
      >
        <el-input
          v-model="state.login.password"
          placeholder="请输入密码"
          :type="state.type"
          prefix-icon="el-icon-lock"
          @keyup.enter="handleLogin"
        />
        <i
          :class="'iconfont ' + state.typeClass"
          @click="showPwd"
        />
      </el-form-item>
      <p class="info">
        <!-- <span class="hover">忘记密码</span> -->
        <span
          class="reg"
          @click="register"
        >{{ state.isRegister ? '立即登录' : '立即注册' }}</span>
      </p>
      <el-button
        :loading="state.loading"
        type="primary"
        @click.prevent="handleLogin"
        plain
        round
        size="mini"
      >
        {{ state.isRegister ? '注册' : '登录' }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import rules from './rules'
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { httpRequest } from "@/api/http"
import API from "@/api/api-config.js"
import { ElMessage } from "element-plus";

export default {
  name: "Login",
  setup(){
    let store = useStore()
    let router = useRouter()
    let state = reactive({
      login:{
        username: "周柏豪",
        password: "123456",
        account: 'admin'
      },
      type: 'password',
      typeClass: 'iconview',
      loading: false,
      rules: rules,
      isRegister: false
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

    function handleLogin() {
      loginForm.value.validate((valid) => {
        if (valid) {
          if (state.isRegister) {
            handleRegister()
          }else {
            login()
          }
          
        } else {
          return false
        }
      })
    }

    function handleRegister() {
      state.loading = true
      httpRequest("POST", API.register, state.login).then((res) => {
        if(res.code == 0){
          ElMessage.success(res.message)
          state.isRegister = false
        }else {
          ElMessage.error(res.message)
        }
        state.loading = false
      })
    }

    function login() {
      state.loading = true
      httpRequest("POST", API.login, state.login).then((res) => {
        if(res.code == 0){
          store.commit('save',state.login)
          sessionStorage.setItem('isLogin', true)
          store.commit('save',{
            userInfo: res.data
          })
          store.commit('save',{
            avatar: res.data.avatar
          })
          router.push({ path: "/home" })
        }else {
          ElMessage.error(res.message)
        }
        state.loading = false
      })
    }

    function register() {
      state.isRegister = !state.isRegister
      // state.login = {}
    }
    return {
      state, showPwd, handleLogin, loginForm, login, register
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
      width: 83%;
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
