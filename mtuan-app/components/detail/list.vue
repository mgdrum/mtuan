<template>
  <div class="s-list">
    <ul>
      <li><h4 class="title">{{ list.filter((item) => {item.photos.length}).length + 1 }}款套餐</h4></li>
      <item v-for="(item, index) in list" :key="index" :meta="item"/>
    </ul>
  </div>
</template>

<script>
import Item from './item.vue'
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Item
  }
}
</script>

<style lang="scss">
  .s-list {
    padding: 16px 20px 20px 20px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    box-shadow: 0 5px 14px 0 rgba(0,0,0,.1);
    border-radius: 10px;
    ul {
      list-style: none;
      h4.title {
        font-size: 16px;
        font-weight: bold;
        color: #222222;
      }
    }
  }
</style>
