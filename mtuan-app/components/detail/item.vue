<template>
  <li>
    <dl  class="one">
      <dd class="pic">
        <img :src="meta.photos[0].url" :alt="meta.photos[0].title">
      </dd>
      <dd class="info">
        <h4 class="name">{{ meta.name }}</h4>
        <p class="sale">
          <span>已售{{ Math.floor(Math.random() * 5000) }}</span>
        </p>
        <p class="price">
          <b>{{ Number(meta.biz_ext.cost) }}</b>
          <span>门店价{{ Number(meta.biz_ext.cost) }}</span>
        </p>
      </dd>
      <dd class="buy">
        <el-button type="primary" round @click="createCart">立即抢购</el-button>
      </dd>
    </dl>
  </li>
</template>

<script>

export default {
  props: {
    meta: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    createCart: async function () {
      const self = this
      const { status, data: { code, id } } = await self.$axios.post('/cart/create', {
        params: {
          id: Math.random().toString().slice(3, 9),
          detail: {
            name: self.meta.name,
            price: self.meta.biz_ext.cost,
            imgs: self.meta.photos
          }
        }
      })
      if (status === 200 && code === 0) {
        window.location.href = `/cart/?id=${id}`
      } else {
        window.console.log('error')
      }
    }
  }
}
</script>

<style lang="scss">
  .one {
    font-family: "-apple-system",BlinkMacSystemFont,Roboto,"Helvetica Neue","MIcrosoft YaHei",sans-serif!important;
    display: flex;
    margin-top: 17px;
    padding-bottom: 20px;
    border-bottom: rgb(229, 229, 229) 1px solid;
    .pic {
      img {
        border-radius: 4px;
        width: 100px;
        height: 100px;
      }
    }
    .info {
      flex-grow: 1;
      padding-left: 20px;
      .name {
        font-size: 16px;
        line-height: 22px;
        cursor: pointer;
        color: #222;
        font-weight: bold;
      }
      .sale {
        font-size: 12px;
        color: #666;
        line-height: 17px;
        margin: 1px 0 22px;
        cursor: pointer;
      }
      .price {
        line-height: 1;
        b {
          font-size: 30px;
          color: #f60;
          cursor: pointer;
        }
        span {
          font-size: 12px;
          color: #999999;
          margin-left: 10px;
        }
      }
    }
    .buy {
      .el-button {
        background-color: #f90;
        border-color: #f90;
        &:hover {
          background-color: rgb(226, 142, 15);
        }
      }
    }
  }
</style>
