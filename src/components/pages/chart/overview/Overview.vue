<template>
  <div class="margin">
    <el-progress
      :text-inside="true"
      :stroke-width="26"
      :percentage="percentage"
    >
      <span>{{ currentYear + "年" }}</span>
    </el-progress>
  </div>
  <div class="margin">
    <el-row :gutter="5">
      <el-col :span="8">
        <div class="select-box">
          <div class="label">能源类型:</div>
          <el-select v-model="energyTypeSelector" style="width: 50%">
            <el-option key="solar" label="太阳能" value="solar" />
            <el-option key="wind" label="风能" value="wind" />
            <el-option key="nuclear" label="核能" value="nuclear" />
            <el-option key="bio" label="生物能" value="bio" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="select-box">
          <div class="label">可视化依据:</div>
          <el-select v-model="visualizationType" style="width: 50%">
            <el-option key="quantity" label="发电站数" value="quantity" />
            <el-option key="power" label="功率数" value="power" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <el-button-group>
          <el-button :icon="Back" @click="backEvent" :disabled="backEnabled" />
          <el-button :icon="RefreshRight" @click="reloadEvent" />
        </el-button-group>
      </el-col>
    </el-row>
  </div>
  <map-visualization
    :energy-type="energyType"
    :mode="mode"
    :current-year="currentYear"
    :back="back"
    :reload="reload"
    @back-enabled="backAvailable"
    class="margin"
  />
</template>

<script setup>
import { Back, RefreshRight } from "@element-plus/icons-vue";
</script>

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
      energyTypeSelector: ref("solar"),
      visualizationType: ref("quantity"),
      energyType: "solar",
      mode: "quantity",
      currentYear: 2010,
      timeout: null,
      back: false,
      reload: false,
      backEnabled: true,
    };
  },
  methods: {
    backEvent() {
      this.back = !this.back;
    },
    reloadEvent() {
      this.currentYear = 2010;
      this.reload = !this.reload;
    },
    backAvailable(val) {
      this.backEnabled = val;
    },
  },
  watch: {
    energyTypeSelector: function (val) {
      this.energyType = val;
      this.currentYear = 2010;
    },
    visualizationType: function (val) {
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
    }, 1000);
  },
};
</script>

<style scoped>
.margin {
  margin-top: 20px;
}
.select-box {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.label {
  margin-right: 12px;
  font-weight: bold;
}
</style>
