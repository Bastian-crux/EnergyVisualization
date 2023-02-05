<template>
  <div>
    <div class="chart" id="mainChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import mapData from '/assets/china_base.json';

import beijing from '/assets/beijing.json';
import tianjin from '/assets/tianjin.json';
import hebei from '/assets/hebei.json';
import shanxi from '/assets/shanxi.json';
import InnerMongolia from '/assets/InnerMongolia.json';
import liaoning from '/assets/liaoning.json';
import jilin from '/assets/jilin.json';
import heilongjiang from '/assets/heilongjiang.json';
import shanghai from '/assets/shanghai.json';
import jiangsu from '/assets/jiangsu.json';
import zhejiang from '/assets/zhejiang.json';
import anhui from '/assets/anhui.json';
import fujian from '/assets/fujian.json';
import jiangxi from '/assets/jiangxi.json';
import shandong from '/assets/shandong.json';
import henan from '/assets/henan.json';
import hubei from '/assets/hubei.json';
import hunan from '/assets/hunan.json';
import guangdong from '/assets/guangdong.json';
import guangxi from '/assets/guangxi.json';
import hainan from '/assets/hainan.json';
import chongqing from '/assets/chongqing.json';
import sichuan from '/assets/sichuan.json';
import guizhou from '/assets/guizhou.json';
import yunnan from '/assets/yunnan.json';
import tibet from '/assets/tibet.json';
import shaanxi from '/assets/shaanxi.json';
import gansu from '/assets/gansu.json';
import qinghai from '/assets/qinghai.json';
import ningxia from '/assets/ningxia.json';
import xinjiang from '/assets/xinjiang.json';
import taiwan from '/assets/taiwan.json';
import hongkong from '/assets/hongkong.json';
import macao from '/assets/macao.json';

import BaseCard from "@/components/UI/BaseCard.vue";
export default {
  name: "MapVisualization",
  components: {BaseCard},
  data() {
    return {
      myChart: null,
      nowSelectedProvince: 'mapData',
      areaDic: {
        '北京市': 'beijing',
        '天津市': 'tianjin',
        '河北省': 'hebei',
        '山西省': 'shanxi',
        '内蒙古自治区': 'InnerMongolia',
        '辽宁省': 'liaoning',
        '吉林省': 'jilin',
        '黑龙江省': 'heilongjiang',
        '上海市': 'shanghai',
        '江苏省': 'jiangsu',
        '浙江省': 'zhejiang',
        '安徽省': 'anhui',
        '福建省': 'fujian',
        '江西省': 'jiangxi',
        '山东省': 'shandong',
        '河南省': 'henan',
        '湖北省': 'hubei',
        '湖南省': 'hunan',
        '广东省': 'guangdong',
        '广西壮族自治区': 'guangxi',
        '海南省': 'hainan',
        '重庆市': 'chongqing',
        '四川省': 'sichuan',
        '贵州省': 'guizhou',
        '云南省': 'yunnan',
        '西藏自治区': 'tibet',
        '陕西省': 'shaanxi',
        '甘肃省': 'gansu',
        '青海省': 'qinghai',
        '宁夏回族自治区': 'ningxia',
        '新疆维吾尔自治区': 'xinjiang',
        '台湾省': 'taiwan',
        '香港特别行政区': 'hongkong',
        '澳门特别行政区': 'macao'
      }
    };
  },
  methods: {
    loadMap(params) {
      const chartDom = document.getElementById('mainChart');
      if (!(this.nowSelectedProvince === 'mapData')){
        echarts.dispose(this.myChart);
      }
      this.myChart = echarts.init(chartDom);
      let option;
      this.myChart.showLoading();
      this.myChart.hideLoading();
      echarts.registerMap('myMapName', eval(params), {});
      option = {
        title: {
          text: '全国太阳能发电项目',
          subtext: 'subtitle',
          // sublink: 'www.baidu,com',
          left: 'middle'
        },
        tooltip: {
          show: true,
          alwaysShowContent: false,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          showDelay: 0,
          hideDelay: 100,
          triggerOn: 'click',
          trigger: 'item', //
          // position: ['50%', '50%'],
          enterable: true,
          transitionDuration: 0.2,
          textStyle: {
            color: "rgb(137,20,20)",
            fontsize: '14',
            width: 10,
            height: 10,
            overflow: 'break',
          },
          formatter: (params) => {
            return  `
                      <div>${params.name}</div>
                      <div>${params.value}</div>
                      `;
          }
        },
        visualMap: {
          left: 'right',
          min: 500000,
          max: 38000000,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026'
            ]
          },
          text: ['High', 'Low'],
          calculable: true
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'left',
          top: 'top',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: 'USA PopEstimates',
            type: 'map',
            // roam: true, // true/scale/roam
            map: 'myMapName',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { name: '北京市', value: 4822023 },
              { name: '天津市', value: 731449 },
              { name: '河北省', value: 6553255 },
              { name: '山西省', value: 2949131 },
              { name: '内蒙古自治区', value: 38041430 },
              { name: '辽宁省', value: 5187582 },
              { name: '吉林省', value: 3590347 },
              { name: '黑龙江省', value: 917092 },
              { name: '上海市', value: 632323 },
              { name: '江苏省', value: 19317568 },
              { name: '浙江省', value: 9919945 },
              { name: '安徽省', value: 1392313 },
              { name: '福建省', value: 1595728 },
              { name: '江西省', value: 12875255 },
              { name: '山东省', value: 6537334 },
              { name: '河南省', value: 3074186 },
              { name: '湖北省', value: 2885905 },
              { name: '湖南省', value: 6885905 },
              { name: '广东省', value: 4380415 },
              { name: '广西壮族自治区', value: 4601893 },
              { name: '海南省', value: 1329192 },
              { name: '重庆市', value: 5884563 },
              { name: '四川省', value: 6646144 },
              { name: '贵州省', value: 9883360 },
              { name: '云南省', value: 5379139 },
              { name: '西藏自治区', value: 2984926 },
              { name: '陕西省', value: 6021988 },
              { name: '甘肃省', value: 1005141 },
              { name: '青海省', value: 1855525 },
              { name: '宁夏回族自治区', value: 2758931 },
              { name: '新疆维吾尔自治区', value: 1320718 },
              { name: '台湾省', value: 8864590 },
              { name: '香港特别行政区', value: 2085538 },
              { name: '澳门特别行政区', value: 19570261 },
            ]
          }
        ]
      };
      this.myChart.on('click', (params) => {
        this.nowSelectedProvince = params.name;
        console.log(this.nowSelectedProvince);
        let tempSelected;
        if (!this.areaDic[this.nowSelectedProvince]) {
          tempSelected = 'mapData';
        }
        else {
          tempSelected = this.areaDic[this.nowSelectedProvince];
        }
        console.log(tempSelected);
        this.loadMap(tempSelected);
      })
      this.myChart.setOption(option);
      // option && myChart.setOption(option);
    }
  },
  mounted() {
    let tempSelected = 'map';
    console.log(tempSelected);

    if (!this.areaDic[this.nowSelectedProvince]) {
      tempSelected = 'mapData';
    }
    else {
      tempSelected = this.areaDic[this.nowSelectedProvince];
    }
    console.log(tempSelected);
    this.loadMap(tempSelected);
  }
}
</script>

<style scoped>
.chart {
  width: 800px;
  height: 600px;
}
</style>