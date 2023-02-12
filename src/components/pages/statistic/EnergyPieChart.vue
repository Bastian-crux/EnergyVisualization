<template>
  <div>
    <div class="pie" id="myPie"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "EnergyPieChart",
  data(){
    return{

    };
  },
  methods:{
    loadPie(){
      let chartDom = document.getElementById('myPie');
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],

            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 200, name: 'Search Engine' },
              { value: 1000-200, name: '' },
            ]
          }
        ]
      };
      option && myChart.setOption(option);
      console.log("111");
    },
  },
  mounted() {
    this.loadPie();
  }
}
</script>

<style scoped>
.pie {
  width: 100%;
  height: 600px;
}
</style>