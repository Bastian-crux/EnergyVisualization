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
    <el-col :span="12">
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
  </el-row>
  <map-visualization
    :energy-type="energyType"
    :mode="mode"
    @choose-project="chooseMajorProject"
    @back="back"
    class="margin"
  />
</template>

<script>
import MapVisualization from "@/components/pages/chart/overview/MapVisualization.vue";
import ProjectDetails from "@/components/pages/chart/overview/ProjectDetails.vue";
import { ref } from "vue";
import TheNavBar from "@/components/layout/TheNavBar.vue";

export default {
  name: "Overview",
  components: { TheNavBar, ProjectDetails, MapVisualization },

  data() {
    return {
      radio1: ref("solar"),
      radio2: ref("quantity"),
      energyType: "solar",
      mode: "quantity",
      selectedProjectInfo: null,
    };
  },
  methods: {
    chooseMajorProject(projectInfo) {
      this.selectedProjectInfo = projectInfo;
    },
    back(value) {
      if (value === true) {
        this.selectedProjectInfo = null;
      }
    },
  },
  watch: {
    radio1: function (val) {
      this.energyType = val;
    },
    radio2: function (val) {
      this.mode = val;
    },
  },
};
</script>

<style scoped>
.margin {
  margin-top: 20px;
}
</style>
