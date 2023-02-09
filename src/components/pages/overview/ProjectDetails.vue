<template>
  <div v-if="enable === true">
    <el-descriptions :title="projectDetail[0]" :column="2">
      <el-descriptions-item label="状态">{{ statusChinese(projectDetail[1]) }}</el-descriptions-item>
      <el-descriptions-item label="功率">{{ projectDetail[2] }} MW</el-descriptions-item>
      <el-descriptions-item label="介绍">{{ projectDetail[8] }}</el-descriptions-item>
    </el-descriptions>
    <el-image :src="projectDetail[7]" style="margin-top: 20px"></el-image>
    <el-link :href="projectDetail[9]" type="primary" style="margin-top: 20px" target="_blank">相关资料</el-link>
  </div>
  <div v-else>
    <el-result icon="info" title="发电站介绍">
      <template #sub-title>
        <p>请在地图上选择一个项目来查看对应的介绍。</p>
      </template>
    </el-result>
<!--    <el-empty description="请在地图上选择一个项目来查看对应的介绍。" />-->
  </div>
</template>

<script>
import {statusChinese} from "@/utils";
export default {
  name: "ProjectDetails",
  props: ['projectDetail', 'enable'],
  data() {
    return {
      projectInfo: [],
    };
  },
  methods: {
    statusChinese
  },
}
</script>

<style scoped>

</style>