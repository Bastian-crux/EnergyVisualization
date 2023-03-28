<template>
  <!--    <index-model style="width: 100%; height: 900px"></index-model>-->
  <!--  <el-button @click="changeItemLeft"></el-button>-->
  <!--  <index-models :item-idx="itemIdx" />-->
  <!--  <el-button @click="changeItemRight"></el-button>-->
  <IndexModelTest />
</template>

<script>
import IndexModels from "@/components/pages/index/deprecated/IndexModels.vue";
import IndexModelTest from "@/components/pages/index/IndexModelTest.vue";
import Scene from "@/components/pages/index/Scene.vue";

export default {
  name: "Index",
  components: { IndexModels, Scene, IndexModelTest },
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
</style>
