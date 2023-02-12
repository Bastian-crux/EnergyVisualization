<template>
  <el-card class="box-card">
    <monthly-chart/>
  </el-card>
  <el-card class="box-card">
    <energy-pie-chart />
  </el-card>
</template>

<script>
import MonthlyChart from "@/components/pages/statistic/MonthlyChart.vue";
import EnergyPieChart from "@/components/pages/statistic/EnergyPieChart.vue";

export default {
  name: "Statistic",
  components: {EnergyPieChart, MonthlyChart}
}
</script>

<style scoped>
.box-card {
  width: 80%;
  margin: 1rem auto;
}

</style>