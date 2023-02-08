<template>
  <header>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
        :ellipsis="false"
    >
      <el-menu-item index="">能源可视化</el-menu-item>
      <div class="flex-grow"/>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/overview">能源概览</el-menu-item>
    </el-menu>
  </header>
</template>

<script>
export default {
  name: "TheNavBar",
  computed: {
    activeIndex: function () {
      return this.$route.path;
    }
  }
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

</style>