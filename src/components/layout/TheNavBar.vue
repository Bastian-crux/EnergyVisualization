<template>
  <header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      style="font-weight: bold"
      mode="horizontal"
      :router="true"
      :ellipsis="false"
      background-color="#198e6b"
      text-color="rgba(255, 255, 255, 0.8)"
      active-text-color="rgba(255, 255, 255, 0.8)"
    >
      <el-menu-item index="">
        <font-awesome-icon
          :icon="['fas', 'leaf']"
          style="color: #bddcc7; padding: 0 8px 0 0"
          size="lg"
        />
        <div style="font-weight: bolder; font-size: 16px">能源轨迹</div>
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/surf">漫游</el-menu-item>
      <el-menu-item index="/game">游戏</el-menu-item>
      <el-menu-item index="/chart">图表</el-menu-item>
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
<style>
.el-menu--horizontal > .el-menu-item.is-active {
  outline: 0;
  color: var(--el-menu-hover-text-color);
  background-color: #08593f;
}
</style>
