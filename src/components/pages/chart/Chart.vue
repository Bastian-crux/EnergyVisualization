<template>
  <the-nav-bar />
  <div
    class="container"
    style="justify-content: center; align-content: center; margin: 5px auto"
  >
    <div style="border: 1px solid">
      <!--      <monthly-chart />-->
      <!--      <capacity-heatmap class="margin" />-->
    </div>
    <div style="border: 1px solid">
      <el-tabs v-model="activeName" class="box-card" type="card">
        <el-tab-pane label="User" name="timeline" lazy>
          <!--          <timeline :visible="activeName === 'timeline'" />-->
        </el-tab-pane>
        <el-tab-pane label="Config" name="overview" lazy>
          <!--          <overview :visible="activeName === 'overview'" />-->
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="border: 1px solid">
      <power-sum></power-sum>
      <!--      <data-list />-->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheNavBar from "@/components/layout/TheNavBar.vue";
import Timeline from "@/components/pages/chart/timeline/Timeline.vue";
import Overview from "@/components/pages/chart/overview/Overview.vue";
import MonthlyChart from "@/components/pages/chart/statistic/MonthlyChart.vue";
import DataList from "@/components/pages/chart/statistic/DataList.vue";
import CapacityHeatmap from "@/components/pages/chart/heatmap/CapacityHeatmap.vue";
import PowerSum from "@/components/pages/chart/statistic/PowerSum.vue";

const activeName = ref("timeline");
</script>

<style scoped>
.box-card {
  margin: 1rem auto;
}
.margin {
  margin-top: 20px;
}
.container {
  display: grid;
  grid-template-columns: 24% 50% 24%;
  row-gap: 5px;
  column-gap: 5px;
}
</style>
