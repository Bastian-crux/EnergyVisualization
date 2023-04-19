<template>
  <div style="width: 100%; height: 200px">
    <div
      style="
        font-size: 18px;
        font-weight: bolder;
        text-align: center;
        color: #6e6e6e;
        margin: 25px auto 5px auto;
      "
    >
      年度发电碳排放总量 / 吨
    </div>
    <div class="grey-content">
      <el-row
        justify="center"
        style="display: flex; align-items: center; margin: 0 15px"
      >
        <el-col :span="14">
          <div class="bar" ref="main"></div>
        </el-col>
        <el-col :span="10">
          <div>
            <div style="font-size: 8px; color: #a9a9a9">
              {{ this.nowSelectedYear - 1 }}——{{ this.nowSelectedYear }}
            </div>
            <hr class="hr-solid" />
            <div>碳排放增量</div>
            <div>{{ emissionIncrement }}</div>
            <hr class="hr-solid" />
            <div>发电量增量</div>
            <div>{{ powerSumIncrement }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "CarbonEmission",
  data() {
    return {
      myChart: null,
      nowSelectedYear: 2022,
      // years: [2019, 2020, 2021, 2022],
      emissionSum: [4559020.004, 4656292.616, 5079571.847, 5142362.782],
      powerSum: [71422, 74169, 81122, 83386],
      emissionIncrement: null,
      powerSumIncrement: null,
      colorList: [
        "#e8e8e8",
        "#99d8ff",
        "#75b5ff",
        "#4a94f5",

        // "#bed2e5",
        // "#99c1da",
        // "#68a6cf",
        // "#307eb8",
        // "#0b5198",
      ],
    };
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.main);
      let option;
      let tempColorList = this.colorList;

      option = {
        polar: {
          radius: ["10%", "100%"],
        },
        barMaxWidth: 50,
        angleAxis: {
          show: false,
          // min: 4559020,
          max: 7000000,
          startAngle: 90,
          // scale: true,
          // splitNumber: 5,
          type: "value",
        },
        radiusAxis: {
          show: false,
          type: "category",
          data: ["2019", "2020", "2021", "2022"],
        },
        tooltip: {
          backgroundColor: "rgba(255,255,255,0.8)",
          position: "top",
          formatter: function (params) {
            if (params.seriesName === "background") {
              return "";
            }
            return (
              params.marker +
              "<b>" +
              params.name +
              "年" +
              "<br/>" +
              params.value +
              " Mt" +
              "</b>"
            );
          },
        },
        series: [
          {
            name: "data",
            type: "bar",
            // barWidth: 16,
            roundCap: true,
            data: this.emissionSum,
            coordinateSystem: "polar",
            animationEasing: "bounceOut",
            barGap: "-100%",
            z: 200,
            itemStyle: {
              color: function (params) {
                return tempColorList[params.dataIndex];
              },
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 1,
              shadowOffsetY: -1,
              shadowBlur: 2,
            },
          },
          {
            name: "background",
            type: "bar",
            // barWidth: 16,
            roundCap: true,
            data: [7000000, 7000000, 7000000, 7000000],
            coordinateSystem: "polar",
            barGap: "-100%",
            itemStyle: {
              color: "rgba(10,10,10,0.2)",
            },
            z: 100,
          },
        ],
      };
      option && this.myChart.setOption(option);
      this.myChart.on("mouseover", this.mouseOverBar);
    },
    mouseOverBar(param) {
      console.log(param.name);
      this.nowSelectedYear = param.name;
    },
    computeIncrement() {
      if (this.nowSelectedYear === "2019") {
        this.emissionIncrement = "/";
        this.powerSumIncrement = "/";
      } else {
        this.emissionIncrement =
          (
            ((this.emissionSum[this.nowSelectedYear - 2019] -
              this.emissionSum[this.nowSelectedYear - 2020]) /
              this.emissionSum[this.nowSelectedYear - 2020]) *
            100
          ).toFixed(2) + "%";
        this.powerSumIncrement =
          (
            ((this.powerSum[this.nowSelectedYear - 2019] -
              this.powerSum[this.nowSelectedYear - 2020]) /
              this.powerSum[this.nowSelectedYear - 2020]) *
            100
          ).toFixed(2) + "%";
      }
    },
  },

  mounted() {
    this.computeIncrement();
    this.initChart();
  },
  watch: {
    nowSelectedYear() {
      this.computeIncrement();
    },
  },
};
</script>

<style scoped>
.bar {
  width: 100%;
  height: 160px;
  margin: 10px auto;
  /*border: 1px solid;*/
}
.grey-content {
  font-size: 14px;
  font-weight: bolder;
  text-align: center;
  color: #6e6e6e;
}
.hr-solid {
  border: 0;
  border-top: 1px solid #d0d0d5;
  margin: 10px 12px;
}
</style>
