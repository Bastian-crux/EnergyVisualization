<template>
  <div>
    <h3 class="value name">{{ powerName }}</h3>
    <el-divider border-style="double" />
    <div class="value">
      <el-row justify="center">
        <el-col :span="8">
          <el-row justify="center">
            <el-col :span="24">
              <div class="center">
                <font-awesome-icon :icon="['fas', 'smog']" />
              </div>
            </el-col>
            <el-col :span="24">
              <div class="center">{{ pollution }}</div>
            </el-col>
            <el-col :span="24">
              <div class="center description">污染指数</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row justify="center">
            <el-col :span="24">
              <div class="center">
                <font-awesome-icon :icon="['fas', 'coins']" />
              </div>
            </el-col>
            <el-col :span="24">
              <div class="center">{{ max ? "至多" : "" }}{{ capacity }}MW</div>
            </el-col>
            <el-col :span="24">
              <div class="center description">发电功率</div>
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
              <div class="center" :class="money >= price ? 'green' : 'red'">
                ₡{{ price }}
              </div>
            </el-col>
            <el-col :span="24">
              <div class="center description">价格</div>
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
  props: ["name", "pollution", "capacity", "price", "money"],
  data() {
    return {
      max: false,
    };
  },
  computed: {
    powerName() {
      switch (this.name) {
        case "nuclear":
          return "核能发电站";
        case "wind":
          this.max = true;
          return "风力发电站";
        case "solar":
          this.max = true;
          return "太阳能发电站";
        case "smallFossil":
          return "小型火力发电站";
        case "largeFossil":
          return "大型火力发电站";
      }
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
}

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}
</style>
