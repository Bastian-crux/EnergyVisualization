<template>
  <el-card class="box-card">
    <capacity-heatmap />
  </el-card>
</template>

<script>
import CapacityHeatmap from "@/components/pages/chart/heatmap/CapacityHeatmap.vue";
import TheNavBar from "@/components/layout/TheNavBar.vue";

export default {
  name: "HeatMap",
  components: { TheNavBar, CapacityHeatmap },
};
</script>

<style scoped>
.box-card {
  width: 80%;
  margin: 1rem auto;
}
</style>
