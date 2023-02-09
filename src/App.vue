<template>
  <the-nav-bar/>
  <main>
    <router-view/>
  </main>
</template>

<script>
import TheNavBar from "@/components/layout/TheNavBar.vue";

export default {
  name: "App",
  components: {TheNavBar}
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: "Hiragino Sans GB", "华文细黑", "STHeiti", "微软雅黑", "Microsoft YaHei", SimHei, "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  background-color: #d2ecad;
}

body {
  margin: 0;
}
</style>