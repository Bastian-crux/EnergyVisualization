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
  font-family: sans-serif;
  background-color: #d2ecad;
}

body {
  margin: 0;
}
</style>