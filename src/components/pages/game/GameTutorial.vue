<template>
  <el-row justify="center">
    <el-col :span="24">
      <el-row justify="center" gutter="2">
        <el-col :span="2">
          <font-awesome-icon :icon="['fas', 'bullseye']" />
        </el-col>
        <el-col :span="4">
          <div class="title">游戏目标</div>
        </el-col>
        <el-col :span="18">
          <div class="content">达成关卡要求的功率目标。</div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-divider />
    </el-col>
    <el-col :span="24">
      <el-row justify="center" gutter="2">
        <el-col :span="2">
          <font-awesome-icon :icon="['fas', 'coins']" />
        </el-col>
        <el-col :span="4">
          <div class="title">资金获得</div>
        </el-col>
        <el-col :span="18">
          <div class="content">
            通过提升发电功率，可以获得更多的资金收入。火力发电站放在靠近城市的位置，会产生对应的惩罚费用，造成收入的降低。
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-divider />
    </el-col>
    <el-col :span="24">
      <el-row justify="center" gutter="2">
        <el-col :span="2">
          <font-awesome-icon :icon="['fas', 'smog']" />
        </el-col>
        <el-col :span="4">
          <div class="title">污染指数</div>
        </el-col>
        <el-col :span="18">
          <div class="content">
            建设火力发电站会产生对应的污染指数。当污染指数超过了游戏的限额的时候，将无法新建新的火力发电站。
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-divider />
    </el-col>
    <el-col :span="24">
      <el-row justify="center" gutter="2">
        <el-col :span="2">
          <font-awesome-icon :icon="['fas', 'note-sticky']" />
        </el-col>
        <el-col :span="4">
          <div class="title">Tips</div>
        </el-col>
        <el-col :span="18">
          <div class="content">
            不同类型的发电站有着不同的价格、发电量和污染指数。风力发电站、太阳能发电站的实际发电功率会受到放置位置的条件的影响。谨慎的选择在何处放置何种类型的发电站，可以更容易的通关游戏。
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "ToolTip",
  components: { FontAwesomeIcon },
  data() {
    return {
      max: false,
    };
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
  /*text-align: center;*/
}
.content {
  color: #666;
  text-align: center;
}
.el-divider--horizontal {
  margin: 8px 0;
  background: 0 0;
  border-top: 1px dashed #e8eaec;
}
</style>
