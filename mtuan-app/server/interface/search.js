import Router from 'koa-router'
import Poi from '../dbs/models/poi'
import axios from './utils/axios'

const router = new Router({ // 所有这个文件下的接口都是有前缀的
  prefix: '/search'
})

const sign = 'a6150fe3a67a6d7493e0f697b975feea'

router.get('/top', async (ctx) => {
  const { status, data: { top } } = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})

router.get('/hotPlace', async (ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  const { status, data: { result } } = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    params: {
      sign,
      city
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const { city, keyword } = ctx.query
  const { status, data: { count, pois } } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword,
      sign
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status ? pois : []
  }
})

router.get('/products', async (ctx) => {
  const keyword = ctx.query.keyword || '旅游'
  const city = ctx.query.city || '郑州'
  const { status, data: { product, more } } = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city,
      sign
    }
  })
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more : [], // isAuthenticated判断是否是登录状态
      login: ctx.isAuthenticated()
    }
  }
})

export default router
