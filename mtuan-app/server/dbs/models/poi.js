import mongoose from 'mongoose'

const Schema = mongoose.Schema // 获取Schema
const Poi = new Schema({ // 获取数据的格式
  name: {
    type: String // 景点名称
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  county: {
    type: String
  },
  areaCode: {
    type: String
  },
  tel: {
    type: String
  },
  area: {
    type: String
  },
  addr: {
    type: String
  },
  type: {
    type: String
  },
  module: {
    type: String
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  }
})

export default mongoose.model('Poi', Poi) // 导出模型
