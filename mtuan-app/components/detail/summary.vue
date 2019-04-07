<template>
  <div class="s-summary">
    <div class="d-left">
      <h3 class="name">
        {{ meta.name }}
      </h3>
      <div class="score">
        <el-rate v-model="rate"></el-rate>
        <span>{{ rate }}分</span>
        <span>人均{{ Number(meta.biz_ext.cost) }}</span>
      </div>
      <ul class="address">
        <li>地址：{{ meta.address }}</li>
        <li>电话：{{ meta.tel }}</li>
        <li>营业时间：周一至周日 11:00-21:00</li>
      </ul>
      <div class="tags">
        <i class="iconfont">&#xe6de;</i>
        <p>提供停车服务</p>
      </div>
    </div>
    <div class="carousel">
      <el-carousel
      height="270px">
        <el-carousel-item v-for="(item, index) in meta.photos" :key="index" height="100%">
          <img :src="item.url" alt="item.title" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    rate: function () {
      return Number(this.meta.biz_ext.rating) || Math.floor(Math.random() * 5)
    }
  }
}
</script>

<style lang="scss">
  @font-face {
    font-family: 'iconfont';  /* project id 1112291 */
    src: url('//at.alicdn.com/t/font_1112291_f5zga8enqwp.eot');
    src: url('//at.alicdn.com/t/font_1112291_f5zga8enqwp.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1112291_f5zga8enqwp.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1112291_f5zga8enqwp.woff') format('woff'),
    url('//at.alicdn.com/t/font_1112291_f5zga8enqwp.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1112291_f5zga8enqwp.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:46px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .s-summary {
    font-family: "-apple-system",BlinkMacSystemFont,Roboto,"Helvetica Neue","MIcrosoft YaHei",sans-serif;
    color: #666666;
    display: flex;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    box-shadow: 0 5px 14px 0 rgba(0,0,0,.1);
    .d-left {
      flex: 1;
      padding-right: 20px;
      .name {
            font-size: 26px;
            line-height: 37px;
      }
      .score {
        display: flex;
        align-items: center;
        font-size: 14px;
        height: 14px;
        margin: 6px 0 17px;
        .el-rate {
          display: inline-block;
        }
      }
      .address {
        padding: 16px 0 11px;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        list-style: none;
        & > * {
          margin-bottom: 10px;
        }
      }
    }
    .carousel {
      width: 380px;
      height: 270px;
      .el-carousel {
        border-radius: 5px;
      }
    }
    .tags {
      padding-top: 10px;
      p {
        font-size: 12px;
      }
    }
  }
</style>
