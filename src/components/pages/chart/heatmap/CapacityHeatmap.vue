<template>
  <div>
    <div class="chart" id="myHeatmap"></div>
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
        polar: {},
        tooltip: {
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
          inRange: {
            color: [
              "#B8E1FF",
              "#9AC5FF",
              "#7DAAFF",
              "#5B8FF9",
              "#3D76DD",
              "#085EC0",
              "#0047A5",
              "#00318A",
              "#001D70",
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
          boundaryGap: false,
          splitLine: {
            show: true,
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
        },
        series: [
          {
            name: "发电站装机增量",
            type: "custom",
            coordinateSystem: "polar",
            itemStyle: {
              color: "#001D70",
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
                  r0: coord[2] - size[0] / 2,
                  r: coord[2] + size[0] / 2,
                  startAngle: -(coord[3] + size[1] / 2),
                  endAngle: -(coord[3] - size[1] / 2),
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
      let option = this.myChart.getOption();
      this.myChart.setOption(option);
    };
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
