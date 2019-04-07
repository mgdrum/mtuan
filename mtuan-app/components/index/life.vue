<template>
  <div class="e-life">
    <el-row :gutter="10" class="banner-row1">
      <el-col :span="14">
        <slider class="slider">
        </slider>
      </el-col>
      <el-col :span="4" class="pic-1">
        <img src="http://p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg" alt="休闲生活">
      </el-col>
      <el-col :span="6">
        <div class="login-container">
          <div class="head-img">
            <img src="https://s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" />
          </div>
          <p class="username">Hi! 你好</p>
          <el-button type="primary" round class="btn-login"><nuxt-link to="/">注册</nuxt-link></el-button>
          <el-button type="primary" round class="btn-login"><nuxt-link to="/">立即登录</nuxt-link></el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="banner-row2">
      <el-col :span="7" class="pic-2">
        <img src="http://p1.meituan.net/codeman/8cce56c467a17e04f3094d1e455462a0132772.png" alt="住酒店"/>
      </el-col>
      <el-col :span="7" class="pic-2">
        <img src="http://p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg" alt="涨姿势">
      </el-col>
      <el-col :span="4" class="pic-2">
        <img src="http://p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg" alt="我是商家">
      </el-col>
      <el-col :span="6">
        <div class="download-app">
          <div>
            <img src="http://s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" />
          </div>
          <p>美团APP手机版</p>
          <p>
            <span>1元起</span>
            <span>吃喝玩乐</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import slider from './slider.vue'
export default {
  components: {
    slider
  }
}
</script>

<style lang="scss">
.e-life {
  outline: 1px solid balck;
  margin-top: 10px;
  padding-left: 5px;
  .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .banner-row1 {
    display: flex;
    height: 238px;
    .slider {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }

    .login-container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 30px;
      border: 1px solid #e5e5e5;
      height: 238px;
      text-align: center;
      background-color: #fff;
      .head-img {
        img{
          width: 47px;
          height: 47px;
          border-radius: 50%;
        }
      }

      .el-button {
      color: #ffffff;
      background-color: #fff;
      width: 120px;
      margin-left: 0;
      border: 1px solid #e5e5e5;
      margin-bottom: 15px;
        a {
          color: #333;
          font-size: 14px;
        }
      }

      .username {
        font-size: 16px;
        color: #222;
        font-weight: 500;
      }
    }
  }

  .banner-row2 {
    display: flex;
    margin-top: 10px;
    height: 167px;
    .pic-2 img {
      width: 100%;
      height: 100%;
    }
  }

  .download-app {
    width: 100%;
    height: 100%;
    border: 1px solid #e5e5e5;
    text-align: center;
    background-color: #fff;
    img {
      width: 95px;
      height: 95px;
    }
  }
}
</style>
