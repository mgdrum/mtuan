<template>
  <div class="m-iselect">
    <span class="name">请按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    pvalue: async function (newPvalue) {
      const self = this
      const { status, data: { city } } = await self.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        self.city = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        self.cvalue = ''
      }
    }
  },
  mounted: async function () {
    const self = this
    const { status, data: { province } } = await self.$axios.get(`/geo/province`)
    if (status === 200) {
      self.province = province.map((item) => {
        return {
          label: item.name,
          value: item.id
        }
      })
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function (queryString, cb) {
      const self = this
      if (self.cities.length) { // 如果有数据的时候，就是第二次输入的时候
        cb(self.cities.filter((item) => {
          return item.value.indexOf(queryString) > -1
        }))
      } else { // 如果是第一次输入
        const { status, data: { city } } = await self.$axios.get(`/geo/city`)
        if (status === 200) {
          self.cities = city.map((item) => {
            return {
              value: item.name
            }
          })
          cb(self.cities.filter((item) => {
            return item.value.indexOf(queryString) > -1
          }))
        } else {
          const arr = []
          cb(arr)
        }
      }
    }),
    handleSelect: function () {
      // this.$router.push('/')
      // this.$store.commit('geo/setPosition', this.input)
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
