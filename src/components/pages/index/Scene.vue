<template>
  <div id="index">
    <transition name="fade">
      <Loader v-if="loaded" :progress="percent" @initPage="initPage" />
    </transition>

    <!--  title-->
    <transition name="text">
      <div
        v-if="vPosition < 500 && !loaded"
        class="absolute center"
        style="top: 20%; color: white; width: 100%; text-align: center"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">EXPLORE THE OASIS</h1>
        <p>A TroisJS Experiment</p>
      </div>
    </transition>

    <!--  1-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; right: 0px; top: 25%"
        v-if="vPosition > 2200 && vPosition < 6000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">阶段一</h1>
        <p style="margin-left: 0px; width: 300px">
          Are you a Vue developer looking to quickly add 3D content to your
          website? This website is built with
          <a href="https://troisjs.github.io/"><u>TroisJS</u></a
          >, a Vue framework for Three.js. If you prefer React, try
          <a href="https://docs.pmnd.rs/react-three-fiber/"
            ><u>React Three Fiber</u></a
          >!
        </p>
      </div>
    </transition>

    <!--  2-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; right: 0px; top: 15%"
        v-if="vPosition > 9000 && vPosition < 12000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">阶段二</h1>
        <p style="margin-left: 30px; width: 300px">
          Here are some ways to improve your browser's performance on 3D
          websites. If you have a dedicated GPU, configure your browser
          accordingly:
          <a
            href="https://equatorstudios.com/how-to-choose-which-gpu-chrome-uses-on-windows-10/"
            ><u>Chrome</u></a
          >
          ,
          <a
            href="https://www.windowscentral.com/how-force-microsoft-edge-use-best-gpu-windows-10-april-2018-update"
            ><u>Edge</u></a
          >. If you use Chrome or Firefox,
          <a href="https://github.com/light-tracer/issues/issues/1"
            ><u>enable OpenGL for ANGLE</u></a
          >.
        </p>
      </div>
    </transition>

    <!--  3-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 450px; left: 100px; top: 20%"
        v-if="vPosition > 14000 && vPosition < 16000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">阶段三</h1>
        <p style="width: 300px">
          Want to see more 3D websites? Visit
          <a href="https://threejs.org/"><u>Three.js</u></a> and
          <a href="https://www.awwwards.com/websites/3d/"><u>Awwwards</u></a
          >.
        </p>
      </div>
    </transition>

    <!--  4-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 450px; left: 100px; top: 20%"
        v-if="vPosition > 18000 && vPosition < 20000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">阶段四</h1>
        <!--      <p style=" width: 300px">Want to see more 3D websites? Visit <a href="https://threejs.org/"><u>Three.js</u></a> and <a href="https://www.awwwards.com/websites/3d/"><u>Awwwards</u></a>.</p>-->
      </div>
    </transition>

    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 600px; left: 300px; top: 8%"
        v-if="vPosition > 18000 && vPosition < 20000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <data-list-main></data-list-main>
      </div>
    </transition>

    <!--  5-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 450px; left: 100px; top: 20%"
        v-if="vPosition > 22000 && vPosition < 30000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">阶段五</h1>
        <p style="width: 300px">
          Want to see more 3D websites? Visit
          <a href="https://threejs.org/"><u>Three.js</u></a> and
          <a href="https://www.awwwards.com/websites/3d/"><u>Awwwards</u></a
          >.
        </p>
      </div>
    </transition>

    <!--  进度条-->
    <transition name="switch" mode="out-in">
      <TextScroll v-if="vPosition < 500" />
      <div v-else>
        <IconGroup
          :vPosition="vPosition"
          :processing="processing"
          @relocate="onRelocate"
        />
        <n-progress
          type="line"
          :height="6"
          :color="iconColor"
          :rail-color="skycolor"
          :percentage="vPosition / 240"
          :show-indicator="false"
          style="width: 500px; bottom: 30px"
          class="absolute center"
        />
      </div>
    </transition>

    <Renderer
      ref="renderer"
      @wheel="(e) => !loaded && onScroll(e)"
      @mouseMove="onMove"
      shadow
      antialias
      resize="window"
    >
      <Camera
        ref="camera"
        :position="{ x: 85, y: 5, z: -50 }"
        :lookAt="{ x: 0, y: 75, z: 0 }"
        :far="5000"
      />
      <Scene ref="scene">
        <!--      黑夜时的色彩-->
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
        <!--        <PointLight-->
        <!--          ref="light1"-->
        <!--          color="rgb(20, 20, 100)"-->
        <!--          :intensity="1.0"-->
        <!--          :position="{ x: -120, y: 20 }"-->
        <!--          :decay="0.5"-->
        <!--          cast-shadow-->
        <!--        />-->

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

        <InstancedMesh ref="imesh" :count="NUM_INSTANCES">
          <SphereGeometry :radius="0.3" />
          <BasicMaterial
            color="#ffffff"
            :props="{ opacity: 0, transparent: true }"
          />
        </InstancedMesh>
      </Scene>
    </Renderer>

    <audio ref="rainSound" loop>
      <source src="/assets/sounds/rain.wav" type="audio/wav" />
    </audio>
    <audio ref="chimes" loop>
      <source src="/assets/sounds/chimes.wav" type="audio/wav" />
    </audio>
    <audio ref="desertSound" loop>
      <source src="/assets/sounds/desert.wav" type="audio/wav" />
    </audio>
  </div>
</template>

<script>
import * as THREE from "three";
import { MathUtils, Object3D, Vector3 } from "three";
import { ref, computed, watch } from "vue";
import { NButton, NProgress } from "naive-ui";
import { Water } from "three/examples/jsm/objects/Water.js";
import Loader from "./Loader.vue";
import IconGroup from "./IconGroup.vue";
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
    IconGroup,
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

    //verticle control
    // const [rainTime, nightTime, dawnTime, dayTime] = [6000, 8000, 4000, 6000]; // 持续时间
    // TODO: Debug Only
    const [rainTime, nightTime, dawnTime, dayTime] = [0, 0, 0, 100000]; // 持续时间

    const vPosition = ref(0);
    const dummy = ref(0); // 记录当前的位置

    // wheel触发
    const onScroll = (ev) => {
      const delY = ev.deltaY;
      dummy.value += delY;
      dummy.value = Math.min(
        Math.max(0, dummy.value),
        rainTime + nightTime + dawnTime + dayTime
      );
    };

    const interval = ref(null);
    const processing = ref(false);

    const onRelocate = (ev) => {
      processing.value = true;
      const old = dummy.value;
      if (old < ev && ev - old > 10) {
        interval.value = setInterval(function () {
          increment(ev);
        }, 0.01);
      } else if (old > ev && old - ev > 10) {
        interval.value = setInterval(function () {
          decrement(ev);
        }, 0.01);
      }
    };

    // 进度条快速推进
    const increment = (ev) => {
      dummy.value += 10;
      if (dummy.value >= ev) {
        clearInterval(interval.value); // 停止该interval id
        processing.value = false;
      }
    };
    // 进度条快速回退
    const decrement = (ev) => {
      dummy.value -= 10;
      if (dummy.value <= ev) {
        clearInterval(interval.value);
        processing.value = false;
      }
    };

    const iconColor = computed(() =>
      vPosition.value > 15000 ? "#4d290b" : "white"
    );

    const opacity = computed(() => {
      if (
        vPosition.value > rainTime + nightTime / 4 &&
        vPosition.value < rainTime + nightTime / 2
      ) {
        return (vPosition.value - rainTime - nightTime / 4) / (nightTime / 4);
      } else if (
        vPosition.value >= rainTime + nightTime / 4 &&
        vPosition.value <= rainTime + (3 * nightTime) / 4
      ) {
        return 1;
      } else if (
        vPosition.value > rainTime + (3 * nightTime) / 4 &&
        vPosition.value < rainTime + nightTime
      ) {
        return (
          1 -
          (vPosition.value - rainTime - (3 * nightTime) / 4) / (nightTime / 4)
        );
      } else {
        return 0;
      }
    });

    const rainUnder = computed(() =>
      Math.min(Math.floor((3000 * vPosition.value) / rainTime), 3000)
    );

    const fogDistance = computed(() => {
      if (
        vPosition.value > rainTime &&
        vPosition.value < rainTime + nightTime
      ) {
        return 800 - (500 * (vPosition.value - rainTime)) / nightTime;
      } else if (
        vPosition.value >= rainTime + nightTime &&
        vPosition.value <= rainTime + nightTime + dawnTime / 4
      ) {
        return 300;
      } else if (
        vPosition.value > rainTime + nightTime + dawnTime / 4 &&
        vPosition.value < rainTime + nightTime + dawnTime
      ) {
        return (
          300 +
          (500 * (vPosition.value - rainTime - nightTime - dawnTime / 4)) /
            ((3 * dawnTime) / 4)
        );
      } else {
        return 800;
      }
    });

    const sunHeight = computed(() =>
      Math.min(
        Math.max(
          (200 * (vPosition.value - rainTime - nightTime)) / dawnTime,
          0
        ),
        200
      )
    );
    const blend = function (a, b, u) {
      return Math.floor((1 - u) * a + u * b);
    };
    const skycolor = computed(() => {
      const colorFactor = Math.min(
        Math.max((vPosition.value - rainTime - nightTime) / dawnTime, 0),
        1
      );
      return `rgb(${blend(14, 255, colorFactor)}, ${blend(
        29,
        237,
        colorFactor
      )}, ${blend(56, 206, colorFactor)})`;
    });
    const groundcolor = computed(() => {
      const colorFactor = Math.min(
        Math.max((vPosition.value - rainTime - nightTime) / dawnTime, 0),
        1
      );
      return `rgb(${blend(7, 186, colorFactor)}, ${blend(
        16,
        165,
        colorFactor
      )}, ${blend(33, 165, colorFactor)})`;
    });

    //mouse
    const mouseY = ref(0);
    const onMove = (ev) => {
      mouseY.value = -(ev.pageY / window.innerHeight - 0.5) * 5;
    };

    //sound
    const rainSound = ref(null);
    const desertSound = ref(null);
    const chimes = ref(null);
    const loaded = ref(true);
    const initPage = () => {
      loaded.value = false;
      rainSound.value.play();
      desertSound.value.play();
      chimes.value.play();
      rainSound.value.volume = 1;
      desertSound.value.volume = 0;
      chimes.value.volume = 0;
    };

    const rainVolume = computed(() =>
      Math.max(1 - vPosition.value / rainTime, 0)
    );
    watch(rainVolume, (val, prev) => {
      rainSound.value.volume = val;
    });

    const desertVolume = computed(() =>
      Math.min(
        Math.max((vPosition.value - rainTime - nightTime) / dawnTime, 0),
        1
      )
    );
    watch(desertVolume, (val, prev) => {
      desertSound.value.volume = val;
    });

    const toggleSound = () => {
      soundMuted.value = soundMuted.value ? false : true;
      rainSound.value.muted = soundMuted.value;
      desertSound.value.muted = soundMuted.value;
      chimes.value.muted = soundMuted.value;
    };

    const disposeScene = () => {
      removeModel(null, this.scene);

      // scene.background.dispose();
      // viewControls2.dispose();
      //处理当前的渲染环境
      this.renderer.dispose();

      //模拟WebGL环境的丢失。
      this.renderer.forceContextLoss();
      //在内部用于处理场景渲染对象的排序注销
      this.renderer.renderLists.dispose();
      //renderer的渲染容器删除
      this.renderer.domElement = null;
      //释放renderer变量的内存
      // this.renderer = null;
      //清除所有缓存中的值。
      THREE.Cache.clear();
      // scene.remove();

      // this.camera = null;
      // this.scene = null;
      // renderer = null;
      // viewControls2 = null;
      // model = null;
      // composer = null;
      // outlinePass = null;
      // renderPass = null;
      // element = null;
      // stats = null;

      // cancelAnimationFrame(animateId);
      // animateId = null;
    };

    const removeModel = (parent, child) => {
      if (child.children.length) {
        let arr = child.children.filter((x) => x);
        arr.forEach((a) => {
          removeModel(child, a);
        });
      }
      if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
        child.geometry.dispose();
      } else if (child.material) {
        child.material.dispose();
      }
      this.scene.remove(child);
      if (parent) {
        parent.remove(child);
      }
    };

    const soundMuted = ref(false);

    //textures
    const imageArray = Array(6).fill("/assets/skybox/sky.png");

    const NUM_INSTANCES = 800;
    const instances = [];
    const target = new Vector3();
    const dummyO = new Object3D();
    const dummyV = new Vector3();
    for (let i = 0; i < NUM_INSTANCES; i++) {
      instances.push({
        position: new Vector3(rndFS(30), rndFS(30), rndFS(30)),
        scale: 1,
        velocity: new Vector3(rndFS(1.5), rndFS(1.5), rndFS(1.5)),
        attraction: 0.03 + rnd(-0.01, 0.01),
        vlimit: 1 + rnd(-0.1, 0.1),
      });
    }

    // pane
    const solarBuildingX = ref(56.52);
    const solarBuildingY = ref(2.17);
    const solarBuildingZ = ref(-43.48);
    const solarBoardX = ref(32.61);
    const solarBoardY = ref(2.17);
    const solarBoardZ = ref(-60.87);
    const boardRotate = ref(2.93);
    const solarBoardX2 = ref(65.22);
    const solarBoardY2 = ref(2.17);
    const solarBoardZ2 = ref(-26.09);
    const boardRotate2 = ref(1.2);
    const solarBoardX3 = ref(71.74);
    const solarBoardY3 = ref(2.17);
    const solarBoardZ3 = ref(-17.39);
    const boardRotate3 = ref(1.2);
    const solarBoardX4 = ref(73.91);
    const solarBoardY4 = ref(2.6);
    const solarBoardZ4 = ref(-6.52);
    const boardRotate4 = ref(1.15);
    const mountainX = ref(-73.61);
    const mountainY = ref(-28.91);
    const mountainZ = ref(-32.61);
    const planeX = ref(-32.61);
    const planeY = ref(-13.35);
    const planeZ = ref(8.7);

    const nuclearBuilding1X = ref(8.04);
    const nuclearBuilding1Y = ref(2.35);
    const nuclearBuilding1Z = ref(-70.57);

    const nuclearBuilding1X_a = ref(28.39);
    const nuclearBuilding1Y_a = ref(3.35);
    const nuclearBuilding1Z_a = ref(-60.0);

    const nuclearBuilding2X = ref(-33.74);
    const nuclearBuilding2Y = ref(1.65);
    const nuclearBuilding2Z = ref(-54.52);

    const nuclearBuilding3X = ref(-22);
    const nuclearBuilding3Y = ref(-2);
    const nuclearBuilding3Z = ref(-50);

    const forsetX = ref(13.48);
    const forsetY = ref(-1.74);
    const forsetZ = ref(-11.2);

    const forest_rotateX = ref(0.13);
    const forest_rotateY = ref(0.0);
    const forest_rotateZ = ref(0.13);

    const buildingX = ref(8.7);
    const buildingY = ref(-6.52);
    const buildingZ = ref(50.0);
    const generatorX = ref(-36.96);
    const generatorY = ref(-8.7);
    const generatorZ = ref(54.35);

    const generator_rotateY = ref(-0.96);

    return {
      //imesh
      NUM_INSTANCES,
      instances,
      target,
      dummyO,
      dummyV,
      //vert ctrl
      interval,
      onRelocate,
      processing,
      vPosition,
      dummy,
      iconColor,
      fogDistance,
      onScroll,
      sunHeight,
      skycolor,
      groundcolor,
      rainUnder,
      opacity,
      //page load
      initPage,
      loaded,
      percent,
      //mouse
      onMove,
      mouseY,
      //sound ctrl
      toggleSound,
      rainSound,
      chimes,
      desertSound,
      rainVolume,
      desertVolume,
      soundMuted,
      //texture
      imageArray,
      rainCount: 3000,

      // pane
      solarBuildingX,
      solarBuildingY,
      solarBuildingZ,
      solarBoardX,
      solarBoardY,
      solarBoardZ,
      boardRotate,
      solarBoardX2,
      solarBoardY2,
      solarBoardZ2,
      boardRotate2,
      solarBoardX3,
      solarBoardY3,
      solarBoardZ3,
      boardRotate3,
      solarBoardX4,
      solarBoardY4,
      solarBoardZ4,
      boardRotate4,
      mountainX,
      mountainY,
      mountainZ,
      planeX,
      planeY,
      planeZ,

      nuclearBuilding1X,
      nuclearBuilding1Y,
      nuclearBuilding1Z,
      nuclearBuilding1X_a,
      nuclearBuilding1Y_a,
      nuclearBuilding1Z_a,
      nuclearBuilding2X,
      nuclearBuilding2Y,
      nuclearBuilding2Z,
      nuclearBuilding3X,
      nuclearBuilding3Y,
      nuclearBuilding3Z,

      forsetX,
      forsetY,
      forsetZ,

      forest_rotateX,
      forest_rotateY,
      forest_rotateZ,

      buildingX,
      buildingY,
      buildingZ,
      generatorX,
      generatorY,
      generatorZ,

      generator_rotateY,
      disposeScene,
    };
  },
  mounted() {
    /*
    // pane
    this.pane = new Pane();
    // Solar
    this.pane.addInput(this, "solarBuildingX", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBuildingY", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBuildingZ", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBoardX", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBoardY", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBoardZ", { min: -100, max: 100 });
    this.pane.addInput(this, "boardRotate", { min: 0, max: 10 });
    this.pane.addInput(this, "solarBoardX2", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBoardY2", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBoardZ2", { min: -100, max: 100 });
    this.pane.addInput(this, "boardRotate2", { min: 0, max: 10 });
    this.pane.addInput(this, "solarBoardX3", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBoardY3", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBoardZ3", { min: -100, max: 100 });
    this.pane.addInput(this, "boardRotate3", { min: 0, max: 10 });
    this.pane.addInput(this, "solarBoardX4", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBoardY4", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBoardZ4", { min: -100, max: 100 });
    this.pane.addInput(this, "boardRotate4", { min: 0, max: 10 });

    // nuclear
    this.pane.addInput(this, "nuclearBuilding1X", { min: -200, max: 200 });
    this.pane.addInput(this, "nuclearBuilding1Y", { min: -200, max: 200 });
    this.pane.addInput(this, "nuclearBuilding1Z", { min: -200, max: 200 });

    this.pane.addInput(this, "nuclearBuilding1X_a", { min: -200, max: 200 });
    this.pane.addInput(this, "nuclearBuilding1Y_a", { min: -200, max: 200 });
    this.pane.addInput(this, "nuclearBuilding1Z_a", { min: -200, max: 200 });

    this.pane.addInput(this, "nuclearBuilding2X", { min: -200, max: 200 });
    this.pane.addInput(this, "nuclearBuilding2Y", { min: -200, max: 200 });
    this.pane.addInput(this, "nuclearBuilding2Z", { min: -200, max: 200 });
    this.pane.addInput(this, "nuclearBuilding3X", { min: -200, max: 200 });
    this.pane.addInput(this, "nuclearBuilding3Y", { min: -200, max: 200 });
    this.pane.addInput(this, "nuclearBuilding3Z", { min: -200, max: 200 });

    // this.pane.addInput(this, "mountainX", { min: -100, max: 100 });
    // this.pane.addInput(this, "mountainY", { min: -100, max: 100 });
    // this.pane.addInput(this, "mountainZ", { min: -100, max: 100 });
    // this.pane.addInput(this, "planeX", { min: -100, max: 100 });
    // this.pane.addInput(this, "planeY", { min: -100, max: 100 });
    // this.pane.addInput(this, "planeZ", { min: -100, max: 100 });

    this.pane.addInput(this, "forsetX", { min: -20, max: 20 });
    this.pane.addInput(this, "forsetY", { min: -20, max: 20 });
    this.pane.addInput(this, "forsetZ", { min: -20, max: 10 });

    this.pane.addInput(this, "forest_rotateX", { min: -3, max: 3 });
    this.pane.addInput(this, "forest_rotateY", { min: -3, max: 3 });
    this.pane.addInput(this, "forest_rotateZ", { min: -3, max: 3 });

    this.pane.addInput(this, "buildingX", { min: -10, max: 20 });
    this.pane.addInput(this, "buildingY", { min: -10, max: 20 });
    this.pane.addInput(this, "buildingZ", { min: 20, max: 80 });
    this.pane.addInput(this, "generatorX", { min: -100, max: 100 });
    this.pane.addInput(this, "generatorY", { min: -100, max: 100 });
    this.pane.addInput(this, "generatorZ", { min: -100, max: 100 });

    this.pane.addInput(this, "generator_rotateY", { min: -4, max: 4 });
*/

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

    //mouse
    // const mouse = this.$refs.mouse.light;
    // this.pointer = this.renderer.three.pointer;
    // const mouseV3 = this.pointer.positionV3;

    //rain
    const rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
      transparent: true,
    });

    const rainGeo = new THREE.BufferGeometry();
    let rainVert = new Float32Array(this.rainCount * 3);
    for (let i = 0; i < this.rainCount; i++) {
      (rainVert[i * 3] = Math.random() * 400 - 200),
        (rainVert[i * 3 + 1] = Math.random() * 250),
        (rainVert[i * 3 + 2] = Math.random() * 400 - 200);
    }
    rainGeo.setAttribute("position", new THREE.BufferAttribute(rainVert, 3));
    this.rain = new THREE.Points(rainGeo, rainMaterial);
    this.scene.add(this.rain);
    const positions = this.rain.geometry.attributes.position.array;

    //particles
    this.pointerV3 = new THREE.Vector3();
    this.imesh = this.$refs.imesh.mesh;
    this.imesh.visible = false;
    for (let i = 0; i < this.NUM_INSTANCES; i++) {
      const { position, scale } = this.instances[i];
      this.dummyO.position.copy(position);
      this.dummyO.scale.set(scale, scale, scale);
      this.dummyO.updateMatrix();
      this.imesh.setMatrixAt(i, this.dummyO.matrix);
    }
    this.imesh.instanceMatrix.needsUpdate = true;

    let mesh;

    console.log(this.scene);

    //ANIMATION LOOP
    this.renderer.onBeforeRender(() => {
      // water.material.uniforms[ 'time' ].value += 0.7 / 60.0;
      if (this.vPosition > 2400) {
        this.camera.position.x = Math.cos((this.vPosition - 2400) / 3000) * 150;
        this.camera.position.z = Math.sin((this.vPosition - 2400) / 3000) * 200;
      }

      if (this.vPosition < 2000) {
        this.camera.position.set(
          (-150 * this.vPosition) / 2000 + 300,
          (-40 * this.vPosition) / 2000 + 100 + this.mouseY,
          (-100 * this.vPosition) / 2000 + 100
        );
        this.camera.lookAt(
          0,
          35 - (15 * this.vPosition) / 2000,
          (-30 * this.vPosition) / 2000
        );
      } else if (this.vPosition < 2400) {
        this.camera.position.y = 60 + this.mouseY;
        this.camera.lookAt(0, 20, -30 - (20 * (this.vPosition - 2000)) / 400);
      } else if (this.vPosition < 9000) {
        this.camera.position.y =
          60 + 40 * ((this.vPosition - 2400) / 6600) + this.mouseY;
        this.camera.lookAt(
          (30 * (this.vPosition - 2400)) / 6600,
          20,
          -50 + (80 * (this.vPosition - 2400)) / 6600
        );
      } else if (this.vPosition < 12000) {
        this.camera.position.y =
          100 - (50 * (this.vPosition - 9000)) / 3000 + this.mouseY;
        this.camera.lookAt(30, 20 - (20 * (this.vPosition - 9000)) / 3000, 30);
      } else if (this.vPosition < 14000) {
        this.camera.lookAt(
          30 - (30 * (this.vPosition - 12000)) / 2000,
          0,
          30 - (30 * (this.vPosition - 12000)) / 2000
        );
        this.camera.position.y =
          50 + (20 * (this.vPosition - 12009)) / 2000 + this.mouseY;
      } else if (this.vPosition < 18000) {
        this.camera.lookAt(0, (20 * (this.vPosition - 14000)) / 4000, 0);
        this.camera.position.y = 70 + this.mouseY;
      } else {
        this.camera.lookAt(0, 20, 0);
        this.camera.position.y = 70 + this.mouseY;
      }

      this.vPosition = this.lerp(this.vPosition, this.dummy, 0.1); // ?
      if (this.opacity > 0) {
        this.animateMesh();
      }
      if (!this.loaded) {
        // 缓慢推进
        // TODO: Debug Only
        // this.dummy += 1;
      }

      //mouse
      // mouse.position.copy(mouseV3);

      //rain
      for (let i = 0; i < this.rainCount; i++) {
        if (positions[3 * i + 1] > 0) {
          positions[3 * i + 1] -= 2;
        } else if (positions[3 * i + 1] > -10) {
          positions[3 * i + 1] = 250;
        }
      }
      this.rain.geometry.attributes.position.needsUpdate = true;
    });
  },
  unmounted() {
    // console.log(this.scene);
    this.disposeScene();
  },
  watch: {
    rainUnder(val, old) {
      const positions = this.rain.geometry.attributes.position.array;
      if (val > old) {
        const lessRain = val - old;
        for (let i = 0; i < lessRain; i++) {
          positions[3 * (this.rainUnder - lessRain + i) + 1] = -50;
        }
      } else {
        const moreRain = old - val;
        for (let i = 0; i < moreRain; i++) {
          positions[3 * (this.rainUnder + i) + 1] = Math.random() * 250;
        }
      }
      this.rain.geometry.attributes.position.needsUpdate = true;
    },
    skycolor(val, old) {
      this.$refs.light.light.color.set(val);
      const fog = this.$refs.scene.scene.fog;
      fog.color.set(this.skycolor);
      // this.water.material.uniforms['sunColor'].value = new THREE.Color(val);
    },
    groundcolor(val, old) {
      this.$refs.light.light.groundColor.set(val);
      this.$refs.sun.light.color.set(val);
      // this.water.material.uniforms['waterColor'].value = new THREE.Color(val);
    },
    sunHeight(val, old) {
      this.$refs.sun.light.position.y = val;
    },
    fogDistance(val, old) {
      this.$refs.scene.scene.fog.far = val;
    },
    opacity(val, old) {
      const imesh = this.$refs.imesh;
      // this.$refs.mouse.light.intensity = val * 0.1
      imesh.material.opacity = val;
      this.$refs.chimes.volume = val;
      if (val === 0) {
        imesh.mesh.visible = false;
      } else if (old === 0 && val > 0) {
        imesh.mesh.visible = true;
      }
    },
  },

  methods: {
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    },
    animateMesh() {
      const { pointer } = this.$refs.renderer.three;
      this.target.copy(pointer.positionV3);
      for (let i = 0; i < this.NUM_INSTANCES; i++) {
        const { position, scale, velocity, attraction, vlimit } =
          this.instances[i];
        this.dummyV
          .copy(this.target)
          .sub(position)
          .normalize()
          .multiplyScalar(attraction);
        velocity.add(this.dummyV).clampScalar(-vlimit, vlimit);
        position.add(velocity);
        this.dummyO.position.copy(position);
        this.dummyO.scale.set(scale, scale, scale);
        this.dummyO.lookAt(this.dummyV.copy(position).add(velocity));
        this.dummyO.updateMatrix();
        this.imesh.setMatrixAt(i, this.dummyO.matrix);
      }
      this.imesh.instanceMatrix.needsUpdate = true;
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

#index {
  height: 100%;
}
</style>
