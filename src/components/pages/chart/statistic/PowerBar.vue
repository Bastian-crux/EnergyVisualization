<template>
  <el-row justify="center">
    <el-col :span="4">
      <div class="type-box">煤炭产量</div>
      <div class="data">/ 亿吨</div>
      <div class="type-box">电力装机</div>
      <div class="data">/ 万千万</div>
      <div class="type-box">发电量</div>
      <div class="data">/ 亿千瓦时/年</div>
      <div class="type-box">石油产量</div>
      <div class="data">/ 亿吨</div>
      <div class="type-box">天然气产量</div>
      <div class="data">/ 亿立方米</div>
    </el-col>
    <el-col :span="20">
      <div class="chart" ref="main"></div>
    </el-col>
  </el-row>
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
          show: true,
          backgroundColor: "rgba(255,255,255,0.6)",
          position: "top",
          // trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          textStyle: {
            color: "rgba(60,60,60,0.8)",
          },
          formatter: function (params) {
            console.log(params);
            return (
              "<b>" +
              params.data.time0 +
              "年: " +
              params.data.value0 +
              params.data.type +
              "<br/>" +
              params.data.time1 +
              "年: " +
              params.data.value1 +
              params.data.type +
              "</b>"
            );
          },
        },
        // legend: {},
        grid: {
          left: "0%",
          right: "0%",
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
            data: [
              {
                time0: 1949,
                time1: 1977,
                value: 16,
                value0: 0.3,
                value1: 5.5,
                type: "亿吨",
              },
              {
                time0: 1949,
                time1: 1980,
                value: 35,
                value0: 185,
                value1: 6587,
                type: "万千瓦",
              },
              {
                time0: 1949,
                time1: 1980,
                value: 69,
                value0: 43,
                value1: 3006,
                type: "亿千瓦时/年",
              },
              {
                time0: 1949,
                time1: 1978,
                value: 833,
                value0: 0.0012,
                value1: 1,
                type: "亿吨",
              },
              {
                time0: 1949,
                time1: 1975,
                value: 1264,
                value0: 0.07,
                value1: 88.5,
                type: "亿立方米",
              },
            ],
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
  height: 280px;
}

.type-box {
  font-weight: bold;
  height: 5px;
  margin: 15px auto;
}
.data {
  color: rgba(255, 255, 255, 0.6);
  text-indent: 2em;
  font-size: 10px;
  margin: 6px auto;
}
</style>
