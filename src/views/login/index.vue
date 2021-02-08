<template>
  <div class="login">
    <img
      src="@/static/images/login-bg.jpg"
      class="bg"
      fit="cover"
    >
    <h2>登录1</h2>
    <div class="loginBox">
      <el-form
        ref="loginForm"
        :model="login"
        size="mini"
      >
        <el-form-item
          prop="username"
          :rules="rules.username"
        >
          <el-input
            v-model="login.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item 
          prop="password" 
          :rules="rules.password"
        >
          <el-input
            v-model="login.password"
            placeholder="请输入密码"
            :type="type"
            prefix-icon="el-icon-lock"
            @keyup.enter="handleLogin"
          />
          <i
            :class="'iconfont ' + typeClass"
            @click="showPwd"
          />
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click.prevent="handleLogin"
          plain
          round
          size="mini"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import rules from './rules'
export default {
  name: "Login",
  data() {
    return {
      login: {
        username: "周柏豪",
        password: "123456"
      },
      type: 'password',
      typeClass: 'iconview',
      loading: false,
      rules:rules
    }
  },
  methods: {
    showPwd(){
      if(this.type == 'password'){
        this.typeClass = 'iconview_off'
        this.type = 'text'
      }else {
        this.typeClass = 'iconview'
        this.type = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.commit('save',this.login)
          sessionStorage.setItem('isLogin', true)
          if(localStorage.getItem('avatar') != undefined || localStorage.getItem('avatar') != null){
            this.$store.commit('save',{
              avatar: localStorage.getItem('avatar')
            })
          }
          this.loading = true
          this.$router.push({ path: "/home" })
          this.loading = false
        } else {
          return false
        }
      })
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
}
</style>
