<template>
  <base-card>
    <el-button>test</el-button>
  </base-card>
  <base-card>
    <map-visualization></map-visualization>
  </base-card>
</template>

<script>
import BaseCard from "@/components/UI/BaseCard.vue";
import MapVisualization from "@/components/pages/overview/MapVisualization.vue";

export default {
  name: "Overview",
  components: {MapVisualization, BaseCard}
}
</script>

<style scoped>

</style>