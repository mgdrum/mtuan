<template>
  <section class="m-style">
    <dl>
      <dt>有格调</dt>
      <dd
        v-for="(item, index) in styleList"
        :key="index"
        :class="item.kind"
        :keyword="item.keyword"
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
      >
        {{ item.name }}
      </dd>
    </dl>
    <div class="quality-area">
      <div class="link-card" v-for="(item, index) in cur" :key="index">
        <img :src="item.img" />
        <h4 class="title">{{ item.title }}</h4>
        <p class="label">{{ item.pos }}</p>
        <p>
          <span class="price">{{ item.price }}</span>
        </p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      type: 'all',
      styleList: [{
        kind: 'all',
        keyword: '景点',
        name: '全部'
      }, {
        kind: 'part',
        keyword: '美食',
        name: '约会聚餐'
      }, {
        kind: 'spa',
        keyword: '丽人',
        name: '丽人SPA'
      }, {
        kind: 'movie',
        keyword: '电影',
        name: '电影演出'
      }, {
        kind: 'travel',
        keyword: '旅游',
        name: '品质出游'
      }],
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.type]
    }
  },
  async mounted() {
    const self = this
    const { status, data: { count, pois } } = await self.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword: '景点',
        city: self.$store.state.geo.position.city
      }
    })
    if (status === 200 && count > 0) {
      const r = pois.filter((item) => { return item.photos.length }).map((item) => {
        return {
          title: item.name,
          pos: item.type.split(';')[0],
          price: item.biz_ext.cost || '暂无',
          img: item.photos[0].url,
          url: '//abc.com'
        }
      })
      self.list[self.type] = r.slice(0, 6)
    } else {
      self.list[self.type] = []
    }
  },
  methods: {
    mouseenter: async function (e) {
      const self = this
      const dom = e.target
      this.type = e.target.className
      this.kind = dom.className
      const keyword = dom.getAttribute('keyword')
      const { status, data: { count, pois } } = await self.$axios.get('/search/resultsByKeywords', {
        params: {
          keyword,
          city: self.$store.state.geo.position.city
        }
      })
      window.console.log(`count${count}`)
      if (status === 200 && count > 0) {
        const r = pois.filter((item) => { return item.photos.length }).map((item) => {
          return {
            title: item.name,
            pos: item.type.split(';')[0],
            price: item.biz_ext.cost || '暂无',
            img: item.photos[0].url,
            url: '//abc.com'
          }
        })
        self.list[self.type] = r.slice(0, 6)
      } else {
        self.list[self.type] = []
      }
    },
    mouseleave: function () {

    }
  }
}
</script>

<style lang="scss">
  .m-style {
    margin-left: 20px;
    margin-top: 40px;
    dl {
      height: 44px;
      line-height: 44px;
      background-color: rgb(190, 164, 116);
      background-image: linear-gradient(to right, rgb(194, 176, 142) 3%, rgb(190, 164, 116) 100%);
      display: flex;
      box-sizing: border-box;
      font-size: 14px;
      color: #fff;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      cursor: pointer;

      dt {
        font-size: 18px;
        margin-left: 13px;
        margin-right: 10px;
        padding: 0 5px;
      }

      dd {
        padding: 0 5px;
        position: relative;
      }
      dd:after {
          position: absolute;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 7px solid #fff;
          content: " ";
          display: block;
          width: 2px;
          height: 0;
          top: 37px;
          left: 0;
          right: 0;
          margin: auto;
          display: none;
      }
      dd:hover:after {
        display: block;
      }
    }
    .quality-area {
      padding: 10px;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      box-sizing: border-box;
      border-left: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      .link-card {
        &:hover {
          background-color: #F4F4F4;
          cursor: pointer;
        }

        width: 33.33333%;
        height: 314px;
        box-sizing: border-box;
        padding: 10px;
        display: inline-block;
        img {
          width: 362px;
          height: 204px;
        }

        .title {
          font-size: 16px;
          color: #222;
          height: 22px;
          line-height: 22px;
          margin-bottom: 8px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .label {
          font-size: 12px;
          color: #999;
          line-height: 18px;
          height: 18px;
          margin-bottom: 7px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price {
          font-size: 22px;
          color: #BE9E4D;
          letter-spacing: -.8px;
        }
      }
    }
  }
</style>
