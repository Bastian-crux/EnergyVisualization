<template>
  <div>
    <div class="chart" id="monthlyChart"/>
  </div>
</template>

<script>
import fossil from '/assets/monthlyStatisticData/fossil.json'
import hydro from '/assets/monthlyStatisticData/hydro.json'
import nuclear from '/assets/monthlyStatisticData/nuclear.json';
import solar from '/assets/monthlyStatisticData/solar.json';
import wind from '/assets/monthlyStatisticData/wind.json';
import * as echarts from "echarts";

export default {
  name: "MonthlyChart",
  data() {
    return {
      myChart: null,
      gridIndex: Array(),
      fossilValue: Array(),
      hydroValue: Array(),
      nuclearValue: Array(),
      solarValue: Array(),
      windValue: Array()
    }
  },
  methods: {
    loadChart() {
      const chartDom = document.getElementById('monthlyChart');
      this.myChart = echarts.init(chartDom);
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
            data: Array.from(this.gridIndex)
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
            data: Array.from(this.fossilValue)
          },
          {
            name: '水力',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: Array.from(this.hydroValue)
          },
          {
            name: '核能',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: Array.from(this.nuclearValue)
          },
          {
            name: '太阳能',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: Array.from(this.solarValue)
          },
          {
            name: '风能',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: Array.from(this.windValue)
          }
        ]
      };
      this.myChart.setOption(option);
    },
    getData() {
      Object.keys(fossil[0]).forEach(index => {
        this.gridIndex.unshift(index);
        this.fossilValue.unshift(fossil[0][index]);
      })
      Object.keys(hydro[0]).forEach(index => {
        this.hydroValue.unshift(hydro[0][index])
      })
      Object.keys(nuclear[0]).forEach(index => {
        this.nuclearValue.unshift(nuclear[0][index])
      })
      Object.keys(solar[0]).forEach(index => {
        this.solarValue.unshift(solar[0][index])
      })
      Object.keys(wind[0]).forEach(index => {
        this.windValue.unshift(wind[0][index])
      })
    }
  },
  mounted() {
    this.getData();
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