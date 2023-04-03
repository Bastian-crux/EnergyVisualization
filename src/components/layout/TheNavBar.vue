<template>
  <header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      :ellipsis="false"
      background-color="#198e6b"
    >
      <el-menu-item index="">能源可视化</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/surf">漫游</el-menu-item>
      <el-menu-item index="/overview">能源概览</el-menu-item>
      <el-menu-item index="/timeline">Timeline</el-menu-item>
      <el-menu-item index="/statistic">能源月报</el-menu-item>
      <el-menu-item index="/heatmap">热力图</el-menu-item>
      <el-menu-item index="/game">游戏</el-menu-item>
    </el-menu>
  </header>
</template>

<script>
export default {
  name: "TheNavBar",
  computed: {
    activeIndex: function () {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
