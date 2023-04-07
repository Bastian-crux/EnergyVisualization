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
  font-family: sans-serif, "Sarasa Gothic";
  /*background-color: #d2ecad;*/
  /*background-color: #d9dedf;*/
  background-color: #eeedea;
  /*background-color: #19485b;*/
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
</style>
