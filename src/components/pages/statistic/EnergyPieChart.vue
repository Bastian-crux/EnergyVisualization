<template>
  <div>
    <div class="pie" ref="myPie"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "EnergyPieChart",
  props: ['type', 'data', 'total'],
  data() {
    return {
      myChart: null
    };
  },
  methods: {
    loadPie() {
      this.myChart = echarts.init(this.$refs.myPie);
      let option;
      option = {
        // tooltip: {
        //   trigger: 'item'
        // },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],

            avoidLabelOverlap: false, // 启用防止标签重叠策略
            hoverAnimation: true,
            color: ["rgba(135,218,118,0.3)", "rgba(50,50,50,0.3)"],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'center',
              formatter: function (data) {
                // return '{name|' + data.name + '}\n\n{num|' + data.percent + '%}';
                return '{num|' + data.percent + '%}';
              },
              //富文本编辑，用于设置文本样式
              rich: {
                // name: {
                //   color: 'rgba(50,50,50,0.3)',
                //   fontSize: '40',
                //   // textShadowColor: 'rgba(0,255,252,1)',
                //   // textShadowBlur: '4'
                // },
                num: {
                  color: 'rgba(135,218,118,0.3)',
                  fontSize: '25',
                  fontWeight: 'bolder'
                }
              }
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: 40,
            //     fontWeight: 'bold'
            //   }
            // },
            labelLine: {
              show: false
            },
            data: [
              {
                value: this.data,
                name: this.type,

              },
              {
                value: this.total - this.data,
                name: '其他能源',
                label: {
                  show: false
                }
              },
            ]
          }
        ]
      };
      option && this.myChart.setOption(option);
    },
  },
  mounted() {
    window.addEventListener('resize', ()=> {
        echarts.dispose(this.myChart);
        this.loadPie();
    });
    this.loadPie();
  },
  watch: {
    data() {
      echarts.dispose(this.myChart);
      this.loadPie();
    }
  }
}
</script>

<style scoped>
.pie {
  width: 100%;
  height: 300px;
}
</style>