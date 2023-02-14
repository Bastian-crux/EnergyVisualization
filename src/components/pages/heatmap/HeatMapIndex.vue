<template>
  <el-card class="box-card">
    <capacity-heatmap />
  </el-card>
</template>

<script>
import CapacityHeatmap from "@/components/pages/heatmap/CapacityHeatmap.vue";

export default {
  name: "HeatMap",
  components: {CapacityHeatmap}
}
</script>

<style scoped>
.box-card {
  width: 80%;
  margin: 1rem auto;
}

</style>