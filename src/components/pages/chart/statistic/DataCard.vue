<template>
  <el-row>
    <el-col :span="24">
      <div class="statistic-card">
        <el-statistic :value="data[year] === 0 ? '暂无数据' : data[year]">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              {{ year }}年{{ type }}发电总量
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <div v-if="increment !== 0 && year !== 2003">
              <span>同比{{ this.increment >= 0 ? "增长" : "减少" }}</span>
              <span class="green" v-if="increment > 0">
                {{ increment }}%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
              <span class="red" v-else-if="increment < 0">
                {{ increment }}%
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </span>
            </div>
            <div v-else>
              <span>暂无同比数据</span>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <!--    <el-col :span="24">-->
    <!--      <el-card :body-style="'background-color: ' + background">-->
    <!--        <el-row>-->
    <!--          <el-col :span="24">-->
    <!--            <p class="description">描述：测试测试测试测试测试测试</p>-->
    <!--          </el-col>-->
    <!--          <el-col :span="24">-->
    <!--            <div style="height: 300px; width: 100%">-->
    <!--              <energy-pie-chart-->
    <!--                :data="data[year]"-->
    <!--                :total="total"-->
    <!--                :type="type"-->
    <!--                :color="color"-->
    <!--              />-->
    <!--            </div>-->
    <!--          </el-col>-->
    <!--        </el-row>-->
    <!--      </el-card>-->
    <!--    </el-col>-->
  </el-row>
</template>

<script>
import { CaretTop, CaretBottom } from "@element-plus/icons-vue";
import EnergyPieChart from "@/components/pages/chart/statistic/EnergyPieChart.vue";

export default {
  name: "DataCard",
  components: { EnergyPieChart },
  props: ["year", "type", "data", "total", "color", "background"],
  computed: {
    increment() {
      if (this.data[this.year - 1] === 0) {
        return 0;
      } else {
        return (
          ((this.data[this.year] - this.data[this.year - 1]) /
            this.data[this.year - 1]) *
          100
        ).toFixed(2);
      }
    },
  },
};
</script>

<style scoped>
.description {
  width: 100%;
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

.red {
  color: var(--el-color-error);
}
</style>
