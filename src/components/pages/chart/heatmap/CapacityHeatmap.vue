<template>
  <div>
    <hr class="hr-solid" />
    <div>
      <div class="chart" id="myHeatmap"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import capacity_growth from "/assets/capacityData/capacity_growth.json";
import { createApp } from "vue";
import ElementPlus from "element-plus";

import HeatMapToolTip from "@/components/pages/chart/heatmap/HeatMapToolTip.vue";

export default {
  name: "CapacityHeatmap",
  data() {
    return {
      myChart: null,
    };
  },
  methods: {
    loadHeatMap() {
      let chartDom = document.getElementById("myHeatmap");
      this.myChart = echarts.init(chartDom);
      let option;

      const year = [
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
      ];
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
          center: ["50%", "100%"],
          radius: ["20%", "150%"],
        },
        tooltip: {
          position: "right",
          formatter: (params) => {
            const dom = document.createElement("div");
            const MyComponent = createApp(HeatMapToolTip, {
              name: energyType[params.value[0]],
              year: year[params.value[1]],
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

              "#a5ecd6",
              "#7bd7bc",
              "#45af95",
              "#287962",
              "#084934",
            ],
          },
          left: "center",
          dimension: 2,
          calculable: true,
          orient: "horizontal",
        },
        angleAxis: {
          type: "category",
          data: year,
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
          data: energyType,
          z: 100,
          show: false,
        },
        series: [
          {
            // name: "发电站装机增量",
            type: "custom",
            coordinateSystem: "polar",
            // itemStyle: {
            //   color: "#001D70",
            // },
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
      option && this.myChart.setOption(option);
    },
  },
  mounted() {
    this.loadHeatMap();
    window.onresize = () => {
      echarts.dispose(this.myChart);
      this.loadHeatMap();
    };
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 200px;
  margin: 30px 0;
  border: 5px solid;
}
.hr-solid {
  border: 0;
  border-top: 1px solid #d0d0d5;
  margin: 20px 12px;
}
</style>
