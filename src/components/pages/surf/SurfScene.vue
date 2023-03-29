<template>
  <div id="index">
    <Renderer
      ref="renderer"
      shadow
      antialias
      resize="window"
      :orbit-ctrl="{
        autoRotate: false,
        enableDamping: true,
        dampingFactor: 0.05,
      }"
    >
      <Camera
        ref="camera"
        :position="{ x: 85, y: 5, z: -50 }"
        :lookAt="{ x: 0, y: 75, z: 0 }"
        :far="5000"
      />
      <Scene ref="scene">
        <HemisphereLight
          ref="light"
          color="rgb(1, 10, 26)"
          groundColor="rgb(7, 16, 33)"
          :intensity="1.78"
        />

        <!--      intensity 0.13-->
        <PointLight
          ref="sun"
          color="rgb(7, 16, 33)"
          :intensity="0.13"
          :position="{ x: 120, y: 20 }"
          :decay="0"
          cast-shadow
        />
        <PointLight
          ref="light1"
          color="rgb(20, 20, 100)"
          :intensity="1.0"
          :position="{ x: -120, y: 20 }"
          :decay="0.5"
          cast-shadow
        />
        <SpotLight
          color="#555555"
          :distance="500"
          :angle="Math.PI / 2"
          :decay="0.5"
          :intensity="5"
          :position="{ y: 250 }"
          :target="{ y: 500 }"
        />

        <GltfModel
          ref="mountain"
          src="/static/mountain.glb"
          dracoPath="/draco/"
          :scale="{ x: 45, y: 45, z: 45 }"
          :position="{ x: -73.61, y: -28.91, z: -32.61 }"
        />
        <!--        solar-->
        <GltfModel
          ref="newSolarStat"
          src="/static/solar/newSolarStat.glb"
          dracoPath="/draco/"
          :scale="{ x: 15, y: 15, z: 15 }"
          :position="{
            x: 56.52,
            y: 2.17,
            z: -43.48,
          }"
        />
        <GltfModel
          ref="board"
          src="/static/solar/board.glb"
          dracoPath="/draco/"
          :scale="{ x: 10, y: 10, z: 10 }"
          :position="{
            x: 32.61,
            y: 2.17,
            z: -43.48,
          }"
          :rotation="{ y: 2.93 }"
        />
        <GltfModel
          ref="board1"
          src="/static/solar/board.glb"
          dracoPath="/draco/"
          :scale="{ x: 10, y: 10, z: 10 }"
          :position="{
            x: 65.22,
            y: 2.17,
            z: -26.09,
          }"
          :rotation="{ y: 1.2 }"
        />
        <GltfModel
          ref="board2"
          src="/static/solar/board.glb"
          dracoPath="/draco/"
          :scale="{ x: 10, y: 10, z: 10 }"
          :position="{
            x: 71.74,
            y: 2.17,
            z: -17.39,
          }"
          :rotation="{ y: 1.2 }"
        />
        <GltfModel
          ref="board3"
          src="/static/solar/board.glb"
          dracoPath="/draco/"
          :scale="{ x: 10, y: 10, z: 10 }"
          :position="{
            x: 73.91,
            y: 2.6,
            z: -6.52,
          }"
          :rotation="{ y: 1.15 }"
        />
        <!--        nuclear-->
        <GltfModel
          ref="nuclearbuilding1"
          src="/static/nuclear/nuclearbuilding1.glb"
          dracoPath="/draco/"
          :scale="{ x: 15, y: 15, z: 15 }"
          :position="{
            x: 8.04,
            y: 2.35,
            z: -70.57,
          }"
        />
        <GltfModel
          ref="nuclearbuilding12"
          src="/static/nuclear/nuclearbuilding1.glb"
          dracoPath="/draco/"
          :scale="{ x: 15, y: 15, z: 15 }"
          :position="{
            x: 28.39,
            y: 3.35,
            z: -60.0,
          }"
        />
        <GltfModel
          ref="nuclearbuilding2"
          src="/static/nuclear/nuclearbuilding2.glb"
          dracoPath="/draco/"
          :scale="{ x: 17, y: 17, z: 17 }"
          :position="{
            x: -33.74,
            y: 1.65,
            z: -54.52,
          }"
        />
        <GltfModel
          ref="nuclearbuilding3"
          src="/static/nuclear/nuclearbuilding3.glb"
          dracoPath="/draco/"
          :scale="{ x: 17, y: 17, z: 17 }"
          :position="{
            x: -22,
            y: 1.65,
            z: -54.52,
          }"
          :rotation="{ y: 180 }"
        />
        <!--        forest-->
        <GltfModel
          ref="forest"
          src="/static/forest.glb"
          dracoPath="/draco/"
          :scale="{ x: 35, y: 35, z: 35 }"
          :position="{
            x: 13.48,
            y: -1.74,
            z: -11.2,
          }"
          :rotation="{
            x: 0.13,
            y: 0.0,
            z: 0.13,
          }"
        />
        <!--        wind-->
        <GltfModel
          ref="windbuilding"
          src="/static/wind/building.glb"
          dracoPath="/draco/"
          :scale="{ x: 18, y: 18, z: 18 }"
          :position="{
            x: 8.7,
            y: -6.52,
            z: 50.0,
          }"
        />
        <GltfModel
          ref="generator"
          src="/static/wind/generator.glb"
          dracoPath="/draco/"
          :scale="{ x: 18, y: 18, z: 18 }"
          :position="{ x: -19.57, y: -6.52, z: 52.17 }"
          :rotation="{ y: -0.96 }"
        />
        <GltfModel
          ref="generator2"
          src="/static/wind/generator.glb"
          dracoPath="/draco/"
          :scale="{ x: 20, y: 20, z: 20 }"
          :position="{
            x: -36.96,
            y: -8.7,
            z: 54.35,
          }"
          :rotation="{ y: -0.96 }"
        />
        <GltfModel
          ref="generator3"
          src="/static/wind/generator.glb"
          dracoPath="/draco/"
          :scale="{ x: 18, y: 18, z: 18 }"
          :position="{
            x: -34.78,
            y: -2.17,
            z: 39.13,
          }"
          :rotation="{ y: -0.96 }"
        />
        <!-- cloud -->
        <Plane
          v-for="i in 15"
          :ref="`mesh${i}`"
          :width="500"
          :height="500"
          :position="{
            x: Math.random() * 800 - 400,
            y: 400,
            z: Math.random() * 800 - 400,
          }"
          :rotation="{ x: Math.PI / 2, y: 0, z: Math.random() * 360 }"
        >
          <StandardMaterial
            :props="{ transparent: true, opacity: 0.6, depthWrite: false }"
          >
            <Texture src="/assets/textures/smoke.png" />
          </StandardMaterial>
        </Plane>

        <Plane
          :rotation="{ x: -Math.PI / 2 }"
          :width="800"
          :height="800"
          :widthSegments="64"
          :heightSegments="64"
          :position="{ x: -32.61, y: -13.35, z: 8.7 }"
          receive-shadow
        >
          <StandardMaterial :props="{ displacementScale: 20 }">
            <Texture src="/assets/textures/green3c5942.png" />
            <Texture
              src="/assets/textures/background.png"
              name="displacementMap"
            />
          </StandardMaterial>
        </Plane>
      </Scene>
    </Renderer>
  </div>
</template>

<script>
import * as THREE from "three";
import { MathUtils, Object3D, Vector3 } from "three";
import { ref, computed, watch } from "vue";
import { NButton, NProgress } from "naive-ui";
import { Water } from "three/examples/jsm/objects/Water.js";
import Loader from "./Loader.vue";
import Menu from "./Menu.vue";
import TextScroll from "./TextScroll.vue";
import DataList from "@/components/pages/statistic/DataList.vue";
import DataListMain from "@/components/pages/statistic/DataListMain.vue";
import { Pane } from "tweakpane";

const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;

export default {
  components: {
    DataListMain,
    DataList,
    Loader,
    NButton,
    NProgress,
    Menu,
    TextScroll,
  },
  setup() {
    //Loading Manager
    const percent = ref(0);
    THREE.DefaultLoadingManager.onProgress = function (
      url,
      itemsLoaded,
      itemsTotal
    ) {
      percent.value = (itemsLoaded / itemsTotal) * 100;
    };

    //textures
    const imageArray = Array(6).fill("/assets/skybox/sky.png");

    return {
      //imesh
      //vert ctrl
      //page load
      percent,
      //mouse
      //sound ctrl
      //plants
      //texture
      imageArray,
    };
  },
  mounted() {
    // pane
    // this.pane = new Pane();
    // this.pane.addInput(this, "solarBuildingX", { min: -100, max: 100 });

    //scene core
    this.renderer = this.$refs.renderer;
    this.scene = this.$refs.scene.scene;
    this.camera = this.$refs.camera.camera;
    this.scene.fog = new THREE.Fog(this.skycolor, 1, 800);

    // Set window size
    let element = document.getElementById("index");
    this.renderer.three.setSize(element.clientWidth, element.clientHeight);
    //skybox
    let texture = [];
    let material = [];
    this.imageArray.forEach((el) =>
      texture.push(new THREE.TextureLoader().load(el))
    );
    texture.forEach((el) =>
      material.push(new THREE.MeshStandardMaterial({ map: el }))
    );
    for (let i = 0; i < 6; i++) material[i].side = THREE.BackSide;
    let skyboxGeo = new THREE.BoxGeometry(5000, 5000, 5000);
    let skybox = new THREE.Mesh(skyboxGeo, material);
    this.scene.add(skybox);

    //ANIMATION LOOP
    this.renderer.onBeforeRender(() => {});
  },

  unmounted() {
    console.log(this.scene);
    this.disposeScene();
  },

  watch: {},

  methods: {
    disposeScene() {
      // const renderer = this.$refs.renderer;
      // const scene = this.$refs.scene.scene;
      // this.camera = this.$refs.camera.camera;
      // this.viewControls2 = this.$refs.renderer.three.cameraCtrl;

      // this.removeModel(null, this.scene);

      // scene.background.dispose();
      // this.viewControls2.dispose();
      //处理当前的渲染环境
      this.renderer.dispose();

      //模拟WebGL环境的丢失。
      this.renderer.forceContextLoss();
      //在内部用于处理场景渲染对象的排序注销
      this.renderer.renderLists.dispose();
      //renderer的渲染容器删除
      this.renderer.domElement = null;
      //释放renderer变量的内存
      this.renderer = null;
      //清除所有缓存中的值。
      THREE.Cache.clear();
      this.scene.remove();

      // this.camera = null;
      // this.scene = null;
      // this.renderer = null;
      // this.viewControls2 = null;
      // model = null;
      // composer = null;
      // outlinePass = null;
      // renderPass = null;
      // element = null;
      // stats = null;

      // cancelAnimationFrame(animateId);
      // animateId = null;
    },
    removeModel(parent, child) {
      if (child.children.length) {
        let arr = child.children.filter((x) => x);
        arr.forEach((a) => {
          this.removeModel(child, a);
        });
      }
      if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
        child.geometry.dispose();
      } else if (child.material) {
        child.material.dispose();
      }
      scene.remove(child);
      if (parent) {
        parent.remove(child);
      }
    },
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    },
  },
};
</script>

<style scoped>
.switch-enter-active,
.switch-leave-active {
  --transition-time: 1s;
}
* {
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
}
body {
  margin: 0;
}
a {
  text-decoration: inherit;
  color: inherit;
}
canvas {
  display: block;
}
.absolute {
  position: absolute;
}
.center {
  transform: translate(-50%, 0);
  left: 50%;
}
.menu {
  text-align: center;
}
.menu h1,
p,
h2 {
  color: white;
}
.menu h1 {
  margin: 0 auto 5px;
}
.menu p {
  margin: 2vh auto 0;
}
.btn::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--border-height);
  background-color: white;
  transition: transform 300ms ease-in-out;
  transform: scaleX(0);
}
.btn:hover::before,
.btn:focus::before {
  transform: scaleX(1);
}
</style>
