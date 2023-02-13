<template>
    <el-col>
      <el-row :span="8">
        <div class="statistic-card">
          <el-statistic :value="53289">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                2030年x能发电总量
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>同比增长</span>
              <span class="green">
                24%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </el-row>
      <el-card>
        <el-row :span="8">
          <p class="description">描述：测试测试测试测试测试测试测试测试测试测试测试测试测试测试testtest1111110101010100101不知道写什么</p>
        </el-row>
        <el-row :span="4" >
          <div style="height: 300px; width: 100%">
            <energy-pie-chart />
          </div>
        </el-row>
      </el-card>
    </el-col>


</template>

<script>
// import {CaretTop} from "@element-plus/icons-vue/global";
import {CaretTop} from "@element-plus/icons-vue";
import EnergyPieChart from "@/components/pages/statistic/EnergyPieChart.vue";

export default {
  name: "DataCard",
  components: {EnergyPieChart},
}
</script>


<style scoped>

.description {
  font-size: 14px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}

</style>