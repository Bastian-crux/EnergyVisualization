<template>
  <div>
    <Renderer ref="renderer" antialias :orbit-ctrl="{ enableDamping: true }"  resize="false">
      <Camera :position="{ x: 1, y: 0, z: 0 }" />
      <Scene ref="myTest" >
        <AmbientLight></AmbientLight>
        <GltfModel src="assets/models/myTest1.glb" @load="onLoad"/>
<!--        <Box ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">-->
<!--          <lambert-material></lambert-material>-->
<!--        </Box>-->
      </Scene>
    </Renderer>
  </div>
</template>

<script>
import { AnimationMixer, Clock } from "three";
import {
    FbxModel,
    AmbientLight,
    Camera,
    GltfModel,
    Renderer,
    Scene,
    Box,
    LambertMaterial
} from 'troisjs';

export default {
  components: {
    FbxModel,
    AmbientLight,
    Camera,
    GltfModel,
    Renderer,
    Scene,
    Box,
    LambertMaterial
  },
  methods: {
    onLoad(object) {
      this.mixer = new AnimationMixer(object.scene);
      const action = this.mixer.clipAction(object.animations[0]);
      action.play();

      // object.traverse(function (child) {
      //   if (child.isMesh) {
      //     child.castShadow = true;
      //     child.receiveShadow = true;
      //   }
      // });
      this.clock = new Clock();
      this.$refs.renderer.onBeforeRender(this.updateMixer);
    },
    updateMixer() {
      this.mixer.update(this.clock.getDelta());
    },
  },
  mounted() {
    console.log(this.$refs.myTest);
    const r = this.$refs.renderer.renderer;
    r.alpha = true;
    r.setClearColor( 0x000000, 0 );
    const renderer = this.$refs.renderer;
    // let mesh = this.$refs.box.mesh;
    // console.log(this.$refs.box.mesh);
    // renderer.onBeforeRender(() => {
    //   const t = Date.now();
    //   // let mesh = this.$refs.box.mesh;
    //   let mesh = this.$refs.myTest.scene;
    //   let ti = (t - 2 * 500);
    //   mesh.rotation.x = ti * 0.0002;
    // });

  }
};
</script>

<style scoped>

</style>