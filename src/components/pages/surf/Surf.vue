<template>
  <the-nav-bar />
  <iframe
    src="/surf-scene"
    class="iframe"
    style="display: unset"
    scrolling="no"
  />
</template>

<script>
import TheNavBar from "@/components/layout/TheNavBar.vue";

export default {
  name: "Surf",
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
