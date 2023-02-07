<template>
  <el-button @click="returnMain" :disabled="nowSelectedProvince === 'mapData'">返回</el-button>
  <div>
    <div class="chart" id="mainChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import mapData from '/assets/china_base.json';

import Beijing from '/assets/Beijing.json';
import Tianjin from '/assets/Tianjin.json';
import Hebei from '/assets/Hebei.json';
import Shanxi from '/assets/Shanxi.json';
import InnerMongolia from '/assets/InnerMongolia.json';
import Liaoning from '/assets/Liaoning.json';
import Jilin from '/assets/Jilin.json';
import Heilongjiang from '/assets/Heilongjiang.json';
import Shanghai from '/assets/Shanghai.json';
import Jiangsu from '/assets/Jiangsu.json';
import Zhejiang from '/assets/Zhejiang.json';
import Anhui from '/assets/Anhui.json';
import Fujian from '/assets/Fujian.json';
import Jiangxi from '/assets/Jiangxi.json';
import Shandong from '/assets/Shandong.json';
import Henan from '/assets/Henan.json';
import Hubei from '/assets/Hubei.json';
import Hunan from '/assets/Hunan.json';
import Guangdong from '/assets/Guangdong.json';
import Guangxi from '/assets/Guangxi.json';
import Hainan from '/assets/Hainan.json';
import Chongqing from '/assets/Chongqing.json';
import Sichuan from '/assets/Sichuan.json';
import Guizhou from '/assets/Guizhou.json';
import Yunnan from '/assets/Yunnan.json';
import Tibet from '/assets/Tibet.json';
import Shaanxi from '/assets/Shaanxi.json';
import Gansu from '/assets/Gansu.json';
import Qinghai from '/assets/Qinghai.json';
import Ningxia from '/assets/Ningxia.json';
import Xinjiang from '/assets/Xinjiang.json';
import Taiwan from '/assets/Taiwan.json';
import Hongkong from '/assets/Hongkong.json';
import Macao from '/assets/Macao.json';

import solarProvinceData from '/assets/statisticData/solar_province.json';
import solarPowerProvinceData from '/assets/statisticData/solar_province_sum.json';
import solarProvinceAllData from '/assets/statisticData/solar.json';
import windProvinceData from '/assets/statisticData/wind_province.json';
import windPowerProvinceData from '/assets/statisticData/wind_province_sum.json';
import windProvinceAllData from '/assets/statisticData/wind.json';
import nuclearProvinceData from '/assets/statisticData/nuclear_province.json';
import nuclearPowerProvinceData from '/assets/statisticData/nuclear_province_sum.json';
import nuclearProvinceAllData from '/assets/statisticData/nuclear.json';
import biologyProvinceData from '/assets/statisticData/bioenergy_province.json';
import biologyPowerProvinceData from '/assets/statisticData/bioenergy_province_sum.json';
import biologyProvinceAllData from '/assets/statisticData/bioenergy.json';

import BaseCard from "@/components/UI/BaseCard.vue";

export default {
  name: "MapVisualization",
  components: {BaseCard},
  props: {
    energyType: {
      type: String,
      default: 'solar'
    },
    mode: {
      type: String,
      default: 'quantity'
    }
  },
  data() {
    return {
      myChart: null,
      nowSelectedProvince: 'mapData',
      areaDic: {
        '北京市': 'Beijing',
        '天津市': 'Tianjin',
        '河北省': 'Hebei',
        '山西省': 'Shanxi',
        '内蒙古自治区': 'InnerMongolia',
        '辽宁省': 'Liaoning',
        '吉林省': 'Jilin',
        '黑龙江省': 'Heilongjiang',
        '上海市': 'Shanghai',
        '江苏省': 'Jiangsu',
        '浙江省': 'Zhejiang',
        '安徽省': 'Anhui',
        '福建省': 'Fujian',
        '江西省': 'Jiangxi',
        '山东省': 'Shandong',
        '河南省': 'Henan',
        '湖北省': 'Hubei',
        '湖南省': 'Hunan',
        '广东省': 'Guangdong',
        '广西壮族自治区': 'Guangxi',
        '海南省': 'Hainan',
        '重庆市': 'Chongqing',
        '四川省': 'Sichuan',
        '贵州省': 'Guizhou',
        '云南省': 'Yunnan',
        '西藏自治区': 'Tibet',
        '陕西省': 'Shaanxi',
        '甘肃省': 'Gansu',
        '青海省': 'Qinghai',
        '宁夏回族自治区': 'Ningxia',
        '新疆维吾尔自治区': 'Xinjiang',
        '台湾省': 'Taiwan',
        '香港特别行政区': 'Hongkong',
        '澳门特别行政区': 'Macao'
      }
    };
  },
  methods: {
    loadMap(params) {
      const chartDom = document.getElementById('mainChart');
      // 省份下钻，将当前全国地图清空
      if (!(this.nowSelectedProvince === 'mapData')) {
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
          subtext: `按照${this.modeChinese}进行可视化`,
          left: 'middle'
        },
        geo: {
          type: 'map',
          map: 'myMapName',
          roam: true, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成'scale'或者'move'。设置成true为都开启
          // selectedMode:'multiple',  //是否点击选中地区,'single'|'multiple'
          emphasis: {	//设置鼠标滑动高亮样式
            // itemStyle:{
            //   color:'purple'
            // }
            label: {
              show: true
            },
          }
          // zoom:2,  //设置初始化缩放比例
          // center:[87.6,43.79],  //设置地图中心点,值为经纬度
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
            return `<div>${params.name}</div>
                    <div>发电站状态: ${params.value[2]}</div>
                    <div>发电站容量: ${params.value[3]} MW</div>
                    `;
          }
        },
        visualMap: {
          left: 'right',
          min: this.findSmallestValue(this.provinceData),
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
            // roam: 'move', // true/scale/move
            // map: 'myMapName',
            // emphasis: {
            //   label: {
            //     show: true
            //   }
            // },
            geoIndex: 0,
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
          {
            // 散点坐标每个能源项目
            type: 'effectScatter',
            data: this.formScatterData(), //配置散点的坐标数据
            coordinateSystem: 'geo', //散点使用的坐标系统 geo
            symbolSize: 5,
            rippleEffect:{
              scale: 5,
              // color:'purple'
            },
            zlevel: 1,
          }
        ]
      };
      this.myChart.on('click', (params) => {
        this.nowSelectedProvince = params.name;
        console.log(this.nowSelectedProvince);
        let tempSelected;
        if (this.nowSelectedProvince !== 'mapData')
            // 此时为中国地图，点击省份进行下钻
          if (!this.areaDic[this.nowSelectedProvince]) {
            // tempSelected = 'mapData';
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
      let data;
      if (this.mode === 'quantity') {
        data = this.provinceData;
      } else if (this.mode === 'power') {
        data = this.provincePowerData;
      }
      if (!isNaN(data[province])) {
        return data[province];
      } else {
        return 0;
      }
    },
    returnMain() {
      echarts.dispose(this.myChart);
      this.nowSelectedProvince = 'mapData';
      this.loadMap('mapData')
    },
    formScatterData() {
      let tempData = [];
      for (let i = 0; i < this.provinceAllData.length; i++) {
        if (this.provinceAllData[i][5] === this.areaDic[this.nowSelectedProvince]) {
          tempData.push({
            name: this.provinceAllData[i][0],
            value: [this.provinceAllData[i][3], this.provinceAllData[i][4], this.statusChinese(this.provinceAllData[i][1]), this.provinceAllData[i][2]],
          });
        }
      }
      console.log(tempData);
      return tempData;
    },
    statusChinese(str) {
      switch (str) {
        case 'announced':
          return '已启动';
        case 'construction':
          return '建设中';
        case 'development':
          return '规划中';
        case 'operating':
          return '运行中';
        case 'retired':
          return '已退役';
      }
    }
  },
  computed: {
    provinceData() {
      if (this.mode === 'quantity') {
        switch (this.energyType) {
          case 'solar':
            return solarProvinceData;
          case 'wind':
            return windProvinceData;
          case 'nuclear':
            return nuclearProvinceData;
          case 'bio':
            return biologyProvinceData;
        }
      } else if (this.mode === 'power') {
        switch (this.energyType) {
          case 'solar':
            return solarPowerProvinceData;
          case 'wind':
            return windPowerProvinceData;
          case 'nuclear':
            return nuclearPowerProvinceData;
          case 'bio':
            return biologyPowerProvinceData;
        }
      }
    },
    provincePowerData() {
      switch (this.energyType) {
        case 'solar':
          return solarPowerProvinceData;
        case 'wind':
          return windPowerProvinceData;
        case 'nuclear':
          return nuclearPowerProvinceData;
        case 'bio':
          return biologyPowerProvinceData;
      }
    },
    provinceAllData() {
      switch (this.energyType) {
        case 'solar':
          return solarProvinceAllData;
        case 'wind':
          return windProvinceAllData;
        case 'nuclear':
          return nuclearProvinceAllData;
        case 'bio':
          return biologyProvinceAllData;
      }
    },
    energyChinese() {
      switch (this.energyType) {
        case 'solar':
          return '太阳能';
        case 'wind':
          return '风能';
        case 'nuclear':
          return '核能';
        case 'bio':
          return '生物能';
      }
    },
    modeChinese() {
      switch (this.mode) {
        case 'quantity':
          return '发电站数';
        case 'power':
          return '发电量';
      }
    }
  },
  watch: {
    provinceData() {
      echarts.dispose(this.myChart);
      this.nowSelectedProvince = 'mapData'
      this.loadMap('mapData');
    },
    mode() {
      echarts.dispose(this.myChart);
      this.nowSelectedProvince = 'mapData'
      this.loadMap('mapData');
    }
  },
  mounted() {
    let tempSelected = 'map';
    // console.log(tempSelected);

    if (!this.areaDic[this.nowSelectedProvince]) {
      tempSelected = 'mapData';
    } else {
      tempSelected = this.areaDic[this.nowSelectedProvince];
    }
    // console.log(tempSelected);
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