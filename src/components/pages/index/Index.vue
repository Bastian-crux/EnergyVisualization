<template>
  <div class="box-card background-color">
    <index-model style="width: 100%; height: 1000px"></index-model>
    <el-button>test</el-button>
  </div>
</template>

<script>

import IndexModel from "@/components/pages/index/IndexModel.vue";

export default {
  name: "Index",
  components: {IndexModel}
}
</script>

<style>
.box-card {
  width: 80%;
  margin: 1rem auto;
}
</style>