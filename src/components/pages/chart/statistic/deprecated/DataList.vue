<template>
  <el-row>
    <el-col :span="4" :offset="20">
      <el-select v-model="selectedYear" class="m-2" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-col>
  </el-row>
  <el-row justify="space-around">
    <el-col :span="4" v-for="data in cardData">
      <data-card
        :year="selectedYear"
        :type="data.type"
        :data="data.data"
        :total="total"
        :color="data.color"
        :background="data.background"
      />
    </el-col>
  </el-row>
</template>

<script>
import DataCard from "@/components/pages/chart/statistic/deprecated/DataCard.vue";
import fossil from "/assets/annualStatisticData/fossil.json";
import hydro from "/assets/annualStatisticData/hydro.json";
import nuclear from "/assets/annualStatisticData/nuclear.json";
import solar from "/assets/annualStatisticData/solar.json";
import wind from "/assets/annualStatisticData/wind.json";

export default {
  name: "DataList",
  components: { DataCard },
  data() {
    return {
      selectedYear: 2022,
      options: [
        2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
        2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
      ],
      cardData: [
        {
          type: "火能",
          data: fossil[0],
          color: "rgba(111,0,0,0.3)",
          background: "rgba(255,158,123,1)",
        },
        {
          type: "水能",
          data: hydro[0],
          color: "rgba(72,24,108,0.3)",
          background: "rgba(235,176,255,1)",
        },
        {
          type: "核能",
          data: nuclear[0],
          color: "rgba(0,62,25,0.3)",
          background: "rgba(97,221,170,1)",
        },
        {
          type: "太阳能",
          data: solar[0],
          color: "rgba(96,16,0,0.3)",
          background: "rgba(255,171,87,1)",
        },
        {
          type: "风能",
          data: wind[0],
          color: "rgba(0,49,138,0.3)",
          background: "rgba(154,197,255,1)",
        },
      ],
    };
  },
  computed: {
    total() {
      return (
        fossil[0][this.selectedYear] +
        hydro[0][this.selectedYear] +
        nuclear[0][this.selectedYear] +
        solar[0][this.selectedYear] +
        wind[0][this.selectedYear]
      );
    },
  },
};
</script>

<style scoped>
.pie {
  width: 100%;
  height: 400px;
}
</style>
