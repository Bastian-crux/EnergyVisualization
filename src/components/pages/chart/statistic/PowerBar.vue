<template>
  <div class="chart" ref="main"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "PowerBar",
  data() {
    return {};
  },
  methods: {
    initEChart() {
      this.myChart = echarts.init(this.$refs.main);
      let option;
      option = {
        tooltip: {
          backgroundColor: "rgba(255,255,255,0)",
          position: "top",
          // trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // legend: {},
        grid: {
          left: "5%",
          right: "2%",
          bottom: "5%",
          top: "5%",
          // containLabel: true,
        },

        xAxis: {
          show: false,
          type: "log",
          // boundaryGap: [0, 0.01],
        },
        yAxis: {
          show: false,
          type: "category",
          data: ["煤炭产量", "电力装机", "发电量", "石油产量", "天然气产量"],
        },
        series: [
          {
            type: "bar",
            data: [16, 35, 69, 833, 1264],
            itemStyle: {
              barBorderRadius: [15, 15, 15, 15],
              color: "rgba(255, 255, 255, 0.8)",
              shadowColor: "rgba(0, 0, 0, 0.8)",
              shadowOffsetX: 1,
              shadowOffsetY: 2,
              shadowBlur: 3,
            },
            barWidth: 10,
          },
        ],
      };
      option && this.myChart.setOption(option);
    },
  },
  mounted() {
    this.initEChart();
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 200px;
}
</style>
