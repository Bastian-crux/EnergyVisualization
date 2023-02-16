<template>
<!--    <index-model style="width: 100%; height: 900px"></index-model>-->
  <index-models />
</template>

<script>

import IndexModels from "@/components/pages/index/IndexModels.vue";

export default {
  name: "Index",
  components: {IndexModels}
}
</script>

<style>
.box-card {
  width: 80%;
  margin: 1rem auto;
}
</style>