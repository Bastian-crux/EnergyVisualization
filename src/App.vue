<template>
  <the-nav-bar/>
  <main>
    <router-view/>
  </main>
</template>

<script>
import TheNavBar from "@/components/Layout/TheNavBar.vue";

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
}

body {
  margin: 0;
}
</style>