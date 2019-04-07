import Router from 'koa-router'
// import Province from '../dbs/models/province'
import axios from './utils/axios'

const router = new Router({ prefix: '/categroy' })

const sign = 'a6150fe3a67a6d7493e0f697b975feea'

router.get('/crumbs', async (ctx) => {
  const { status, data: { areas, types } } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
    params: {
      city: ctx.query.city.replace('市', '') || '郑州',
      sign
    }
  })
  ctx.body = {
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : []
  }
})

export default router
