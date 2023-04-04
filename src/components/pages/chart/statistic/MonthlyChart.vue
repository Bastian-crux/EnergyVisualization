<template>
  <div>
    <div class="chart" id="monthlyChart" />
  </div>
</template>

<script>
import gridIndex from "/assets/monthlyStatisticData/gridIndex.json";
import fossil from "/assets/monthlyStatisticData/fossil.json";
import hydro from "/assets/monthlyStatisticData/hydro.json";
import nuclear from "/assets/monthlyStatisticData/nuclear.json";
import solar from "/assets/monthlyStatisticData/solar.json";
import wind from "/assets/monthlyStatisticData/wind.json";
import * as echarts from "echarts";
import { markRaw } from "vue";

export default {
  name: "MonthlyChart",
  data() {
    return {
      myChart: null,
    };
  },
  methods: {
    loadChart() {
      const chartDom = document.getElementById("monthlyChart");
      this.myChart = markRaw(echarts.init(chartDom));
      let option;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["火力", "水力", "风能", "", "核能", "太阳能"],
          icon: "pin",
        },
        color: ["#bbfaab", "#6bbd5c", "#6bbd5c", "#4e9655", "#33704b"],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "8%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: gridIndex[0],
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 1000,
          },
        ],
        series: [
          {
            name: "火力",
            type: "line",
            stack: "Total",
            symbolSize: 0,
            areaStyle: {
              color: "#bbfaab",
            },
            lineStyle: {
              color: "#bbfaab",
            },

            emphasis: {
              focus: "series",
            },
            data: fossil.map((item) => {
              return item[1];
            }),
          },
          {
            name: "水力",
            type: "line",
            stack: "Total",
            symbolSize: 0,
            areaStyle: {
              color: "#6bbd5c",
            },
            lineStyle: {
              color: "#6bbd5c",
            },

            emphasis: {
              focus: "series",
            },
            data: hydro.map((item) => {
              return item[1];
            }),
          },
          {
            name: "风能",
            type: "line",
            stack: "Total",
            symbolSize: 0,
            areaStyle: {
              color: "#4e9655",
            },
            lineStyle: {
              color: "#4e9655",
            },

            emphasis: {
              focus: "series",
            },
            data: wind.map((item) => {
              return item[1];
            }),
          },
          {
            name: "核能",
            type: "line",
            stack: "Total",
            symbolSize: 0,
            areaStyle: {
              color: "#33704b",
            },
            lineStyle: {
              color: "#33704b",
            },
            emphasis: {
              focus: "series",
            },
            data: nuclear.map((item) => {
              return item[1];
            }),
          },
          {
            name: "太阳能",
            type: "line",
            stack: "Total",
            symbolSize: 0,
            // symbol: 'circle',
            areaStyle: {
              color: "#10332c",
            },
            lineStyle: {
              color: "#10332c",
            },
            itemStyle: {
              color: "#10332c",
              lineStyle: {
                color: "#10332c",
              },
            },
            emphasis: {
              focus: "series",
            },
            data: solar.map((item) => {
              return item[1];
            }),
          },
        ],
        dataZoom: [
          {
            fillerColor: "rgba(0,111,69,0.5)", // 选中部分背景填充颜色
            backgroundColor: "rgba(72,222,133,0.2)", // slider背景填充颜色
            dataBackground: {
              // 缩略图
              lineStyle: {
                // 折线颜色
                color: "rgb(31,138,105)",
              },
              areaStyle: {
                // 填充颜色
                color: "rgb(31,138,105)",
              },
            },
            dataBackgroundColor: "rgba(255,255,255,0.5)", // slider框的颜色
            handleStyle: {
              color: "rgba(171,213,146,0)",
              borderColor: "rgba(171,213,146,0)",
            },
            handleIcon: "M0,0 v9.7h3 v-9.7h-3 Z",
            minSpan: 2,
            brushSelect: false,
            animation: true,
            id: "dataZoomX",
            type: "slider",
            xAxisIndex: [0],
            filterMode: "filter",
            startValue: "2020年1月",
          },
          // {
          //   id: 'dataZoomY',
          //   type: 'slider',
          //   yAxisIndex: [0],
          //   filterMode: 'empty',
          //   startValue: 3000,
          //   // showDataShadow: false,
          // }
        ],
      };
      option && this.myChart.setOption(option);
    },
  },
  mounted() {
    window.onresize = () => {
      let option = this.myChart.getOption();
      this.myChart.setOption(option);
    };
    this.loadChart();
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}
</style>
