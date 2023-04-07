<template>
  <div>
    <div
      style="
        font-size: 18px;
        font-weight: bolder;
        text-align: center;
        color: #6e6e6e;
        margin: 25px auto 5px auto;
      "
    >
      各能源年度发电总量 / 亿千瓦时
    </div>
    <el-row justify="center">
      <el-col :span="6" style="position: relative">
        <button
          class="icon"
          style="
            position: absolute;
            top: 20%;
            left: 50%;
            background: transparent;
            border: none;
          "
          @click="clickLastYear"
        >
          <font-awesome-icon
            :icon="['fas', 'chevron-left']"
            size="2xl"
            style="color: #6e6e6e"
          />
        </button>
      </el-col>
      <el-col :span="12">
        <div
          style="
            font-size: 32px;
            font-weight: bolder;
            text-align: center;
            color: #414141;
            margin: 0 auto;
          "
        >
          {{ selectedYear }}
        </div>
      </el-col>
      <el-col :span="6" style="position: relative">
        <button
          class="icon"
          style="
            position: absolute;
            top: 20%;
            right: 50%;
            background: transparent;
            border: none;
          "
          @click="clickNextYear"
        >
          <font-awesome-icon
            :icon="['fas', 'chevron-right']"
            size="2xl"
            style="color: #6e6e6e"
          />
        </button>
      </el-col>
    </el-row>
    <hr class="hr-solid" />
    <div
      style="
        font-size: 32px;
        font-weight: bolder;
        text-align: center;
        color: #414141;
        margin: 0 auto;
      "
    >
      {{ yearTotal }}
    </div>

    <div
      style="
        font-size: 14px;
        font-weight: bolder;
        text-align: center;
        color: #6e6e6e;
        margin: 5px auto 5px auto;
      "
    >
      所有能源发电量总和
    </div>
    <div style="height: 200px; width: 100%">
      <el-row justify="center">
        <el-col :span="3">
          <div class="icon-pos">
            <font-awesome-icon
              :icon="['fass', 'wind']"
              size="xl"
              style="color: #22c749"
            />
          </div>
          <div class="icon-pos">
            <font-awesome-icon
              :icon="['fas', 'sun']"
              size="xl"
              style="color: #ff9b1b"
            />
          </div>
          <div class="icon-pos">
            <font-awesome-icon
              :icon="['fas', 'radiation']"
              size="xl"
              style="color: #bdbdbd"
            />
          </div>
          <div class="icon-pos">
            <font-awesome-icon
              :icon="['fass', 'droplet']"
              size="xl"
              style="color: #4ea4fd"
            />
          </div>
          <div class="icon-pos">
            <font-awesome-icon
              :icon="['fass', 'fire']"
              size="xl"
              style="color: #ff7171"
            />
          </div>
        </el-col>
        <el-col :span="21">
          <div>
            <div class="chart" ref="main"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <hr class="hr-solid" />
    <span>同比{{ this.increment >= 0 ? "+" : "-" }}</span>
    <span> {{ increment }}% </span>
    <div class="pie">
      <div style="width: 100%; height: 100%" ref="myPie"></div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import fossil from "/assets/annualStatisticData/fossil.json";
import hydro from "/assets/annualStatisticData/hydro.json";
import nuclear from "/assets/annualStatisticData/nuclear.json";
import solar from "/assets/annualStatisticData/solar.json";
import wind from "/assets/annualStatisticData/wind.json";
import * as echarts from "echarts";
export default {
  name: "PowerSum",
  components: { FontAwesomeIcon },
  data() {
    return {
      myChart: null,
      myChart2: null,
      selectedYear: 2022,
      selectedType: "核能",
      powerData: [],
      yearTotal: null,
      increment: null,
    };
  },
  methods: {
    clickNextYear() {
      if (this.selectedYear < 2022) this.selectedYear++;
    },
    clickLastYear() {
      if (this.selectedYear > 2003) this.selectedYear--;
    },
    initEChart() {
      this.myChart = echarts.init(this.$refs.main);
      let option;

      option = {
        tooltip: {
          backgroundColor: "rgba(255,255,255,0.8)",
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
          data: ["火能", "水能", "核能", "太阳能", "风能"],
        },
        series: [
          {
            type: "bar",
            data: this.powerData,
            itemStyle: {
              barBorderRadius: [15, 15, 15, 15],
              color: function (params) {
                let colorList = [
                  "#ff7171",
                  "#4ea4fd",
                  "#bdbdbd",
                  "#ff9b1b",
                  "#22c749",
                ];
                return colorList[params.dataIndex];
              },
            },
            barWidth: 15,
          },
        ],
      };

      option && this.myChart.setOption(option);
      this.myChart.on("mouseover", this.mouseOverBar);
    },
    getPowerData() {
      this.powerData = [
        fossil[0][this.selectedYear],
        hydro[0][this.selectedYear],
        nuclear[0][this.selectedYear],
        solar[0][this.selectedYear],
        wind[0][this.selectedYear],
      ];
      this.yearTotal = Math.round(
        fossil[0][this.selectedYear] +
          hydro[0][this.selectedYear] +
          nuclear[0][this.selectedYear] +
          solar[0][this.selectedYear] +
          wind[0][this.selectedYear]
      );
    },
    computeIncrement(now, last) {
      if (last === 1) {
        this.increment = 0;
      } else {
        this.increment = (((now - last) / last) * 100).toFixed(2);
      }
      this.myChart2.setOption({
        series: [
          {
            data: [
              {
                value: this.increment,
              },
              {
                value: 100 - this.increment,
              },
            ],
          },
        ],
      });
    },
    mouseOverBar(param) {
      console.log(param.name);
      this.selectedType = param.name;
    },
    loadPie() {
      this.myChart2 = echarts.init(this.$refs.myPie);
      let option;
      option = {
        backgroundColor: "",
        series: [
          {
            type: "pie",
            radius: ["60%", "100%"],
            // center:['50%', '50%'],

            avoidLabelOverlap: false, // 启用防止标签重叠策略
            hoverAnimation: true,
            color: ["rgba(250,250,250,0.6)", "rgba(50,50,50,0.6)"],
            itemStyle: {
              borderRadius: 5,
              borderColor: "rgba(0, 0, 0, 0)",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "center",
              //富文本编辑，用于设置文本样式
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.increment,
              },
              {
                value: 100 - this.increment,
              },
            ],
          },
        ],
      };
      option && this.myChart2.setOption(option);
    },
    changePie() {
      switch (this.selectedType) {
        case "火能":
          this.computeIncrement(
            fossil[0][this.selectedYear],
            fossil[0][this.selectedYear - 1]
          );
          break;
        case "水能":
          this.computeIncrement(
            hydro[0][this.selectedYear],
            hydro[0][this.selectedYear - 1]
          );
          break;
        case "核能":
          this.computeIncrement(
            nuclear[0][this.selectedYear],
            nuclear[0][this.selectedYear - 1]
          );
          break;
        case "太阳能":
          this.computeIncrement(
            solar[0][this.selectedYear],
            solar[0][this.selectedYear - 1]
          );
          break;
        case "风能":
          this.computeIncrement(
            wind[0][this.selectedYear],
            wind[0][this.selectedYear - 1]
          );
          break;
      }
    },
  },
  mounted() {
    this.getPowerData();
    this.initEChart();
    this.loadPie();
    this.changePie();
  },
  watch: {
    selectedYear() {
      this.getPowerData();
      this.changePie();
      // echarts.dispose(this.myChart);
      // this.initEChart();
      this.myChart.setOption({
        series: [
          {
            data: this.powerData,
          },
        ],
      });
    },
    selectedType() {
      this.changePie();
    },
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 200px;
}
.pie {
  width: 100%;
  height: 100px;
}
.icon:hover {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}
.el-divider--horizontal {
  margin: 8px 0;
  background: 0 0;
  height: 10px;
}
.hr-solid {
  border: 0;
  border-top: 1px solid #d0d0d5;
  margin: 20px 12px;
}
.icon-pos {
  margin: 13px 20px;
}
</style>
