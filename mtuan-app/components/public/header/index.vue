<template>
  <div class="m-header shadow">
    <el-row>
      <el-col>
        <top-bar></top-bar>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <search-bar></search-bar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import topBar from './topbar.vue'
import searchBar from './searchbar.vue'
export default {
  components: {
    topBar,
    searchBar
  }
}
</script>

<style lang="scss">
@import "@/assets/css/public/header/index.scss";
.shadow{
    box-shadow: 0 5px 14px 0 rgba(0,0,0,.1);
}
</style>
