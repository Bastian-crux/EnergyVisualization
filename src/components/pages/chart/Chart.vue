<template>
  <the-nav-bar />
  <el-tabs v-model="activeName" class="box-card" type="card">
    <el-tab-pane label="User" name="timeline" lazy>
      <timeline :visible="activeName === 'timeline'" />
    </el-tab-pane>
    <el-tab-pane label="Config" name="overview" lazy>
      <overview :visible="activeName === 'overview'" />
    </el-tab-pane>
  </el-tabs>
  <heat-map />
  <statistic />
</template>

<script setup>
import TheNavBar from "@/components/layout/TheNavBar.vue";
import Timeline from "@/components/pages/chart/timeline/Timeline.vue";
import Overview from "@/components/pages/chart/overview/Overview.vue";
import HeatMap from "@/components/pages/chart/heatmap/HeatMapIndex.vue";
import Statistic from "@/components/pages/chart/statistic/Statistic.vue";
import { ref } from "vue";

const activeName = ref("timeline");
</script>

<style scoped>
.box-card {
  width: 60%;
  margin: 1rem auto;
}
</style>
