<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市</dt>
      <dd v-for="(item, index) in list" :key="index">{{ item.name === '市辖区' ? item.province : item.name }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted: async function () {
    const { status, data: { hotCity } } = await this.$axios.get('/geo/hotCity')
    if (status === 200) {
      this.list = hotCity
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/changecity/hot.scss'
</style>
