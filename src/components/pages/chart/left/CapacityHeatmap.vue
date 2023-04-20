<template>
  <div>
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
      各能源装机增量 / 万千瓦
    </div>
    <div>
      <div class="chart1" id="myHeatmap"></div>
    </div>
    <div style="font-size: 8px; color: #a9a9a9; text-align: center">
      2012————2021
    </div>
    <hr class="hr-solid" />

    <el-row
      justify="center"
      style="display: flex; align-items: center; margin: 0 15px"
    >
      <el-col :span="8">
        <div class="grey-content" style="margin: 5px auto 5px auto">
          <div style="font-size: 8px; color: #a9a9a9">
            {{ year[nowSelectedYearIndex] }}年
          </div>
          <hr class="hr-solid" style="margin: 10px 12px" />
          <div>装机增量</div>
          <font-awesome-icon :icon="['fas', 'chart-line']" size="lg" />
          <hr class="hr-solid" style="margin: 10px 12px" />
          <div>装机总量</div>
          <font-awesome-icon :icon="['fas', 'chart-column']" size="lg" />
        </div>
      </el-col>
      <el-col :span="16">
        <div>
          <div class="chart2" id="myBar"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import capacity_growth from "/assets/capacityData/capacity_growth.json";
import capacity from "/assets/capacityData/capacity.json";
import { createApp } from "vue";
import ElementPlus from "element-plus";

import HeatMapToolTip from "@/components/pages/chart/left/HeatMapToolTip.vue";

export default {
  name: "CapacityHeatmap",
  data() {
    return {
      myChart1: null,
      myChart2: null,
      year: [
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
      ],
      colorList: ["#ff7171", "#4ea4fd", "#a2a2a2", "#22c749", "#ff9b1b"],
      nowSelectedYearIndex: 9,
      yearData: null,
      growthData: null,
    };
  },
  methods: {
    loadHeatMap() {
      let chartDom = document.getElementById("myHeatmap");
      this.myChart1 = echarts.init(chartDom);
      let option;

      const energyType = ["火电", "水电", "核电", "风电", "太阳能"];
      const data = capacity_growth;
      const maxValue = data.reduce(function (max, item) {
        return Math.max(max, item[2]);
      }, -Infinity);
      option = {
        legend: {
          data: ["发电站装机增量"],
        },
        polar: {
          center: ["50%", "110%"],
          radius: ["20%", "170%"],
        },
        tooltip: {
          position: "right",
          backgroundColor: "rgba(255,255,255,0.8)",
          formatter: (params) => {
            const dom = document.createElement("div");
            const MyComponent = createApp(HeatMapToolTip, {
              name: energyType[params.value[0]],
              year: this.year[params.value[1]],
              value: params.value[2],
              o_type: params.value[0],
              o_year: params.value[1],
            });
            MyComponent.use(ElementPlus);
            const instance = MyComponent.mount(dom);
            return instance.$el;
          },
        },
        visualMap: {
          type: "continuous",
          min: 0,
          max: maxValue,
          show: false,
          inRange: {
            color: [
              // "#d5ebff",
              // "#9AC5FF",
              // "#7DAAFF",
              // "#5B8FF9",
              // "#3D76DD",
              // "#085EC0",
              // "#0047A5",
              // "#00318A",
              // "#001D70",
              // "rgba(240,240,240,0.8)",
              // "rgba(217,217,217,0.8)",
              // "rgba(140,140,140,0.8)",
              // "rgba(89,89,89,0.8)",
              // "rgba(67,67,67,0.8)",
              // "#262626",

              // "#a5ecd6",
              // "#7bd7bc",
              // "#45af95",
              // "#287962",
              // "#084934",
              "#e8e8e8",
              "#FFB499",
              "#FF8C75",
              "#F54F4A",
            ],
          },
          left: "center",
          dimension: 2,
          calculable: true,
          orient: "horizontal",
        },
        angleAxis: {
          type: "category",
          data: this.year,
          show: false,
          // startAngle: 72,
          boundaryGap: false,
          splitLine: {
            show: false,
            lineStyle: {
              color: "#ddd",
              type: "dashed",
            },
          },
          axisLine: {
            show: false,
          },
        },
        radiusAxis: {
          type: "category",
          // nameRotation: 1,
          // nameGap: 10,
          nameLocation: "middle",
          data: energyType,
          z: 100,
          show: false,
          min: null,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            // showMinLabel: true,
            // margin: 10,
            rotate: 45,
          },
        },
        series: [
          {
            // name: "发电站装机增量",
            type: "custom",
            coordinateSystem: "polar",
            itemStyle: {
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 1,
              shadowOffsetY: 1,
              shadowBlur: 1,
            },
            renderItem: function (params, api) {
              let values = [api.value(0), api.value(1)];
              let coord = api.coord(values);
              let size = api.size([1, 1], values);
              return {
                type: "sector",
                shape: {
                  cx: params.coordSys.cx,
                  cy: params.coordSys.cy,
                  r0: coord[2] - size[0] / 2 + 30,
                  r: coord[2] + size[0] / 2 + 30,
                  startAngle:
                    -(coord[3] + size[1] / 2) / 3 - ((54 + 60) / 180) * Math.PI,
                  endAngle:
                    -(coord[3] - size[1] / 2) / 3 - ((54 + 60) / 180) * Math.PI,
                },
                style: api.style({
                  fill: api.visual("color"),
                }),
              };
            },
            data: data,
          },
        ],
      };
      option && this.myChart1.setOption(option);
      this.myChart1.on("mouseover", this.changeLine);
    },
    changeLine(param) {
      console.log(param.data);
      this.nowSelectedYearIndex = param.data[1];
      this.computeBar();
    },
    loadBar() {
      let chartDom = document.getElementById("myBar");
      this.myChart2 = echarts.init(chartDom);
      let option;

      let tempColorList = this.colorList;

      option = {
        tooltip: {
          show: true,
          backgroundColor: "rgba(255,255,255,0.8)",
          position: "top",
          // trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "3%",
          top: "5%",
          // containLabel: true,
        },
        xAxis: [
          {
            show: false,
            type: "category",
            data: ["火能", "水能", "核能", "风能", "太阳能"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            show: false,
            type: "log",
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: "50%",
            stack: "total",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              barBorderRadius: [5, 5, 5, 5],
              color: "rgba(10, 10, 10, 0.1)",
            },
            data: this.yearData,
          },
          {
            type: "line",
            barWidth: "50%",
            stack: "total",
            smooth: 0.2,
            emphasis: {
              focus: "series",
            },
            symbol: "circle",
            symbolSize: function (value) {
              // 点的大小跟随数值增加而变大
              return Math.log(value) * 1.5;
            },
            itemStyle: {
              normal: {
                label: {
                  // show: true,
                  // textStyle: {
                  //   fontWeight: 30,
                  //   fontSize: 12,
                  // },
                  // position: "top",
                },
                barBorderRadius: [5, 5, 0, 0],
                shadowColor: "rgba(0, 0, 0, 0.6)",
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowBlur: 5,
                color: function (params) {
                  return tempColorList[params.dataIndex];
                },
              },
            },
            lineStyle: {
              color: "rgba(10, 10, 10, 0.2)",
            },
            data: this.growthData,
          },
        ],
      };

      option && this.myChart2.setOption(option);
    },
    computeBar() {
      this.yearData = [];
      this.growthData = [];
      for (let i = 0; i < 5; i++) {
        this.yearData.push(capacity[i][this.nowSelectedYearIndex]);

        if (this.nowSelectedYearIndex > 0) {
          this.growthData.push(
            capacity[i][this.nowSelectedYearIndex] -
              capacity[i][this.nowSelectedYearIndex - 1]
          );
        } else {
          this.growthData.push(0);
        }
      }
    },
  },
  mounted() {
    this.loadHeatMap();
    this.computeBar();
    this.loadBar();
    window.onresize = () => {
      echarts.dispose(this.myChart1);
      this.loadHeatMap();
    };
  },
  watch: {
    nowSelectedYearIndex() {
      this.myChart2.setOption({
        series: [
          {
            data: this.yearData,
          },
          {
            data: this.growthData,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.chart1 {
  width: 100%;
  height: 160px;
  margin: 10px 0;
  /*border: 1px solid;*/
}
.chart2 {
  width: 100%;
  height: 160px;
  margin: 0px 0;
  /*border: 1px solid;*/
}
.hr-solid {
  border: 0;
  border-top: 1px solid #d0d0d5;
  margin: 20px 12px;
}
.grey-content {
  font-size: 14px;
  font-weight: bolder;
  text-align: center;
  color: #6e6e6e;
}
</style>
