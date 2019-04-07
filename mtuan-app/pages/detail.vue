<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs :type="type" :keyword="keyword"/>
      </el-col>
      <el-col :span="24">
        <summar :meta="product"></summar>
      </el-col>
      <el-col :span="24" class="shop-title">
        <h3>商家团购及优惠</h3>
      </el-col>
      <el-col :span="24" v-if="canOrder || !login">
        <list v-if="login" :list="list"></list>
        <div class="deal-need-login" v-else>
          <img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png" alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button round>立即登录</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs.vue'
import Summar from '@/components/detail/summary.vue'
import List from '@/components/detail/list.vue'
export default {
  components: {
    Crumbs,
    Summar,
    List
  },
  computed: {
    canOrder: function () { // 做一层图片过滤
      return this.list.filter(item => item.photos.length).length
    }
  },
  async asyncData(ctx) {
    const { keyword, type } = ctx.query
    const { status, data: { product, more: list, login } } = await ctx.$axios.get('/search/products', {
      params: {
        keyword,
        type,
        city: ctx.store.state.geo.position.city
      }
    })
    if (status === 200) {
      return {
        keyword,
        product,
        type,
        list,
        login
      }
    } else {
      return {
        keyword,
        product: {},
        type,
        list: [],
        login
      }
    }
  }
}
</script>

<style lang="scss">
  .shop-title {
    margin-top: 40px;
    margin-bottom: 8px;
    h3 {
      font-size: 20px;
      line-height: 26px;
      color: #222;
      font-weight: bold;
    }
  }
</style>
