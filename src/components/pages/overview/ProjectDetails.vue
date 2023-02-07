<template>
  <el-descriptions :title="projectName">
    <el-divider />
    <el-descriptions-item label="状态：">{{}}</el-descriptions-item>
    <el-descriptions-item label="功率：">{{}}</el-descriptions-item>
    <el-descriptions-item label="介绍：">{{}}</el-descriptions-item>
    <el-image :src=""></el-image>
    <el-descriptions-item label="项目介绍：">{{ intro }}</el-descriptions-item>
  </el-descriptions>
  <h1>相关资料：</h1>
  <a href="">{{ resourceLink }}</a>
</template>

<script>
export default {
  name: "ProjectDetails",
  props: ['projectName'],
  data(){
    return{
      projectInfo: [],
    };
  },
  methods:{

  }
}
</script>

<style scoped>

</style>