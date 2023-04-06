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
      <!--      各能源年度发电总量-->
      11111
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
        font-size: 18px;
        font-weight: bolder;
        text-align: center;
        color: #6e6e6e;
        margin: 25px auto 5px auto;
      "
    >
      总和
    </div>
    <div>
      <div class="chart" ref="main"></div>
    </div>
    <hr class="hr-solid" />
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
      selectedYear: 2022,
      options: [
        2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
        2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
      ],
      powerData: [],
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
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // legend: {},
        grid: {
          left: "10%",
          right: "5%",
          bottom: "5%",
          top: "5%",
          // containLabel: true,
        },

        xAxis: {
          show: false,
          type: "value",
          boundaryGap: [0, 0.001],
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
    },
    getPowerData() {
      this.powerData = [
        fossil[0][this.selectedYear],
        hydro[0][this.selectedYear],
        nuclear[0][this.selectedYear],
        solar[0][this.selectedYear],
        wind[0][this.selectedYear],
      ];
    },
  },
  mounted() {
    this.getPowerData();
    this.initEChart();
  },
  watch: {
    selectedYear() {
      this.getPowerData();
      echarts.dispose(this.myChart);
      this.initEChart();
    },
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 200px;
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
  margin: 15px 10px;
}
</style>
