<template>
  <base-card>
    <h2>Index</h2>
  </base-card>
  <base-card>
    <map-visualization></map-visualization>
  </base-card>
</template>

<script>
import BaseCard from "@/components/UI/BaseCard.vue";
import MapVisualization from "@/components/pages/index/MapVisualization.vue";

export default {
  name: "Index",
  components: {MapVisualization, BaseCard}
}
</script>

<style scoped>

</style>