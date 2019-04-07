import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users' // 查用户表

passport.use(new LocalStrategy(async function (username, password, done) {
  const where = {
    username
  }
  const result = await UserModel.findOne(where)
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

passport.serializeUser(function (user, done) { // 让用户从session验证,每次请求的时候从session读取用户对象,序列化是我查到之后把用户验证登录之后,把用户登录的数据存到session中
  done(null, user)
})

passport.deserializeUser(function (user, done) { // 反序列化
  return done(null, user)
})
export default passport
