<template>
  <div class="value">
    <el-row justify="center">
      <el-col :span="6" class="center">
        <font-awesome-icon icon="fa-solid fa-bolt" size="2x"/>
      </el-col>
      <el-col :span="9" class="center">
        <el-row justify="center">
          <el-col :span="24">
            <div class="center description">
              装机总量
            </div>
          </el-col>
          <el-col :span="24">
            <div class="center">
              {{ total }} 万千瓦
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="9" class="center">
        <el-row justify="center">
          <el-col :span="24">
            <div class="center description">
              装机增量
            </div>
          </el-col>
          <el-col :span="24">
            <div class="center">
              {{ value }} 万千瓦
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider border-style="double" class="margin"/>
    <el-row justify="center">
      <el-col :span="12">
        <el-row justify="center">
          <el-col :span="24">
            <div class="center">
              <font-awesome-icon icon="fa-solid fa-calendar"/>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="center">
              {{ year }}
            </div>
          </el-col>
          <el-col :span="24">
            <div class="center description">
              年份
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row justify="center">
          <el-col :span="24">
            <div class="center">
              <font-awesome-icon style="color: #1a037e" icon="fa-solid fa-circle-info"/>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="center">
              {{ name }}
            </div>
          </el-col>
          <el-col :span="24">
            <div class="center description">
              能源类型
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import capacity from "/assets/capacityData/capacity.json"

export default {
  name: "HeatMapToolTip",
  components: {FontAwesomeIcon},
  props: ['name', 'year', 'value', 'o_type', 'o_year'],
  computed: {
    total() {
      return capacity[this.o_type][this.o_year]
    }
  }
}
</script>

<style scoped>
.margin {
  margin: 1rem auto;
}

.center {
  text-align: center;
  margin: auto;
}

.value {
  color: black;
}

.description {
  font-size: 12px;
  color: rgba(41, 41, 41, 0.8);
}

.name {
  text-align: center;
}

</style>