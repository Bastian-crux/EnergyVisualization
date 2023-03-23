<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="24">
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
      <el-col :span="24" class="margin">
        <el-progress
          :text-inside="true"
          :stroke-width="26"
          :percentage="percentage"
        >
          <span>{{ currentYear + "年" }}</span>
        </el-progress>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="box-card">
    <TimelineVisualization
      :energy-type="energyType"
      :current-year="currentYear"
    />
  </el-card>
</template>

<script>
import { watch, ref } from "vue";
import TimelineVisualization from "@/components/pages/timeline/TimelineVisualization.vue";

export default {
  name: "Timeline",
  components: { TimelineVisualization },
  data() {
    return {
      radio1: ref("solar"),
      energyType: "solar",
      currentYear: 2010,
    };
  },
  watch: {
    radio1(val) {
      this.energyType = val;
      this.currentYear = 2010;
    },
  },
  computed: {
    percentage() {
      return ((this.currentYear - 2010) / (2022 - 2010)) * 100;
    },
  },
  mounted() {
    setInterval(() => {
      if (this.currentYear < 2022) this.currentYear += 1;
    }, 1000);
  },
};
</script>

<style scoped>
.box-card {
  width: 80%;
  margin: 1rem auto;
}

.margin {
  margin-top: 20px;
}
</style>
