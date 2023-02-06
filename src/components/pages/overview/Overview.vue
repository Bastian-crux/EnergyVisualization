<template>
  <base-card>
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
  </base-card>
  <base-card>
    <map-visualization :energy-type="energyType" :mode="mode"></map-visualization>
  </base-card>
</template>

<script>
import BaseCard from "@/components/UI/BaseCard.vue";
import MapVisualization from "@/components/pages/overview/MapVisualization.vue";
import {ref} from 'vue';

export default {
  name: "Overview",
  components: {MapVisualization, BaseCard},

  data() {
    return {
      radio1: ref('solar'),
      radio2: ref('quantity'),
      energyType: 'solar',
      mode: 'quantity',
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

</style>