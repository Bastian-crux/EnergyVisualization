<template>
  <the-nav-bar />

  <!--  <data-list />-->
  <div
    class="container"
    style="justify-content: center; align-content: center; margin: 5px auto"
  >
    <div class="glass">
      <carbon-emission />
      <capacity-heatmap class="margin" />
    </div>
    <div class="glass">
      <overview />
    </div>
    <div class="glass">
      <power-sum></power-sum>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheNavBar from "@/components/layout/TheNavBar.vue";
import Overview from "@/components/pages/chart/overview/Overview.vue";
import MonthlyChart from "@/components/pages/chart/right/deprecated/MonthlyChart.vue";
import DataList from "@/components/pages/chart/right/deprecated/DataList.vue";
import CapacityHeatmap from "@/components/pages/chart/left/CapacityHeatmap.vue";
import PowerSum from "@/components/pages/chart/right/PowerSum.vue";
import CarbonEmission from "@/components/pages/chart/left/CarbonEmission.vue";

const activeName = ref("timeline");
</script>

<style scoped>
/*.box-card {*/
/*  margin: 1rem auto;*/
/*}*/
.margin {
  width: 100%;
  height: 200px;
}
.container {
  display: grid;
  grid-template-columns: 24% 50% 24%;
  row-gap: 5px;
  column-gap: 5px;
}
.glass {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(51, 51, 51, 0.5);
  border-radius: 8px;
  padding: 10px 10px;
}
:deep(.el-select-dropdown__item) {
  background-color: transparent;
  color: #fff;
}
</style>
