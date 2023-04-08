<template>
  <div style="width: 200px">
    <h3 class="value name">
      {{ displayName(name) }}
    </h3>
    <el-divider border-style="double" />
    <div class="value">
      <el-row justify="center">
        <el-col :span="8">
          <el-row justify="center">
            <el-col :span="24">
              <div class="center">
                <font-awesome-icon icon="fa-solid fa-calendar" />
              </div>
            </el-col>
            <el-col :span="24">
              <div class="center">
                {{ displayYear(year) }}
              </div>
            </el-col>
            <el-col :span="24">
              <div class="center description">启用年份</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row justify="center">
            <el-col :span="24">
              <div class="center">
                <font-awesome-icon icon="fa-solid fa-gauge" />
              </div>
            </el-col>
            <el-col :span="24">
              <div class="center">
                {{ displayStatus(status) }}
              </div>
            </el-col>
            <el-col :span="24">
              <div class="center description">状态</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row justify="center">
            <el-col :span="24">
              <div class="center">
                <font-awesome-icon icon="fa-solid fa-bolt" />
              </div>
            </el-col>
            <el-col :span="24">
              <div class="center">{{ displayCapacity(capacity) }} MW</div>
            </el-col>
            <el-col :span="24">
              <div class="center description">功率</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "ToolTip",
  components: { FontAwesomeIcon },
  props: ["year", "name", "status", "capacity"],
  methods: {
    displayYear(val) {
      if (!val) {
        return "暂无信息";
      }
      return val;
    },
    displayName(val) {
      if (!val) {
        return "暂无信息";
      }
      return val;
    },
    displayStatus(val) {
      if (!val) {
        return "暂无信息";
      }
      return val;
    },
    displayCapacity(val) {
      if (!val) {
        return "暂无信息";
      }
      return val;
    },
  },
};
</script>

<style scoped>
.center {
  text-align: center;
  margin: 0 auto;
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
  white-space: normal;
  word-break: break-all;
}
</style>
