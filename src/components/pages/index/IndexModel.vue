<template>
  <div>
    <Renderer ref="renderer" antialias :orbit-ctrl="{ autoRotate: false, enableDamping: true, dampingFactor: 0.05 }"  resize="false" >
      <OrthographicCamera ref="camera"
                          :position="{x: 200, y: 200, z: 200}"
                          :left="0.5 * 100 * aspect / -2"
                          :right="0.5 * 100 * aspect / 2"
                          :top="100 / 2"
                          :bottom="100 / -2"
                          :near="1"
                          :far="10000"
      ></OrthographicCamera>
      <!--      <Camera ref="camera"-->
      <!--                          :position="{x: 100, y: 100, z: 100}"-->
      <!--                          :far="10000"-->
      <!--                          :lookAt="{x: 0, y: 0, z: 0}" />-->
      <Scene ref="myScene">
        <HemisphereLight
            :color="skyColor"
            :groundColor="groundColor"
            :intensity="brightnessPt"
            cast-shadow
        ></HemisphereLight>
        <SpotLight
            :color="spotLightColor"
            :angle="angle"
            :distance="200"
            :intensity="brightnessDr"
            :penumbra="0.5"
            :position="{x:25, y: 50, z:25 }"
            :target="{y: 0}"
        ></SpotLight>

        <AmbientLight
            :intensity="0.5"
        ></AmbientLight>
        <GltfModel src="/assets/models/nuclearPS.glb"
                   :position="{x: -16, y: 20, z: -10}" :scale="{x: 10, y: 10, z: 10}"/>
        <GltfModel src="/assets/models/windPS.glb"
                   :position="{x: 16, y: 20, z: -10}" :scale="{x: 10, y: 10, z: 10}"/>
        <GltfModel src="/assets/models/solarPS.glb"
                   :position="{x: 0, y: 20, z: 18}" :scale="{x: 10, y: 10, z: 10}"/>
        <!--        <Box ref="box" @pointerOver="windOver" @click="windClick" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">-->
        <!--          <LambertMaterial :color="boxColor" />-->
        <!--        </Box>-->
        <!--        <Plane-->
        <!--            :rotation="{ x: -Math.PI / 2}"-->
        <!--            :width="800"-->
        <!--            :height="800"-->
        <!--            :widthSegments="64"-->
        <!--            :heightSegments="64"-->
        <!--            :position="{x: 0, y: elevation, z: 0}"-->
        <!--            receive-shadow>-->
        <!--          <StandardMaterial :props="{ displacementScale: scale }">-->
        <!--            <Texture src="/assets/textures/rgb_d9dedf.png" />-->
        <!--&lt;!&ndash;            <Texture src="/assets/textures/Background.png" name="displacementMap" />&ndash;&gt;-->
        <!--          </StandardMaterial>-->
        <!--        </Plane>-->
      </Scene>
    </Renderer>
  </div>
</template>

<script>
import * as THREE from 'three';
import { AnimationMixer, Clock } from "three";
import {EffectComposer} from "three/addons/postprocessing/EffectComposer";
import {RenderPass} from "three/addons/postprocessing/RenderPass";
import {OutlinePass} from "three/addons/postprocessing/OutlinePass";
import {ShaderPass} from "three/addons/postprocessing/ShaderPass";
import {FXAAShader} from "three/addons/shaders/FXAAShader";
import {Pane} from 'tweakpane';
import {
  FbxModel,
  AmbientLight,
  RectAreaLight,
  HemisphereLight,
  SpotLight,
  Camera,
  OrthographicCamera,
  GltfModel,
  Renderer,
  Scene,
  Group,
  Box,
  Plane,
  Texture,
  StandardMaterial,
  LambertMaterial
} from 'troisjs';

export default {
  components: {
    FbxModel,
    AmbientLight,
    RectAreaLight,
    HemisphereLight,
    SpotLight,
    Camera,
    OrthographicCamera,
    GltfModel,
    Renderer,
    Scene,
    Group,
    Box,
    Plane,
    Texture,
    StandardMaterial,
    LambertMaterial
  },
  // setup(){
  //   const imageArray = Array(6).fill('/assets/skybox/sky.png')
  //   const cubeTexture = new THREE.CubeTextureLoader().load(imageArray)
  //
  //   return{
  //     cubeTexture,
  //     imageArray,
  //   }
  // },
  data(){
    return{
      // camera
      SCREEN_WIDTH: window.innerWidth,
      SCREEN_HEIGHT: window.innerHeight,
      aspect: window.innerWidth / window.innerHeight,
      // plane properties
      elevation: -12,
      scale: 30,
      // hemisphere light
      skyColor:'#ffffff',
      groundColor:'#000000',
      brightnessPt: 1.5,
      // spotlight
      spotLightColor: '#ffffff',
      brightnessDr: 5,
      angle: Math.PI/2,
      test: true,
      // outline
      // baseY:-20,
      composer: null,
      outlinePass: null,
      renderPass: null,

      // components
      camera: null,
      renderer: null,
      scene: null,
      mouse: null,




      // others
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
      this.elevation ++;
      // alert('Click');
      // this.$router.replace('/overview');
    },
  },
  mounted() {
    this.pane = new Pane();
    this.pane.addInput(this, 'brightnessPt', { min: 0, max: 3 });
    this.pane.addInput(this, 'brightnessDr', { min: 0, max: 5 });
    this.pane.addInput(this, 'angle', { min: 0, max: Math.PI });
    this.pane.addInput(this, 'skyColor');
    this.pane.addInput(this, 'groundColor');
    this.pane.addInput(this, 'spotLightColor');

    // 设置透明度
    const r = this.$refs.renderer.renderer;
    r.alpha = true;
    r.setClearColor( 0x000000, 0 );

    const scene = this.$refs.myScene;
    const renderer = this.$refs.renderer.renderer;
    const orbitControl = this.$refs.renderer.three.cameraCtrl;
    // orbitControl.enabled = false;
    const camera = this.$refs.camera.camera;

    this.scene=scene;
    this.camera=camera;
    this.renderer=renderer;
    this.mouse = new THREE.Vector2();
    // this.rayCaster = new THREE.Raycaster();


    // window.addEventListener('click', event=>{
    //   this.clickEvent(event);
    // });


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