<template>
  <div class="page-register">
    <header class="header-mini">
      <div class="wrapper">
        <a href="/" class="site-logo"><span><strong>美团</strong></span><div class="site">meituan.com</div></a>
        <div class="login-block">
          <span>已有美团账号?</span>
          <a class="login" href="/login">登录</a>
        </div>
      </div>
    </header>
    <div class="content">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button size="mini" round @click="sendMsg">
            发送验证码
          </el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">
            同意以下协议并注册
          </el-button>
          <div class="error">
            {{ error }}
          </div>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">
            《美团网用户协议》
          </a>
        </el-form-item>
      </el-form>
    </div>
    <footer>
      <p class="copyright">
        ©
        <a href="meituan.com">meituan.com</a>&nbsp;
        <a href="" class="f1">京ICP证070791号</a>&nbsp;
        <span class="f1">京公网安备11010502025545号</span>
      </p>
    </footer>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'blank',
  data() {
    return {
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      rules: {
        name: [{ required: true, type: 'string', message: '请输入昵称', trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }],
        pwd: [{ required: true, message: '创建密码', trigger: 'blur' }],
        cpwd: [{ required: true, message: '确认密码', trigger: 'blur' }, {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pwd) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    sendMsg: function () { // 验证码
      const self = this
      let namePass, emailPass
      if (self.timerid) {
        return false
      }
      this.$refs.ruleForm.validateField('name', (valid) => {
        namePass = valid
      })
      self.statusMsg = ''
      if (namePass) {
        return false
      }
      this.$refs.ruleForm.validateField('email', (valid) => { // 校验不通过时，valid为提示信息，校验通过时，valid为空,validateField方法是对表单部分字段的验证
        emailPass = valid
      })
      if (!namePass && !emailPass) { // 所以空值取反为true
        self.$axios.post('/users/verify', {
          username: encodeURIComponent(self.ruleForm.name),
          email: self.ruleForm.email
        }).then(({ status, data }) => {
          /* then
          某个请求的响应包含以下信息
            {
              // `data` 由服务器提供的响应
              data: {},

              // `status` 来自服务器响应的 HTTP 状态码
              status: 200,

              // `statusText` 来自服务器响应的 HTTP 状态信息
              statusText: 'OK',

              // `headers` 服务器响应的头
              headers: {},

              // `config` 是为请求提供的配置信息
              config: {}
            }
           */
          if (status === 200 && data.code === 0) { // 如果回应正常
            let count = 60
            self.statusMsg = `验证码已发送，剩余${count--}秒`
            self.timerid = setInterval(function () {
              self.statusMsg = `验证码已发送，剩余${count--}秒`
              if (count === 0) {
                clearInterval(self.timerid)
                self.statusMsg = ''
              }
            }, 1000)
          } else {
            self.statusMsg = data.msg
          }
        })
      }
    },
    register: function () { // 注册
      const self = this
      this.$refs.ruleForm.validate((valid) => { // 对整个表单验证的方法validate, valid代表是否校验成功的boolean值
        if (valid) { // 校验成功true
          self.$axios.post('/users/signup', { // 向注册接口发送数据,并加密昵称和密码
            username: window.encodeURIComponent(self.ruleForm.name),
            password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
            email: self.ruleForm.email,
            code: self.ruleForm.code
          }).then(({ status, data }) => {
            if (status === 200) {
              if (data && data.code === 0) {
                location.href = '/login'
              } else {
                self.error = data.msg
              }
            } else {
              self.error = `服务器出错，错误码: ${status}`
            }
            setTimeout(function () {
              self.error = ''
            }, 1500)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .header-mini {
    border-bottom: 2px solid #2bb8aa;
    height: 66px;
    .wrapper {
      width: 980px;
      margin: 0 auto;
      padding: 10px 0;
      .site-logo {
        color: #2bb8a9;
        width: 59px;
        height: 46px;
        display: inline-block;

        span {
          font-size: 1.8rem;
        }

        .site {
          margin-top: -10px;
          margin-left: -10px;
          transform:scale(.7);
        }
      }

      .login-block {
        float: right;
        line-height: 46px;
        span {
          color: #5b5b5b;
        }

        .login {
          border: 0;
          padding: 3px 10px;
          margin-left: 1rem;
          background-color: #2CB8AA;
          color: #ffffff;
          border-bottom: 1px solid rgb(0, 129, 119);
          border-radius: 2px;
          &:hover {
            background-color: #0eaf9f;
          }
        }
      }
    }
  }
  .content {
    width: 980px;
    margin: 0 auto;
    padding-top: 30px;
    .el-input {
      width: 260px;
    }
  }
  footer {
    .copyright {
      text-align: center;
      font-size: 12px;
      color: #999;
      font-weight: 500;
      .f1 {
        font-size: 14px;
      }
      a {
        color: #999;
        &:hover {
          border-bottom: 1px solid #999;
        }
      }
    }
  }
</style>
