import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Email from '../dbs/config'
import Passport from './utils/passport'
import axios from './utils/axios'

const router = new Router({ // 所有这个文件下的接口都是有前缀的
  prefix: '/users'
})

const Store = new Redis().client // redis客户端

router.post('/signup', async (ctx) => { // 注册接口
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body // 利用koa-bodyparser获取表单的数据
  if (code) { // 验证验证码
    const saveCode = await Store.hget(`nodemail:${username}`, 'code') // 从redis中获取hash数据中的某一个字段值code
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire') // 获取hash数据中的某一个字段值expire
    if (code === saveCode) { // 如果从前端取的的code === redis存储的code
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已经过期，请重新发送'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else { // 验证码不通过
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  const user = await User.find({ // 查找数据库中是否已有数据，如果有则代表重复，提示已被注册
    username
  })
  if (user.length) { // 查找数据库中是否已有数据，如果有则代表重复，提示已被注册
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  const nuser = await User.create({ // 创建一个对象，存储新创建人的信息
    username,
    password,
    email
  })
  if (nuser) { // 如果获取到新的信息，直接提交数据到登录页面
    const res = await axios.post('/users/signin', {
      username,
      password
    })
    if (res.data && res.data.code === 0) { // 验证注册成功
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', (ctx, next) => { // 登录接口
  return Passport.authenticate('local', function (err, user, info, status) { // 利用passport做权限认证
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    }
    if (user) {
      ctx.body = {
        code: 0,
        msg: '登录成功',
        user
      }
      return ctx.login(user)
    } else {
      ctx.body = {
        code: 1,
        msg: info
      }
    }
  })(ctx, next)
})

router.post('/verify', async (ctx, next) => { // 验证码接口
  const username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire') // 获取hash数据中的某一个字段值expire
  if (saveExpire && new Date().getTime() - saveExpire < 0) { // 如果验证码过期
    ctx.body = { // ctx.body = ctx.res.body = ctx.response.body设置响应的主题
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  const transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  const ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  const mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '《mtuan项目》注册码',
    html: `您的注册码为${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('error')
    } else {
      Store.hmset(`nodemail: ${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email) // 存储邮箱发送的信息到redis中
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延迟，有效期1分钟'
  }
})

router.get('/exit', async (ctx, next) => { // 退出
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', async (ctx) => { // 获取用户数据的接口
  if (ctx.isAuthenticated()) {
    const { username, email } = await ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router
