<template>
  <el-row>
    <el-col :span="12">
      <div>
        <div>能源类型</div>
        <div>
          <el-radio-group v-model="radio1" style="margin-top: 20px">
            <el-radio-button label="solar">太阳能</el-radio-button>
            <el-radio-button label="wind">风能</el-radio-button>
            <el-radio-button label="nuclear">核能</el-radio-button>
            <el-radio-button label="bio">生物能</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div>
        <div>可视化依据</div>
        <div>
          <el-radio-group v-model="radio2" style="margin-top: 20px">
            <el-radio-button label="quantity">发电站数</el-radio-button>
            <el-radio-button label="power">功率数</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <el-button
        class="margin"
        @click="returnMain"
        :disabled="nowSelectedProvince === 'mapData' && this.major === false"
        round
        >返回</el-button
      >
    </el-col>
  </el-row>
  <div class="margin">
    <el-progress
      :text-inside="true"
      :stroke-width="26"
      :percentage="percentage"
    >
      <span>{{ currentYear + "年" }}</span>
    </el-progress>
  </div>
  <map-visualization
    :energy-type="energyType"
    :mode="mode"
    :current-year="currentYear"
    class="margin"
  />
</template>

<script>
import { ref } from "vue";
import MapVisualization from "@/components/pages/chart/overview/MapVisualization.vue";

export default {
  name: "Overview",
  components: {
    MapVisualization,
  },
  data() {
    return {
      radio1: ref("solar"),
      radio2: ref("quantity"),
      energyType: "solar",
      mode: "quantity",
      currentYear: 2010,
      timeout: null,
    };
  },
  watch: {
    radio1: function (val) {
      this.energyType = val;
      this.currentYear = 2010;
    },
    radio2: function (val) {
      this.mode = val;
    },
  },
  computed: {
    percentage() {
      return ((this.currentYear - 2010 + 1) / (2022 - 2010 + 1)) * 100;
    },
  },
  mounted() {
    this.timeout = setInterval(() => {
      if (this.currentYear < 2022) this.currentYear += 1;
      else clearTimeout(this.timeout);
    }, 1000);
  },
};
</script>

<style scoped>
.margin {
  margin-top: 20px;
}
</style>
