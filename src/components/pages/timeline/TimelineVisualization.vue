<template>
  <div>
    <div class="chart" id="timelineMap"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  findSmallestValue,
  findBiggestValue,
  formatterHelper,
  statusChinese,
} from "@/utils";

import world from "/assets/mapData/world.json";
import solarProvinceAllData from "../../../../assets/powerstationData/solar.json";
import windProvinceAllData from "../../../../assets/powerstationData/wind.json";
import nuclearProvinceAllData from "../../../../assets/powerstationData/nuclear.json";
import biologyProvinceAllData from "../../../../assets/powerstationData/bioenergy.json";

export default {
  name: "TimelineVisualization",
  props: {
    energyType: {
      type: String,
      default: "solar",
    },
    currentYear: {
      type: Number,
      default: 2010,
    },
  },
  data() {
    return {
      myMap: null,
    };
  },
  methods: {
    loadMap() {
      const chartDom = document.getElementById("timelineMap");
      this.myMap = echarts.init(chartDom);
      let option;
      echarts.registerMap("world", world, {});
      option = {
        progressive: 20000,
        backgroundColor: "#111",
        geo: {
          center: [104.564895, 32.758238],
          zoom: 6,
          map: "world",
          roam: false,
          silent: true,
          itemStyle: {
            color: "transparent",
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 1,
          },
        },
        options: this.seriesData,
        series: [
          {
            type: "scatter",
            data: this.formData(),
            coordinateSystem: "geo",
            symbolSize: 5,
            zlevel: 1,
          },
        ],
      };
      option && this.myMap.setOption(option);
    },
    formData() {
      let tempData = [];
      for (let i = 0; i < this.allData.length; i++) {
        tempData.push({
          name: this.allData[i][0],
          value: [this.allData[i][3], this.allData[i][4], this.allData[i][6]],
        });
      }
      return tempData;
    },
  },
  mounted() {
    this.loadMap();
    window.onresize = () => {
      echarts.dispose(this.myMap);
      this.loadMap();
    };
  },
  computed: {
    allData() {
      let data;
      switch (this.energyType) {
        case "solar":
          data = solarProvinceAllData;
          break;
        case "wind":
          data = windProvinceAllData;
          break;
        case "nuclear":
          data = nuclearProvinceAllData;
          break;
        case "bio":
          data = biologyProvinceAllData;
          break;
      }
      return data.filter((item) => {
        return item[6] <= this.currentYear;
      });
    },
  },
  watch: {
    energyType() {
      echarts.dispose(this.myMap);
      this.loadMap();
    },
    currentYear() {
      let option = this.myMap.getOption();
      option.series[0].data = this.formData();
      this.myMap.setOption(option);
      // echarts.dispose(this.myMap);
      // this.loadMap();
    },
  },
};
</script>

<style scoped>
.box-card {
  width: 80%;
  margin: 1rem auto;
}

.chart {
  width: 100%;
  height: 600px;
}
</style>
