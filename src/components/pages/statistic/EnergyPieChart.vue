<template>
  <div>
    <div class="pie" ref="myPie"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "EnergyPieChart",
  props: ['type', 'data', 'total', 'color'],
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
        backgroundColor:'',
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['50%', '120%'],
            // center:['50%', '50%'],

            avoidLabelOverlap: false, // 启用防止标签重叠策略
            hoverAnimation: true,
            color: [this.color, "rgba(50,50,50,0.3)"],
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
                num: {
                  color: this.color,
                  fontSize: '25',
                  fontWeight: 'bolder'
                }
              }
            },
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
    window.addEventListener('resize', () => {
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
  height: 80px;
}
</style>