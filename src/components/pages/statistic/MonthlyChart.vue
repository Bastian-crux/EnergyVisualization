<template>
  <div>
    <div class="chart" id="monthlyChart"/>
  </div>
</template>

<script>
import gridIndex from '/assets/monthlyStatisticData/gridIndex.json'
import fossil from '/assets/monthlyStatisticData/fossil.json'
import hydro from '/assets/monthlyStatisticData/hydro.json'
import nuclear from '/assets/monthlyStatisticData/nuclear.json';
import solar from '/assets/monthlyStatisticData/solar.json';
import wind from '/assets/monthlyStatisticData/wind.json';
import * as echarts from "echarts";
import { markRaw } from 'vue'

export default {
  name: "MonthlyChart",
  data() {
    return {
      myChart: null
    }
  },
  methods: {
    loadChart() {
      const chartDom = document.getElementById('monthlyChart');
      this.myChart = markRaw(echarts.init(chartDom));
      let option;
      option = {
        title: {
          text: '全国各能源发电量月度统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['火力', '水力', '核能', '太阳能', '风能']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: gridIndex[0]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '火力',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: fossil.map(item => {
              return item[1]
            })
          },
          {
            name: '水力',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: hydro.map(item => {
              return item[1]
            })
          },
          {
            name: '核能',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: nuclear.map(item => {
              return item[1]
            })
          },
          {
            name: '太阳能',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: solar.map(item => {
              return item[1]
            })
          },
          {
            name: '风能',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: wind.map(item => {
              return item[1]
            })
          }
        ],
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
            startValue: '2020年1月'
          },
          {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'empty',
            startValue: 3000
          }
        ],
      };
      this.myChart.setOption(option);
    },
  },
  mounted() {
    window.onresize = (() => {
      echarts.dispose(this.myChart);
      this.loadChart();
    });
    this.loadChart();
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 600px;
}
</style>