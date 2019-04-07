export default {
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host() { // redis主机名
      return '127.0.0.1'
    },
    get port() { // 端口号s
      return 6379
    }
  },
  smtp: {
    get host() { // 使用腾讯的smtp服务必须填写腾讯的主机名
      return 'stmp.qq.com'
    },
    get user() {
      return '841196153@qq.com'
    },
    get pass() { // qq邮箱stmp服务中生成的授权码，切记上传github时更改掉
      return 'uieeqpzrdblsbeei'
    },
    get code() { // 生成四位验证码
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire() { // 设置验证码过期时间一分钟
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}

// dbs: 'mongodb://127.0.0.1:27017/student'
// 这句话是连接本机数据库，并且指定一个student数据库名称
