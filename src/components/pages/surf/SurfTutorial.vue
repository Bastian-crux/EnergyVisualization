<template>
  <el-row justify="center">
    <el-col :span="24">
      <h1 class="title">点击屏幕以开始游玩</h1>
    </el-col>
    <el-col :span="24">
      <el-row justify="center" gutter="2">
        <el-col :span="2">
          <font-awesome-icon class="icon" :icon="['fas', 'person-walking']" />
        </el-col>
        <el-col :span="4">
          <div class="title">人物移动</div>
        </el-col>
        <el-col :span="18">
          <div class="content">使用WASD来进行漫游</div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-divider />
    </el-col>
    <el-col :span="24">
      <el-row justify="center" gutter="2">
        <el-col :span="2">
          <font-awesome-icon class="icon" :icon="['fas', 'arrow-up']" />
        </el-col>
        <el-col :span="4">
          <div class="title">人物跳跃</div>
        </el-col>
        <el-col :span="18">
          <div class="content">使用空格来进行跳跃</div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-divider />
    </el-col>
    <el-col :span="24">
      <el-row justify="center" gutter="2">
        <el-col :span="2">
          <font-awesome-icon class="icon" :icon="['fas', 'camera']" />
        </el-col>
        <el-col :span="4">
          <div class="title">视角移动</div>
        </el-col>
        <el-col :span="18">
          <div class="content">使用鼠标来进行移动</div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-divider />
    </el-col>
    <el-col :span="24">
      <el-row justify="center" gutter="2">
        <el-col :span="2">
          <font-awesome-icon class="icon" :icon="['fas', 'note-sticky']" />
        </el-col>
        <el-col :span="4">
          <div class="title">Tips</div>
        </el-col>
        <el-col :span="18">
          <div class="content">走近模型可以查看对应发电站的详细介绍信息</div>
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
.icon {
  color: white;
}

.title {
  font-weight: bold;
  color: white;
  /*text-align: center;*/
}
.content {
  color: white;
  text-align: center;
}
.el-divider--horizontal {
  margin: 8px 0;
  background: 0 0;
  border-top: 1px dashed #e8eaec;
}
</style>
