<template>
  <el-button @click="returnMain">返回</el-button>
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

import solarProvinceData from '/assets/statisticData/solar_province.json';
import windProvinceData from '/assets/statisticData/wind_province.json';
import nuclearProvinceData from '/assets/statisticData/nuclear_province.json';

import BaseCard from "@/components/UI/BaseCard.vue";

import {load} from "three/addons/libs/opentype.module";
import BaseButton from "@/components/UI/BaseButton.vue";
export default {
  name: "MapVisualization",
  components: {BaseButton, BaseCard},
  props: {
    energyType: {
      type: String,
      default: 'solar'
    }
  },
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
      // 省份下钻，将当前全国地图清空
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
          text: `全国${this.energyChinese}发电项目`,
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
            return `
                      <div>${params.name}</div>
                      <div>${params.value}</div>
                      `;
          }
        },
        visualMap: {
          left: 'right',
          min: 0,
          max: this.findBiggestValue(this.provinceData),
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
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: `全国${this.energyChinese}发电项目`,
            type: 'map',
            roam: 'move', // true/scale/move
            map: 'myMapName',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              {name: '北京市', value: this.getNumberByProvince('Beijing')},
              {name: '天津市', value: this.getNumberByProvince('Tianjin')},
              {name: '河北省', value: this.getNumberByProvince('Hebei')},
              {name: '山西省', value: this.getNumberByProvince('Shanxi')},
              {name: '内蒙古自治区', value: this.getNumberByProvince('InnerMongolia')},
              {name: '辽宁省', value: this.getNumberByProvince('Liaoning')},
              {name: '吉林省', value: this.getNumberByProvince('Jilin')},
              {name: '黑龙江省', value: this.getNumberByProvince('Heilongjiang')},
              {name: '上海市', value: this.getNumberByProvince('Shanghai')},
              {name: '江苏省', value: this.getNumberByProvince('Jiangsu')},
              {name: '浙江省', value: this.getNumberByProvince('Zhejiang')},
              {name: '安徽省', value: this.getNumberByProvince('Anhui')},
              {name: '福建省', value: this.getNumberByProvince('Fujian')},
              {name: '江西省', value: this.getNumberByProvince('Jiangxi')},
              {name: '山东省', value: this.getNumberByProvince('Shandong')},
              {name: '河南省', value: this.getNumberByProvince('Henan')},
              {name: '湖北省', value: this.getNumberByProvince('Hubei')},
              {name: '湖南省', value: this.getNumberByProvince('Hunan')},
              {name: '广东省', value: this.getNumberByProvince('Guangdong')},
              {name: '广西壮族自治区', value: this.getNumberByProvince('Guangxi')},
              {name: '海南省', value: this.getNumberByProvince('Hainan')},
              {name: '重庆市', value: this.getNumberByProvince('Chongqing')},
              {name: '四川省', value: this.getNumberByProvince('Sichuan')},
              {name: '贵州省', value: this.getNumberByProvince('Guizhou')},
              {name: '云南省', value: this.getNumberByProvince('Yunnan')},
              {name: '西藏自治区', value: this.getNumberByProvince('Tibet')},
              {name: '陕西省', value: this.getNumberByProvince('Shaanxi')},
              {name: '甘肃省', value: this.getNumberByProvince('Gansu')},
              {name: '青海省', value: this.getNumberByProvince('Qinghai')},
              {name: '宁夏回族自治区', value: this.getNumberByProvince('Ningxia')},
              {name: '新疆维吾尔自治区', value: this.getNumberByProvince('Xinjiang')},
              {name: '台湾省', value: 0},
              {name: '香港特别行政区', value: 0},
              {name: '澳门特别行政区', value: 0},
            ]
          },
          // {
          //   // 散点坐标每个能源项目
          //   type: 'effectScatter',
          //   data: scatterData, //配置散点的坐标数据
          //   coordinateSystem:'geo', //指明散点使用的坐标系统  geo的坐标系统
          //   rippleEffect:{
          //     scale: 10
          //   }
          // }
        ]
      };
      this.myChart.on('click', (params) => {
        this.nowSelectedProvince = params.name;
        console.log(this.nowSelectedProvince);
        let tempSelected;
        if (this.nowSelectedProvince !== 'mapData')
        // 此时为中国地图，点击省份进行下钻
        if (!this.areaDic[this.nowSelectedProvince]) {
          tempSelected = 'mapData';
        } else {
          tempSelected = this.areaDic[this.nowSelectedProvince];
          console.log(tempSelected);
          this.loadMap(tempSelected);
        }
      })
      this.myChart.setOption(option);
      // option && myChart.setOption(option);
    },
    findSmallestValue(obj) {
      return Object.keys(obj).reduce((acc, val) => {
        return Math.min(acc, obj[val]);
      }, Infinity);
    },
    findBiggestValue(obj) {
      return Object.keys(obj).reduce((acc, val) => {
        return Math.max(acc, obj[val]);
      }, -Infinity);
    },
    getNumberByProvince(province) {
      if (!isNaN(this.provinceData[province])) {
        return this.provinceData[province];
      } else {
        return 0;
      }
    },
    returnMain(){
      this.loadMap('mapData')
    },
    formScatterData(){
      let tempData = [];
      for (let i = 0; i < this.provinceData.length; i++){

      }
    }
  },
  computed: {
    provinceData() {
      switch(this.energyType) {
        case 'solar':
          return solarProvinceData;
        case 'wind':
          return windProvinceData;
        case 'nuclear':
          return nuclearProvinceData;
      }
    },
    energyChinese() {
      switch(this.energyType) {
        case 'solar':
          return '太阳能';
        case 'wind':
          return '风能';
        case 'nuclear':
          return '核能';
      }
    }
  },
  watch: {
    provinceData() {
      this.loadMap('mapData');
    }
  },
  mounted() {
    let tempSelected = 'map';

    if (!this.areaDic[this.nowSelectedProvince]) {
      tempSelected = 'mapData';
    } else {
      tempSelected = this.areaDic[this.nowSelectedProvince];
    }
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