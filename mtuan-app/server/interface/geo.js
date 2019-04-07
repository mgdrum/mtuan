import Router from 'koa-router'
// import Province from '../dbs/models/province'
// import City from '../dbs/models/city'
// 数据库操作的时候启用上面
import axios from './utils/axios'

const router = new Router({ // 所有这个文件下的接口都是有前缀的
  prefix: '/geo'
})

const sign = 'a6150fe3a67a6d7493e0f697b975feea'

router.get('/getPosition', async (ctx) => { // 获取当前ip城市的接口
  const { status, data: { province, city } } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/menu', async (ctx) => {
  const { status, data: { menu } } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

router.get('/province', async (ctx) => { // 所有省份的接口
  // const province = await Province.find()
  // ctx.body = {
  //   province: province.map((item) => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }
  const { status, data: { province } } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: status === 200 ? province : []
  }
})

router.get('/city', async (ctx) => { // 所有城市的接口
  // let city = []
  // const result = await City.find()
  // result.forEach((item) => {
  //   city = city.concat(item.value)
  // })
  // ctx.body = {
  //   code: 0,
  //   city: city.map((item) => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '省直辖县级行政区划' || item.name === '市辖区' ? item.province : item.name
  //     }
  //   })
  // }
  const { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/province/:id', async (ctx) => { // 查找某个id省份下的城市
  // const result = await City.findOne({ id: ctx.params.id })
  // ctx.body = {
  //   code: 0,
  //   city: result.value.map((item) => {
  //     return {
  //       id: item.id,
  //       province: item.province,
  //       name: item.name
  //     }
  //   })
  // }
  const { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/hotCity', async (ctx) => { // 热门城市接口
  // const list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // const city = await City.find()
  // let nList = []
  // city.forEach((item) => {
  //   nList = nList.concat(item.value.filter((k) => {
  //     return list.includes(k.name) || list.includes(k.province)
  //   }))
  // })
  // ctx.body = {
  //   nList
  // }
  const { status, data: { hots } } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`)
  ctx.body = {
    hotCity: (hots.length) && (status === 200) > 0 ? hots : []
  }
})

export default router
