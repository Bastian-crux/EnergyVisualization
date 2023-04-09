<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import "../assets/fonts/font.css";
* {
  box-sizing: border-box;
}

html {
  /*font-family: sans-serif, "Sarasa Gothic";*/
  background-color: #eeedea;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
}
.eltooltip-background {
  max-width: 40%;
  color: #000 !important;
  border: 1px solid #dfe6ec !important;
  background-color: rgba(255, 255, 255, 0.8) !important;
}
.el-message-box {
  background-color: rgba(255, 255, 255, 0.8) !important;
}
</style>
