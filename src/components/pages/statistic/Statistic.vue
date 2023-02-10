<template>
  <el-card class="box-card">
    <monthly-chart/>
  </el-card>
</template>

<script>
import MonthlyChart from "@/components/pages/statistic/MonthlyChart.vue";
export default {
  name: "Statistic",
  components: {MonthlyChart}
}
</script>

<style scoped>
.box-card {
  width: 80%;
  margin: 1rem auto;
}

</style>