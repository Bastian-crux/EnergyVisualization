<template>
  <el-row justify="space-around">
    <el-col :span="4">
      <data-card></data-card>
    </el-col>
    <el-col :span="4">
      <data-card></data-card>
    </el-col>
    <el-col :span="4">
      <data-card></data-card>
    </el-col>
    <el-col :span="4">
      <data-card></data-card>
    </el-col>
    <el-col :span="4">
      <data-card></data-card>
    </el-col>
  </el-row>
</template>

<script>
import DataCard from "@/components/pages/statistic/DataCard.vue";

export default {
  name: "DataList",
  components: {DataCard}
}
</script>

<style scoped>
.pie {
  width: 100%;
  height: 400px;
}
</style>