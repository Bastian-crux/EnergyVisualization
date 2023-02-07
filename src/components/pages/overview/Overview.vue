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
    <el-col :span="17">
      <el-card class="chart-card">
        <map-visualization :energy-type="energyType" :mode="mode"></map-visualization>
      </el-card>
    </el-col>
    <el-col :span="6" :offset="1">
      <el-card class="detail-card">
        Details
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import MapVisualization from "@/components/pages/overview/MapVisualization.vue";
import {ref} from 'vue';

export default {
  name: "Overview",
  components: {MapVisualization},

  data() {
    return {
      radio1: ref('solar'),
      radio2: ref('quantity'),
      energyType: 'solar',
      mode: 'quantity',
      majorProjectName: null,
    }
  },
  methods:{

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
  /*width: 75%;*/
  margin: 1rem auto;
}

.detail-card {
  /*width: 25%;*/
  margin: 1rem auto;
}
</style>