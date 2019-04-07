<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <i-select />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot-city />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroy />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
import hotCity from '@/components/changeCity/hot.vue'
import categroy from '@/components/changeCity/categroy.vue'
export default {
  components: {
    iSelect,
    hotCity,
    categroy
  }
}
</script>

<style lang="scss">

</style>
