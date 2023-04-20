<template>
  <div
    class="margin"
    style="
      font-size: 18px;
      font-weight: bolder;
      text-align: center;
      color: #6e6e6e;
    "
  >
    <div
      style="
        font-size: 22px;
        font-weight: bolder;
        text-align: center;
        color: #6e6e6e;
        margin: 0 auto 6px auto;
      "
    >
      中国发电站建设可视化
    </div>
    <el-row :gutter="5">
      <el-col :span="8">
        <div class="select-box">
          <div class="label">能源类型</div>
          <el-select
            :popper-append-to-body="false"
            v-model="energyTypeSelector"
            style="width: 50%"
          >
            <el-option key="solar" label="太阳能" value="solar" />
            <el-option key="wind" label="风能" value="wind" />
            <el-option key="nuclear" label="核能" value="nuclear" />
            <el-option key="bio" label="生物能" value="bio" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="select-box">
          <div class="label">可视化依据</div>
          <el-select v-model="visualizationType" style="width: 50%">
            <el-option key="quantity" label="发电站数" value="quantity" />
            <el-option key="power" label="功率数" value="power" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <el-button
          class="top-button"
          circle
          @click="backEvent"
          :disabled="backEnabled"
        >
          <font-awesome-icon
            class="top-icon"
            size="lg"
            :icon="['fas', 'arrow-left']"
          />
        </el-button>
        <el-button class="top-button" circle @click="reloadEvent">
          <font-awesome-icon
            class="top-icon"
            size="lg"
            :icon="['fa', 'rotate-left']"
          />
        </el-button>
      </el-col>
    </el-row>
  </div>
  <div class="margin">
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="percentage"
      color="#7f7fd5"
      class="shadow"
    >
      <span>{{ currentYear + "年" }}</span>
    </el-progress>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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

<style>
.margin {
  margin: 15px auto;
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
.shadow {
  /*background-color: #eeedea;*/
  backdrop-filter: blur(2px);
  box-shadow: 2px 2px 4px rgba(51, 51, 51, 0.5);
  border-radius: 10px;
  padding: 0 0;
}
:deep(.el-progress-bar__outer) {
  background-color: rgba(255, 255, 255, 0.2);
}
.top-button {
  /*background-color: #efefef;*/
  height: 32px;
  width: 32px;
  box-shadow: 1px 1px 2px rgba(51, 51, 51, 0.5);
}
.top-icon {
  position: relative;
  left: 5%;
}

.el-select-dropdown__item {
  background-color: rgba(255, 255, 255, 0.4) !important;
}

.el-select-dropdown {
  background-color: rgba(255, 255, 255, 0.4) !important;
}

.el-select__popper {
  background-color: rgba(255, 255, 255, 0.4) !important;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #a3a4de !important;
}
</style>
