<template>
  <div>
    <div class="chart margin" id="mainChart"></div>
  </div>
</template>

<script>
import {
  findBiggestValue,
  findSmallestValue,
  formatterHelper,
  statusChinese,
} from "@/utils";
import * as echarts from "echarts";
import mapData from "/assets/mapData/china_base.json";

import Beijing from "/assets/mapData/Beijing.json";
import Tianjin from "/assets/mapData/Tianjin.json";
import Hebei from "/assets/mapData/Hebei.json";
import Shanxi from "/assets/mapData/Shanxi.json";
import InnerMongolia from "/assets/mapData/InnerMongolia.json";
import Liaoning from "/assets/mapData/Liaoning.json";
import Jilin from "/assets/mapData/Jilin.json";
import Heilongjiang from "/assets/mapData/Heilongjiang.json";
import Shanghai from "/assets/mapData/Shanghai.json";
import Jiangsu from "/assets/mapData/Jiangsu.json";
import Zhejiang from "/assets/mapData/Zhejiang.json";
import Anhui from "/assets/mapData/Anhui.json";
import Fujian from "/assets/mapData/Fujian.json";
import Jiangxi from "/assets/mapData/Jiangxi.json";
import Shandong from "/assets/mapData/Shandong.json";
import Henan from "/assets/mapData/Henan.json";
import Hubei from "/assets/mapData/Hubei.json";
import Hunan from "/assets/mapData/Hunan.json";
import Guangdong from "/assets/mapData/Guangdong.json";
import Guangxi from "/assets/mapData/Guangxi.json";
import Hainan from "/assets/mapData/Hainan.json";
import Chongqing from "/assets/mapData/Chongqing.json";
import Sichuan from "/assets/mapData/Sichuan.json";
import Guizhou from "/assets/mapData/Guizhou.json";
import Yunnan from "/assets/mapData/Yunnan.json";
import Tibet from "/assets/mapData/Tibet.json";
import Shaanxi from "/assets/mapData/Shaanxi.json";
import Gansu from "/assets/mapData/Gansu.json";
import Qinghai from "/assets/mapData/Qinghai.json";
import Ningxia from "/assets/mapData/Ningxia.json";
import Xinjiang from "/assets/mapData/Xinjiang.json";
import Taiwan from "/assets/mapData/Taiwan.json";
import Hongkong from "/assets/mapData/Hongkong.json";
import Macao from "/assets/mapData/Macao.json";

import solarProvinceData from "/assets/powerstationData/solar_province.json";
import solarPowerProvinceData from "/assets/powerstationData/solar_province_sum.json";
import solarProvinceAllData from "/assets/powerstationData/solar.json";
import windProvinceData from "/assets/powerstationData/wind_province.json";
import windPowerProvinceData from "/assets/powerstationData/wind_province_sum.json";
import windProvinceAllData from "/assets/powerstationData/wind.json";
import nuclearProvinceData from "/assets/powerstationData/nuclear_province.json";
import nuclearPowerProvinceData from "/assets/powerstationData/nuclear_province_sum.json";
import nuclearProvinceAllData from "/assets/powerstationData/nuclear.json";
import biologyProvinceData from "/assets/powerstationData/bioenergy_province.json";
import biologyPowerProvinceData from "/assets/powerstationData/bioenergy_province_sum.json";
import biologyProvinceAllData from "/assets/powerstationData/bioenergy.json";

export default {
  name: "MapVisualization",
  components: {},
  props: {
    energyType: {
      type: String,
      default: "solar",
    },
    mode: {
      type: String,
      default: "quantity",
    },
    currentYear: {
      type: Number,
      default: 2010,
    },
    back: {
      type: Boolean,
    },
    reload: {
      type: Boolean,
    },
  },
  emits: ["back-enabled"],
  data() {
    return {
      myChart: null,
      nowSelectedProvince: "mapData",
      areaDic: {
        北京市: "Beijing",
        天津市: "Tianjin",
        河北省: "Hebei",
        山西省: "Shanxi",
        内蒙古自治区: "InnerMongolia",
        辽宁省: "Liaoning",
        吉林省: "Jilin",
        黑龙江省: "Heilongjiang",
        上海市: "Shanghai",
        江苏省: "Jiangsu",
        浙江省: "Zhejiang",
        安徽省: "Anhui",
        福建省: "Fujian",
        江西省: "Jiangxi",
        山东省: "Shandong",
        河南省: "Henan",
        湖北省: "Hubei",
        湖南省: "Hunan",
        广东省: "Guangdong",
        广西壮族自治区: "Guangxi",
        海南省: "Hainan",
        重庆市: "Chongqing",
        四川省: "Sichuan",
        贵州省: "Guizhou",
        云南省: "Yunnan",
        西藏自治区: "Tibet",
        陕西省: "Shaanxi",
        甘肃省: "Gansu",
        青海省: "Qinghai",
        宁夏回族自治区: "Ningxia",
        新疆维吾尔自治区: "Xinjiang",
        台湾省: "Taiwan",
        香港特别行政区: "Hongkong",
        澳门特别行政区: "Macao",
      },
      areaDicData: {
        mapData: mapData,
        Beijing: Beijing,
        Tianjin: Tianjin,
        Hebei: Hebei,
        Shanxi: Shanxi,
        InnerMongolia: InnerMongolia,
        Liaoning: Liaoning,
        Jilin: Jilin,
        Heilongjiang: Heilongjiang,
        Shanghai: Shanghai,
        Jiangsu: Jiangsu,
        Zhejiang: Zhejiang,
        Anhui: Anhui,
        Fujian: Fujian,
        Jiangxi: Jiangxi,
        Shandong: Shandong,
        Henan: Henan,
        Hubei: Hubei,
        Hunan: Hunan,
        Guangdong: Guangdong,
        Guangxi: Guangxi,
        Hainan: Hainan,
        Chongqing: Chongqing,
        Sichuan: Sichuan,
        Guizhou: Guizhou,
        Yunnan: Yunnan,
        Tibet: Tibet,
        Shaanxi: Shaanxi,
        Gansu: Gansu,
        Qinghai: Qinghai,
        Ningxia: Ningxia,
        Xinjiang: Xinjiang,
        Taiwan: Taiwan,
        Hongkong: Hongkong,
        Macao: Macao,
      },
    };
  },
  methods: {
    loadMap(params) {
      const chartDom = document.getElementById("mainChart");
      this.myChart = echarts.init(chartDom);
      let option;
      this.myChart.showLoading();
      this.myChart.hideLoading();
      echarts.registerMap("myMapName", this.areaDicData[params], {});
      option = {
        // title: {
        //   text: `全国${this.energyChinese}发电项目`,
        //   subtext: `按照${this.modeChinese}进行可视化`,
        //   left: "middle",
        // },
        backgroundColor: "", //画布背景颜色
        geo: [
          {
            type: "map",
            map: "myMapName",
            zlevel: 5,
            roam: false, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成'scale'或者'move'。设置成true为都开启
            center: [105, 35],
            emphasis: {
              //设置鼠标滑动高亮样式
              label: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                borderColor: "rgba(255,255,255,0.5)",
                borderWidth: 2,
                shadowColor: "rgba(0,0,0,0.2)",
                shadowOffsetX: 1,
                shadowOffsetY: 1,
                shadowBlur: 2,
                // opacity: 0.8,
              },
            },
            zoom: 1.5,
          },
        ],
        tooltip: {
          show: true,
          alwaysShowContent: false,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderColor: "rgba(0, 0, 0, 0)",
          showDelay: 0,
          hideDelay: 100,
          triggerOn: "click",
          trigger: "item", //
          // position: ['50%', '50%'],
          enterable: true,
          transitionDuration: 0.2,
          formatter: formatterHelper,
        },
        visualMap: {
          left: "right",
          min: findSmallestValue(this.provinceData),
          max: findBiggestValue(this.provinceData),
          inRange: {
            color: this.colorScheme,
          },
          text: ["High", "Low"],
          calculable: true,
          seriesIndex: 0,
        },
        series: [
          {
            name: `全国${this.energyChinese}发电项目`,
            type: "map",
            geoIndex: 0,
            data: [
              { name: "北京市", value: this.getNumberByProvince("Beijing") },
              { name: "天津市", value: this.getNumberByProvince("Tianjin") },
              { name: "河北省", value: this.getNumberByProvince("Hebei") },
              { name: "山西省", value: this.getNumberByProvince("Shanxi") },
              {
                name: "内蒙古自治区",
                value: this.getNumberByProvince("InnerMongolia"),
              },
              { name: "辽宁省", value: this.getNumberByProvince("Liaoning") },
              { name: "吉林省", value: this.getNumberByProvince("Jilin") },
              {
                name: "黑龙江省",
                value: this.getNumberByProvince("Heilongjiang"),
              },
              { name: "上海市", value: this.getNumberByProvince("Shanghai") },
              { name: "江苏省", value: this.getNumberByProvince("Jiangsu") },
              { name: "浙江省", value: this.getNumberByProvince("Zhejiang") },
              { name: "安徽省", value: this.getNumberByProvince("Anhui") },
              { name: "福建省", value: this.getNumberByProvince("Fujian") },
              { name: "江西省", value: this.getNumberByProvince("Jiangxi") },
              { name: "山东省", value: this.getNumberByProvince("Shandong") },
              { name: "河南省", value: this.getNumberByProvince("Henan") },
              { name: "湖北省", value: this.getNumberByProvince("Hubei") },
              { name: "湖南省", value: this.getNumberByProvince("Hunan") },
              { name: "广东省", value: this.getNumberByProvince("Guangdong") },
              {
                name: "广西壮族自治区",
                value: this.getNumberByProvince("Guangxi"),
              },
              { name: "海南省", value: this.getNumberByProvince("Hainan") },
              { name: "重庆市", value: this.getNumberByProvince("Chongqing") },
              { name: "四川省", value: this.getNumberByProvince("Sichuan") },
              { name: "贵州省", value: this.getNumberByProvince("Guizhou") },
              { name: "云南省", value: this.getNumberByProvince("Yunnan") },
              { name: "西藏自治区", value: this.getNumberByProvince("Tibet") },
              { name: "陕西省", value: this.getNumberByProvince("Shaanxi") },
              { name: "甘肃省", value: this.getNumberByProvince("Gansu") },
              { name: "青海省", value: this.getNumberByProvince("Qinghai") },
              {
                name: "宁夏回族自治区",
                value: this.getNumberByProvince("Ningxia"),
              },
              {
                name: "新疆维吾尔自治区",
                value: this.getNumberByProvince("Xinjiang"),
              },
              { name: "台湾省", value: 0 },
              { name: "香港特别行政区", value: 0 },
              { name: "澳门特别行政区", value: 0 },
            ],
            tooltip: {
              show: false,
            },
          },
          {
            // 重点项目
            type: "scatter",
            data: this.formMajorScatterData(),
            coordinateSystem: "geo",
            zlevel: 10,
            itemStyle: {
              normal: {
                color: "rgba(103,174,255,0.6)",
                borderColor: "rgb(102,133,255)",
              },
            },
            symbolSize: (data) => {
              if (this.energyType === "nuclear") {
                return Math.log(data[3]) * 2;
              } else {
                return Math.pow(data[3], 1 / 3) * 2;
              }
            },
          },
        ],
      };
      this.myChart.on("click", (params) => {
        if (this.currentYear === 2022) {
          this.nowSelectedProvince = params.name;
          if (this.nowSelectedProvince !== "mapData")
            if (!this.areaDic[this.nowSelectedProvince]) {
              this.nowSelectedProvince = "mapData";
            } else {
              // 此时点的是省份，调用加载区域地图的方法
              this.loadRegionMap(this.nowSelectedProvince);
            }
        }
      });
      this.myChart.setOption(option);
      // option && myChart.setOption(option);
    },
    loadRegionMap(params) {
      const chartDom = document.getElementById("mainChart");
      const mapName = this.areaDic[params];
      // 清空全国地图
      echarts.dispose(this.myChart);
      // 新建新的区域地图
      this.myChart = echarts.init(chartDom);
      let option;
      this.myChart.showLoading();
      this.myChart.hideLoading();
      echarts.registerMap("myMapName", this.areaDicData[mapName], {});
      option = {
        geo: {
          type: "map",
          map: "myMapName",
          roam: true, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成'scale'或者'move'。设置成true为都开启
          emphasis: {
            //设置鼠标滑动高亮样式
            label: {
              show: true,
            },
          },
        },
        tooltip: {
          show: true,
          alwaysShowContent: false,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderColor: "rgba(0, 0, 0, 0)",
          showDelay: 0,
          hideDelay: 100,
          triggerOn: "click",
          trigger: "item", //
          enterable: true,
          transitionDuration: 0.2,
          textStyle: {
            color: "rgb(91,91,91)",
            fontsize: "14",
            width: 10,
            height: 10,
            overflow: "break",
          },
          formatter: formatterHelper,
        },
        series: [
          {
            // 散点坐标每个能源项目
            type: "scatter",
            data: this.formScatterData(), //配置散点的坐标数据
            coordinateSystem: "geo", //散点使用的坐标系统 geo
            symbolSize: 10,
            zlevel: 1,
          },
        ],
      };
      this.myChart.setOption(option);
    },
    getNumberByProvince(province) {
      let data;
      if (this.mode === "quantity") {
        data = this.provinceData;
      } else if (this.mode === "power") {
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
      this.nowSelectedProvince = "mapData";
      this.loadMap("mapData");
    },
    formScatterData() {
      let tempData = [];
      for (let i = 0; i < this.provinceAllData.length; i++) {
        if (
          this.provinceAllData[i][5] === this.areaDic[this.nowSelectedProvince]
        ) {
          tempData.push({
            name: this.provinceAllData[i][0],
            value: [
              this.provinceAllData[i][3],
              this.provinceAllData[i][4],
              statusChinese(this.provinceAllData[i][1]),
              this.provinceAllData[i][2],
              this.provinceAllData[i][6],
            ],
          });
        }
      }
      return tempData;
    },
    formMajorScatterData() {
      let tempData = [];
      for (let i = 0; i < this.provinceMajorAllData.length; i++) {
        tempData.push({
          name: this.provinceMajorAllData[i][0],
          value: [
            this.provinceMajorAllData[i][3],
            this.provinceMajorAllData[i][4],
            statusChinese(this.provinceMajorAllData[i][1]),
            this.provinceMajorAllData[i][2],
            this.provinceMajorAllData[i][6],
          ],
        });
      }
      return tempData;
    },
  },
  computed: {
    provinceData() {
      if (this.mode === "quantity") {
        switch (this.energyType) {
          case "solar":
            return solarProvinceData;
          case "wind":
            return windProvinceData;
          case "nuclear":
            return nuclearProvinceData;
          case "bio":
            return biologyProvinceData;
        }
      } else if (this.mode === "power") {
        switch (this.energyType) {
          case "solar":
            return solarPowerProvinceData;
          case "wind":
            return windPowerProvinceData;
          case "nuclear":
            return nuclearPowerProvinceData;
          case "bio":
            return biologyPowerProvinceData;
        }
      }
    },
    provincePowerData() {
      switch (this.energyType) {
        case "solar":
          return solarPowerProvinceData;
        case "wind":
          return windPowerProvinceData;
        case "nuclear":
          return nuclearPowerProvinceData;
        case "bio":
          return biologyPowerProvinceData;
      }
    },
    provinceAllData() {
      switch (this.energyType) {
        case "solar":
          return solarProvinceAllData;
        case "wind":
          return windProvinceAllData;
        case "nuclear":
          return nuclearProvinceAllData;
        case "bio":
          return biologyProvinceAllData;
      }
    },
    provinceMajorAllData() {
      let data;
      switch (this.energyType) {
        case "solar":
          data = solarProvinceAllData;
          return data.filter(
            (item) => item[6] <= this.currentYear && item[2] >= 100
          );
        case "wind":
          data = windProvinceAllData;
          return data.filter(
            (item) => item[6] <= this.currentYear && item[2] >= 150
          );
        case "nuclear":
          data = nuclearProvinceAllData;
          return data.filter((item) => item[6] <= this.currentYear);
        case "bio":
          data = biologyProvinceAllData;
          return data.filter((item) => item[6] <= this.currentYear);
      }
    },
    energyChinese() {
      switch (this.energyType) {
        case "solar":
          return "太阳能";
        case "wind":
          return "风能";
        case "nuclear":
          return "核能";
        case "bio":
          return "生物能";
      }
    },
    modeChinese() {
      switch (this.mode) {
        case "quantity":
          return "发电站数";
        case "power":
          return "发电量";
      }
    },
    colorScheme() {
      return ["#e8e8ef", "#c7c8e3", "#a3a4de", "#7f7fd5", "#6464ca", "#4748ab"];
    },
  },
  watch: {
    provinceData() {
      echarts.dispose(this.myChart);
      this.nowSelectedProvince = "mapData";
      this.loadMap("mapData");
    },
    mode() {
      echarts.dispose(this.myChart);
      this.nowSelectedProvince = "mapData";
      this.loadMap("mapData");
    },
    energyType() {
      echarts.dispose(this.myChart);
      this.nowSelectedProvince = "mapData";
      this.loadMap("mapData");
    },
    currentYear(val) {
      if (this.nowSelectedProvince === "mapData") {
        let option = this.myChart.getOption();
        option.series[1].data = this.formMajorScatterData();
        this.myChart.setOption(option);
      }
    },
    back() {
      this.returnMain();
    },
    reload() {
      let option = this.myChart.getOption();
      option.series[1].data = this.formMajorScatterData();
      this.myChart.setOption(option);
    },
    nowSelectedProvince() {
      this.$emit("back-enabled", this.nowSelectedProvince === "mapData");
    },
  },
  mounted() {
    let tempSelected = "map";
    window.onresize = () => {
      echarts.dispose(this.myChart);
      this.nowSelectedProvince = "mapData";
      this.loadMap("mapData");
    };

    if (!this.areaDic[this.nowSelectedProvince]) {
      tempSelected = "mapData";
    } else {
      tempSelected = this.areaDic[this.nowSelectedProvince];
    }
    this.loadMap(tempSelected);
  },
};
</script>

<style scoped>
.chart {
  height: 600px;
  width: 100%;
}
.margin {
  margin-top: 20px;
}
</style>
