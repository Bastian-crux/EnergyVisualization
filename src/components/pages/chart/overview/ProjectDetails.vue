<template>
  <div v-if="enable === true">
    <tool-tip
      :name="projectDetail[0]"
      :year="projectDetail[6]"
      :status="statusChinese(projectDetail[1])"
      :capacity="projectDetail[2]"
    />
    <el-divider border-style="double" />
    <p class="description">{{ projectDetail[8] }}</p>
    <el-image :src="projectDetail[7]" style="margin-top: 20px"></el-image>
    <el-link
      :href="projectDetail[9]"
      type="primary"
      style="margin-top: 20px"
      target="_blank"
      >相关资料</el-link
    >
  </div>
  <div v-else class="detail">
    <el-result icon="info" title="发电站介绍">
      <template #sub-title>
        <p>请在地图上选择一个项目来查看对应的介绍。</p>
      </template>
    </el-result>
  </div>
</template>

<script>
import { statusChinese } from "@/utils";
import ToolTip from "@/components/pages/chart/overview/ToolTip.vue";

export default {
  name: "ProjectDetails",
  components: { ToolTip },
  props: ["projectDetail", "enable"],
  data() {
    return {
      projectInfo: [],
    };
  },
  methods: {
    statusChinese,
  },
};
</script>

<style scoped>
.detail {
  height: 632px;
}

.description {
  font-size: 14px;
}
</style>
