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
    <el-col :span="4">
      <data-card :year="selectedYear" :type="'火能'" :data="fossil" :total="total"/>
    </el-col>
    <el-col :span="4">
      <data-card :year="selectedYear" :type="'水能'" :data="hydro" :total="total"/>
    </el-col>
    <el-col :span="4">
      <data-card :year="selectedYear" :type="'核能'" :data="nuclear" :total="total"/>
    </el-col>
    <el-col :span="4">
      <data-card :year="selectedYear" :type="'太阳能'" :data="solar" :total="total"/>
    </el-col>
    <el-col :span="4">
      <data-card :year="selectedYear" :type="'风能'" :data="wind" :total="total"/>
    </el-col>
  </el-row>
</template>

<script>
import DataCard from "@/components/pages/statistic/DataCard.vue";
import fossil from '/assets/annualStatisticData/fossil.json'
import hydro from '/assets/annualStatisticData/hydro.json'
import nuclear from '/assets/annualStatisticData/nuclear.json'
import solar from '/assets/annualStatisticData/solar.json'
import wind from '/assets/annualStatisticData/wind.json'

export default {
  name: "DataList",
  components: {DataCard},
  data() {
    return {
      selectedYear: 2022,
      fossil: fossil[0],
      hydro: hydro[0],
      nuclear: nuclear[0],
      solar: solar[0],
      wind: wind[0],
      options: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
    }
  },
  computed: {
    total() {
      return this.fossil[this.selectedYear] + this.hydro[this.selectedYear] + this.nuclear[this.selectedYear] + this.solar[this.selectedYear] + this.wind[this.selectedYear]
    }
  }
}
</script>

<style scoped>
.pie {
  width: 100%;
  height: 400px;
}
</style>