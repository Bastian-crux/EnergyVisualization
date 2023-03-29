<template>
  <the-nav-bar />
  <el-card class="box-card">
    <el-row>
      <el-col :span="24">
        <div>
          <el-radio-group v-model="radio1">
            <el-radio-button label="monthly">月度数据</el-radio-button>
            <el-radio-button label="annual">年度数据</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="box-card">
    <div v-if="selectTab === 'monthly'">
      <monthly-chart />
    </div>
    <div v-else>
      <data-list />
    </div>
  </el-card>
</template>

<script>
import { ref } from "vue";
import MonthlyChart from "@/components/pages/statistic/MonthlyChart.vue";
import DataList from "@/components/pages/statistic/DataList.vue";
import TheNavBar from "@/components/layout/TheNavBar.vue";

export default {
  name: "Statistic",
  components: { TheNavBar, DataList, MonthlyChart },
  data() {
    return {
      radio1: ref("monthly"),
      selectTab: "monthly",
    };
  },
  watch: {
    radio1(value) {
      this.selectTab = value;
    },
  },
};
</script>

<style scoped>
.box-card {
  width: 80%;
  margin: 1rem auto;
}
</style>
