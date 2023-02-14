<template>
  <div>
    <Renderer ref="renderer" antialias :orbit-ctrl="{ autoRotate: true, enableDamping: true, dampingFactor: 0.05 }"  resize="false" >
<!--      <OrthographicCamera :position="{ x: 5, y: 0, z: 0 }" />-->
      <Camera :position="{ x: 1, y: 0, z: 0 }" />
      <Scene ref="myTest">
        <AmbientLight></AmbientLight>
<!--        <GltfModel src="assets/models/PowerStationMergeWind1.glb" @pointerOver="windOver" @click="windClick" />-->
<!--        <GltfModel src="assets/models/PowerStationMergeNuclear.glb" />-->
          <GltfModel src="assets/models/PowerStationMergeSolar.glb" />
        <Box ref="box" @pointerOver="windOver" @click="windClick" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
          <LambertMaterial :color="boxColor" />
        </Box>
      </Scene>
    </Renderer>
  </div>
</template>

<script>
import { AnimationMixer, Clock } from "three";
import {
    FbxModel,
    AmbientLight,
    RectAreaLight,
    Camera,
    OrthographicCamera,
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
    RectAreaLight,
    Camera,
    OrthographicCamera,
    GltfModel,
    Renderer,
    Scene,
    Box,
    LambertMaterial
  },
  data(){
    return{
      boxColor: '#ffffff',
      rectLightsProps: {
        // rotation: { x: -Math.PI / 2 },
        lookAt: { x: 0, y: 0, z: 1 },
        intensity: 5,
        width: 5,
        height: 5,
        helper: true,
      },
    };
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
    windOver(){
      console.log('windOver');
    },
    windClick(){
      console.log('click');
      alert('Click');
      this.$router.replace('/overview');
    },
    boxOver({ over }) {
      this.boxColor = over ? '#ff0000' : '#ffffff';
    },
    boxClick(e) {
      alert('Click');
      console.log(e);
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