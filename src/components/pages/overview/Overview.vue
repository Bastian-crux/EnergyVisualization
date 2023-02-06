<template>
  <base-card>
    <div>
      能源类型
    </div>
    <div>
      <el-radio-group v-model="radio" style="margin-top: 20px">
        <el-radio-button label="solar">太阳能</el-radio-button>
        <el-radio-button label="wind">风能</el-radio-button>
        <el-radio-button label="nuclear">核能</el-radio-button>
        <el-radio-button label="bio">生物能</el-radio-button>
      </el-radio-group>
    </div>
  </base-card>
  <base-card>
    <map-visualization :energy-type="energyType"></map-visualization>
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
      radio: ref('solar'),
      energyType: 'solar',
    }
  },
  methods:{

  },
  watch: {
    radio: function (val) {
      this.energyType = val;
    }
  }
}
</script>

<style scoped>

</style>