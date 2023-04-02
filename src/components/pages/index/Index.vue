<template>
  <the-nav-bar />
  <iframe src="/scene" class="iframe" style="display: unset" scrolling="no" />
  <!--  <IndexModels></IndexModels>-->
</template>

<script>
import Scene from "@/components/pages/index/Scene.vue";
import TheNavBar from "@/components/layout/TheNavBar.vue";
import IndexModels from "@/components/pages/index/deprecated/IndexModels.vue";

export default {
  name: "Index",
  components: { IndexModels, TheNavBar },
};
</script>

<style scoped>
/*.box-card {*/
/*  width: 80%;*/
/*  margin: 1rem auto;*/
/*}*/
.iframe {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(100% - 58px);
  overflow: auto;
}
</style>
