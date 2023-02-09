<template>
  <div>
    <Renderer ref="renderer" antialias :orbit-ctrl="{ enableDamping: true }"  resize="false">
      <Camera :position="{ x: 1, y: 0, z: 0 }" />
      <Scene>
        <AmbientLight></AmbientLight>
        <GltfModel src="assets/models/test.glb" />
      </Scene>
    </Renderer>
  </div>
</template>

<script>
import {
  AmbientLight,
  Camera,
  GltfModel,
  Renderer,
  Scene,
} from 'troisjs';
export default {
  components: {
    AmbientLight,
    Camera,
    GltfModel,
    Renderer,
    Scene,
  },
};
</script>

<style scoped>

</style>