<template>
  <div id="app">
    <div class="render">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="selectMenu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#67C23A">
        <el-menu-item index="1" route="/table">表格</el-menu-item>
        <el-menu-item index="2" route="/tree">树形图</el-menu-item>
        <el-menu-item index="3" disabled>未命名</el-menu-item>
      </el-menu>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    jumpToTable() {
      this.$router.push({
        path: '/table'
      })
    },
    selectMenu(index) {
      if (index === '1') {
        this.$router.push({ path: '/table' })
      } else if (index === '2') {
        this.$router.push({ path: '/tree' })
      }
    }
  },
  created() {
    this.jumpToTable()
  }
}
</script>

<style lang="scss">
#app {
  .render {
    width: 1210px;
    margin: 0 auto;
  }
}
</style>
