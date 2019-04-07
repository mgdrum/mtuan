<template>
  <div class="page-login">
    <header class="header  clear-fix">
      <a class="site-logo" href="http://www.meituan.com">美团网</a>
    </header>
    <div class="content">
      <div class="promotion-banner">
        <img src="https://s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" alt="美团网">
      </div>
      <div class="login-section">
        <h4
          v-if="error"
          class="tips"
        >
          {{ error }}
        </h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" />
        <el-input v-model="password" type="password" />
        <div class="foot">
          <el-checkbox v-model="checked">
            7天之内免登录
          </el-checkbox>
          <a class="forget-password" href="#">
            忘记密码?
          </a>
        </div>
        <el-button type="success" @click="login">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'blank',
  data() {
    return {
      checked: false,
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login: function () {
      const self = this
      self.$axios.post('users/signin', {
        username: window.encodeURIComponent(self.username),
        password: CryptoJS.MD5(self.password).toString()
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            location.href = '/'
          } else {
            self.error = data.msg
          }
        } else {
          self.error = `服务器出错，错误码为：${status}`
        }
        setTimeout(() => {
          self.error = ''
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss">
.page-login {
  width: 980px;
  margin: 0 auto;
  .header {
    margin:40px 0 30px 0;
    .site-logo {
      margin: 0;
      width: 82px;
      height: 54px;
      background-position: -188px -808px;
      background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png);
      background-size: initial;
      float: left;
      text-indent: -9999px;
      overflow: hidden;
    }
  }
  .clear-fix:after {
    content: " ";
    display: table;
    clear: both;
  }
  .content{
    position: relative;
    .promotion-banner {
      display: inline-block;
      margin-right: 115px;
    }
    .login-section {
      padding-top: 40px;
      display: inline-block;
      position: absolute;
      top: 0;
    }
    .el-input {
      width: 100%;
      padding: 8px 0;
    }
    .el-button {
      margin-top: 20px;
      width: 100%;
      background-color: #2BB8AA;
      border: 0;
      border-bottom: 1px solid #208a7f;
      &:hover {
        background-color: #1e9488;
      }
    }
    .forget-password {
      float: right;
    }
  }
}
</style>
