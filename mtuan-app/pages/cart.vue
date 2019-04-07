<template>
  <div class="page-cart">
    <el-row>
      <el-col :span="24" v-if="cart.length" class="m-cart">
        <list :cart-data="cart"></list>
        <p style="980px">
          应付金额：<em class="money">￥{{ total }}</em>
        </p>
        <div class="post" style="980px">
          <el-button type="primary" @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else  class="empty">
        购物车为空
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/cart/list.vue'
export default {
  components: {
    List
  },
  data() {
    return {
      cart: []
    }
  },
  computed: {
    total() {
      let total = 0
      this.cart.forEach((item) => {
        total += item.count * item.price
      })
      return total
    }
  },
  methods: {
    submit: async function () {
      const { status, data: { code, id } } = await this.$axios.post('order/createOrder', {
        count: this.cart[0].count,
        price: this.cart[0].price,
        id: this.cartNo
      })
      if (status === 200 & code === 0) {
        this.$alert(`恭喜您，已成功先打，订单号：${id}`, '下单成功', {
          confirmButtonText: '确定',
          callback: (action) => {
            location.href = '/order'
          }
        })
      }
    }
  },
  async asyncData(ctx) {
    const { status, data: { code, data: { name, price } } } = await ctx.$axios.post('/cart/getCart', {
      id: ctx.query.id
    })
    if (status === 200 && code === 0 && name) {
      return {
        cart: [{
          name,
          price,
          count: 1
        }],
        cartNo: ctx.query.id
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
