<template>
  <!--    <index-model style="width: 100%; height: 900px"></index-model>-->
  <!--  <el-button @click="changeItemLeft"></el-button>-->
  <!--  <index-models :item-idx="itemIdx" />-->
  <!--  <el-button @click="changeItemRight"></el-button>-->
  <!--  <IndexModelTest />-->
  <the-nav-bar />
  <iframe
    src="/scene"
    class="iframe"
    style="display: unset"
    scrolling="no"
  ></iframe>
  <!--  <Scene />-->
  <!--  <IndexModels />-->
</template>

<script>
import IndexModels from "@/components/pages/index/deprecated/IndexModels.vue";
import IndexModelTest from "@/components/pages/index/IndexModelTest.vue";
import Scene from "@/components/pages/index/Scene.vue";
import TheNavBar from "@/components/layout/TheNavBar.vue";

export default {
  name: "Index",
  components: { TheNavBar, IndexModels, Scene, IndexModelTest },
  data() {
    return {
      itemIdx: 0,
    };
  },
  methods: {
    changeItemLeft() {
      this.itemIdx = (this.itemIdx + 1) % 3;
      console.log(this.itemIdx);
    },
    changeItemRight() {
      this.itemIdx = (this.itemIdx - 1 + 3) % 3;
      console.log(this.itemIdx);
    },
  },
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
