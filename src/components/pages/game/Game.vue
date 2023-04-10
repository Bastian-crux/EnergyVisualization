<template>
  <the-nav-bar />
  <iframe
    src="/game-scene"
    class="iframe"
    style="display: unset"
    scrolling="no"
    frameBorder="0"
    marginHeight="0"
    marginWidth="0"
  />
</template>

<script>
import TheNavBar from "@/components/layout/TheNavBar.vue";

export default {
  name: "Game",
  components: { TheNavBar },
};
</script>

<style scoped>
.iframe {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(100% - 58px);
  overflow: auto;
}
</style>
