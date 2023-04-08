<template>
  <the-nav-bar />

  <!--  <data-list />-->
  <div
    class="container"
    style="justify-content: center; align-content: center; margin: 5px auto"
  >
    <div style="border: 1px solid">
      <monthly-chart />
      <capacity-heatmap class="margin" />
    </div>
    <div style="border: 1px solid">
      <overview />
    </div>
    <div style="border: 1px solid">
      <power-sum></power-sum>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheNavBar from "@/components/layout/TheNavBar.vue";
import Overview from "@/components/pages/chart/overview/Overview.vue";
import MonthlyChart from "@/components/pages/chart/statistic/MonthlyChart.vue";
import DataList from "@/components/pages/chart/statistic/deprecated/DataList.vue";
import CapacityHeatmap from "@/components/pages/chart/heatmap/CapacityHeatmap.vue";
import PowerSum from "@/components/pages/chart/statistic/PowerSum.vue";

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
</style>
