<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="12">
        <div>
          <div>
            能源类型
          </div>
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
          <div>
            可视化依据
          </div>
          <div>
            <el-radio-group v-model="radio2" style="margin-top: 20px">
              <el-radio-button label="quantity">发电站数</el-radio-button>
              <el-radio-button label="power">功率数</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-row class="box-card">
    <el-col :span="16">
      <el-card class="chart-card">
        <map-visualization :energy-type="energyType" :mode="mode" @choose-project="chooseMajorProject"/>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <el-card class="detail-card">
        <project-details :project-detail="selectedProjectInfo" :enable="selectedProjectInfo !== null" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import MapVisualization from "@/components/pages/overview/MapVisualization.vue";
import ProjectDetails from "@/components/pages/overview/ProjectDetails.vue";
import {ref} from 'vue';

export default {
  name: "Overview",
  components: {ProjectDetails, MapVisualization},

  data() {
    return {
      radio1: ref('solar'),
      radio2: ref('quantity'),
      energyType: 'solar',
      mode: 'quantity',
      selectedProjectInfo: null,
    }
  },
  methods:{
    chooseMajorProject(projectInfo){
      this.selectedProjectInfo = projectInfo;
    }
  },
  watch: {
    radio1: function (val) {
      this.energyType = val;
    },
    radio2: function (val) {
      this.mode = val;
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 80%;
  margin: 1rem auto;
}

.chart-card {
  margin: 1rem auto;
}

.detail-card {
  margin: 1rem auto;
}
</style>