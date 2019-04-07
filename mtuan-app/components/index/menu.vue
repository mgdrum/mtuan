<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
      v-for='(item, index) in $store.state.home.menu'
      :key='index'
      @mouseenter="enter">
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="sover"
      @mouseleave="sout">
      <template
        v-for="(item,idx) in curdetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span
          v-for="i in item.child"
          :key="i">{{ i }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '',
      menu: [{
        type: 'food',
        name: '美食',
        child: [
          {
            title: '美食',
            child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐', '日韩料理']
          },
          {
            title: '美食',
            child: ['代金券1', '甜点饮品1', '火锅1', '自助餐1', '小吃快餐1', '日韩料理1']
          }
        ]
      }, {
        type: 'takeout',
        name: '外卖',
        child: [
          {
            tilte: '外卖',
            child: ['美团外卖']
          }
        ]
      }, {
        type: 'hotel',
        name: '酒店',
        child: [
          {
            title: '酒店星级',
            child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
          }
        ]
      }, {
        type: 'homestay',
        name: '榛果民宿',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }, {
        type: 'movie',
        name: '猫眼电影',
        child: [
          {
            title: '热门电影',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          },
          {
            title: '热门影院',
            child: ['耀莱成龙国际影城', '大地影院', '保利国际影城', '万达影城', '博纳国际影城', 'CGV影城', '橙天嘉禾影城', '金逸影城', '中影国际影城', '新华国际影城']
          }
        ]
      }, {
        type: 'airport',
        name: '机票/火车票',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }, {
        type: 'ktv',
        name: '休闲娱乐/KTV',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }, {
        type: 'life',
        name: '生活服务',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }, {
        type: 'hair',
        name: '丽人/美发/医学美容',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }, {
        type: 'marry',
        name: '结婚/婚纱摄影/婚宴',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }, {
        type: 'offspring',
        name: '亲子/儿童乐园/幼教',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }, {
        type: 'sport',
        name: '运动健康/健身中心',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }, {
        type: 'furniture',
        name: '家装/建材/家居',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }, {
        type: 'study',
        name: '学习培训/音乐培训',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }, {
        type: 'health',
        name: '医疗健康/宠物/爱车',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }, {
        type: 'bar',
        name: '酒吧/密室逃亡',
        child: [
          {
            title: '热门城市',
            child: ['上海', '成都', '北京', '重庆', '南京', '杭州', '广州', '西安', '大连']
          }
        ]
      }]
    }
  },
  computed: {
    curdetail: function () {
      const self = this
      return this.$store.state.home.menu.filter(item => item.type === self.kind)[0]
    }
  },
  methods: {
    mouseleave: function () {
      const self = this
      self._timer = setTimeout(function () {
        self.kind = ''
      }, 150)
    },
    enter: function (e) {
      this.kind = e.target.querySelector('i').className
    },
    sover: function () {
      clearTimeout(this._timer)
    },
    sout: function () {
      this.kind = ''
    }
  }
}
</script>

<style lang="scss">

</style>
