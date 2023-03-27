<template>
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
        Here are some ways to improve your browser's performance on 3D websites.
        If you have a dedicated GPU, configure your browser accordingly:
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

  <!--  <Menu :vPosition="vPosition" :soundMuted="soundMuted" @toggleSound="toggleSound"/>-->

  <Renderer
    ref="renderer"
    pointer
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
      <!--      mouse point light-->
      <!--      <PointLight-->
      <!--        ref="mouse"-->
      <!--        :intensity="0"-->
      <!--        cast-shadow>-->
      <!--        <Sphere :radius="1"/>-->
      <!--      </PointLight>-->

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
      <PointLight
          ref="light1"
          color="rgb(20, 20, 100)"
          :intensity="1.00"
          :position="{ x: -120, y: 20 }"
          :decay="0.5"
          cast-shadow
      />

<!--      <SpotLight-->
<!--          color="#555555"-->
<!--          :distance="500"-->
<!--          :angle="Math.PI / 2"-->
<!--          :decay="0.5"-->
<!--          :intensity="1"-->
<!--          :position="{ y: 500 }"-->
<!--          :target="{ y: 30 }"-->
<!--      />-->

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
        src="/static/mountain.glb"
        dracoPath="/draco/"
        :scale="{ x: 45, y: 45, z: 45 }"
        :position="{ x: mountainX, y: mountainY, z: mountainZ }"
      />
      <GltfModel
        src="/static/newSolarStat.glb"
        dracoPath="/draco/"
        :scale="{ x: 20, y: 20, z: 20 }"
        :position="{ x: solarBuildingX, y: solarBuildingY, z: solarBuildingZ }"
      />
      <GltfModel
          src="/static/tree2.glb"
          dracoPath="/draco/"
          v-for="item in tree"
          :position="item.position"
          :rotation="{ y: item.rotation }"
          :scale="{ x: item.scale * 300, y: item.scale * 300, z: item.scale * 300 }"
      />

      <!--      <GltfModel-->
      <!--          src="/static/nuclearPS_compress.glb"-->
      <!--          dracoPath="/draco/"-->
      <!--          :position="tree[0].position"-->
      <!--          :scale="{x: 10, y: 10, z: 10}"/>-->

      <GltfModel
        src="/assets/models/plants/tree.glb"
        v-for="item in tree"
        :position="item.position"
        :rotation="{ y: item.rotation }"
        :scale="{ x: item.scale, y: item.scale, z: item.scale }"
      />

      <GltfModel
        src="/assets/models/plants/cactus.glb"
        v-for="item in cactus"
        :position="item.position"
        :rotation="{ y: item.rotation }"
        :scale="{ x: item.scale, y: item.scale, z: item.scale }"
      />

      <GltfModel
        src="/assets/models/plants/agave.glb"
        v-for="item in agave"
        :position="item.position"
        :rotation="{ y: item.rotation }"
        :scale="{ x: item.scale, y: item.scale, z: item.scale }"
      />

      <GltfModel
        src="/assets/models/plants/bushjr.glb"
        v-for="item in bush"
        :position="item.position"
        :rotation="{ y: item.rotation }"
        :scale="{ x: item.scale, y: item.scale, z: item.scale }"
      />
      <GltfModel
        src="/assets/models/plants/cactus-ball.glb"
        v-for="item in cactusBall"
        :position="item.position"
        :rotation="{ y: item.rotation }"
        :scale="{ x: item.scale, y: item.scale, z: item.scale }"
      />

      <GltfModel
        src="/assets/models/plants/blob.glb"
        v-for="item in grass"
        :position="item"
        :rotation="{ y: Math.random() * 360 }"
        :scale="{ x: 2, y: 2, z: 2 }"
      />
      <GltfModel
        src="/assets/models/plants/line.glb"
        v-for="item in line"
        :position="item.position"
        :rotation="{ y: item.rotation }"
        :scale="{ x: 2, y: 2, z: 2 }"
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
        :position="{ x: planeX, y: planeY, z: planeZ }"
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
</template>

<script>
import * as THREE from "three";
import { MathUtils, Object3D, Vector3 } from "three";
import { ref, computed, watch } from "vue";
import { NButton, NProgress } from "naive-ui";
import { Water } from "three/examples/jsm/objects/Water.js";
import Loader from "./Loader.vue";
import IconGroup from "./IconGroup.vue";
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
    IconGroup,
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

    //verticle control
    const [rainTime, nightTime, dawnTime, dayTime] = [6000, 8000, 4000, 6000]; // 持续时间

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

    //plants

    const tree = [
      { position: { x: 0, y: 1, z: -60 }, scale: 0.2, rotation: 0 },
      { position: { x: -57, y: 1.5, z: -20 }, scale: 0.25, rotation: 0.9 },
      { position: { x: -25, y: 1.5, z: 55 }, scale: 0.2, rotation: 3 },
      { position: { x: 60, y: 3.5, z: 30 }, scale: 0.16, rotation: 3.14 },
    ];
    const cactus = [
      { position: { x: -60, y: 2.5, z: 8 }, scale: 0.18, rotation: 0.7 },
      { position: { x: -25, y: 7, z: -70 }, scale: 0.17, rotation: 2.5 },
    ];

    const agave = [
      { position: { x: 20, y: 5, z: 65 }, scale: 0.5, rotation: 1.3 },
      { position: { x: 25, y: 6, z: -66 }, scale: 0.4, rotation: 0 },
      { position: { x: -50, y: 6, z: 45 }, scale: 0.4, rotation: 2 },
    ];
    const bush = [
      { position: { x: 65, y: 5.5, z: 6 }, scale: 20, rotation: 3 },
      { position: { x: -6, y: 7, z: -80 }, scale: 16, rotation: 0 },
      { position: { x: -60, y: 7, z: 30 }, scale: 18, rotation: 2 },
    ];
    const cactusBall = [
      { position: { x: 40, y: 2.5, z: -45 }, scale: 0.4, rotation: 0 },
      { position: { x: -45, y: 4, z: -40 }, scale: 0.35, rotation: 1 },
      { position: { x: 0, y: 4, z: 65 }, scale: 0.35, rotation: 2 },
    ];
    const grass = [
      { x: 65, y: 6, z: 25 },
      { x: 64, y: 6, z: 35 },
      { x: 56, y: 6, z: 40 },
      { x: -20, y: 5, z: 65 },
      { x: -13, y: 3, z: 62 },
      { x: -35, y: 7, z: 60 },
      { x: 30, y: 3, z: 52 },
      { x: 35, y: 3, z: 48 },
      { x: 11, y: 2, z: -56 },
      { x: -11, y: 2, z: -56 },
      { x: -60, y: 1.5, z: -4 },
      { x: -54, y: 3, z: -30 },
      { x: -35, y: 4, z: -53 },
    ];
    const line = [
      { position: { x: 52, y: 2.6, z: -22 }, rotation: 1.9 },
      { position: { x: -43, y: -0.2, z: 35 }, rotation: 2.1 },
    ];

    // pane
    const solarBuildingX = ref(-100);
    const solarBuildingY = ref(-30);
    const solarBuildingZ = ref(10);
    const mountainX = ref(-73.61);
    const mountainY = ref(-28.91);
    const mountainZ = ref(-32.61);
    const planeX = ref(-32.61);
    const planeY = ref(-13.35);
    const planeZ = ref(8.7);

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
      //plants
      tree,
      cactus,
      agave,
      bush,
      cactusBall,
      grass,
      line,
      //texture
      imageArray,
      rainCount: 3000,

      // pane
      solarBuildingX,
      solarBuildingY,
      solarBuildingZ,
      mountainX,
      mountainY,
      mountainZ,
      planeX,
      planeY,
      planeZ,
    };
  },
  mounted() {
    // pane
    this.pane = new Pane();
    this.pane.addInput(this, "solarBuildingX", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBuildingY", { min: -100, max: 100 });
    this.pane.addInput(this, "solarBuildingZ", { min: -100, max: 100 });
    this.pane.addInput(this, "mountainX", { min: -100, max: 100 });
    this.pane.addInput(this, "mountainY", { min: -100, max: 100 });
    this.pane.addInput(this, "mountainZ", { min: -100, max: 100 });
    this.pane.addInput(this, "planeX", { min: -100, max: 100 });
    this.pane.addInput(this, "planeY", { min: -100, max: 100 });
    this.pane.addInput(this, "planeZ", { min: -100, max: 100 });

    //scene core
    const renderer = this.$refs.renderer;
    const scene = this.$refs.scene.scene;
    this.camera = this.$refs.camera.camera;
    scene.fog = new THREE.Fog(this.skycolor, 1, 800);


    // Set window size
    let element = document.getElementById('index');
    renderer.three.setSize(element.clientWidth, element.clientHeight);
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
    scene.add(skybox);

    //mouse
    // const mouse = this.$refs.mouse.light;
    this.pointer = renderer.three.pointer;
    const mouseV3 = this.pointer.positionV3;

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
    scene.add(this.rain);
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

    //water
    // const waterGeometry = new THREE.CircleGeometry( 50, 100);
    // const water = new Water(
    //     waterGeometry,
    //     {
    //       textureWidth: 1000,
    //       textureHeight: 1000,
    //       waterNormals: new THREE.TextureLoader().load( '/assets/textures/water.jpg', function ( texture ) {
    //         texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //       } ),
    //       waterColor: this.groundcolor,
    //       sunColor: this.skycolor,
    //       distortionScale: 4.8,
    //       fog: scene.fog !== undefined
    //     }
    //   )
    // this.water = water
    // water.rotation.x = - Math.PI / 2;
    // scene.add( water );
    let mesh;

    //ANIMATION LOOP
    renderer.onBeforeRender(() => {
      // water.material.uniforms[ 'time' ].value += 0.7 / 60.0;
      if (this.vPosition > 2400) {
        this.camera.position.x = Math.cos((this.vPosition - 2400) / 3000) * 150;
        this.camera.position.z = Math.sin((this.vPosition - 2400) / 3000) * 200;
      }

      if (this.vPosition < 2000){
        this.camera.position.set(-150 * this.vPosition/2000 + 300, -40 * this.vPosition/2000 + 100 + this.mouseY, -100 * this.vPosition/2000 + 100)
        this.camera.lookAt(0, 35 - 15 * this.vPosition/2000, -30 * this.vPosition/2000)
      } else if (this.vPosition < 2400){
        this.camera.position.y = 60 + this.mouseY
        this.camera.lookAt(0, 20,  - 30 - 20 * (this.vPosition - 2000)/400)
      } else if (this.vPosition < 9000){
        this.camera.position.y = 60 + 40 * ((this.vPosition - 2400)/6600) + this.mouseY
        this.camera.lookAt(30 * (this.vPosition - 2400)/6600, 20, - 50 + 80 * (this.vPosition - 2400)/6600)
      } else if (this.vPosition < 12000){
        this.camera.position.y = 100 - 50 * (this.vPosition - 9000)/3000 + this.mouseY
        this.camera.lookAt(30, 20 - 20 * (this.vPosition - 9000)/3000 , 30)
      } else if (this.vPosition < 14000){
        this.camera.lookAt(30 - 30 * (this.vPosition - 12000)/2000, 0, 30 - 30 * (this.vPosition - 12000)/2000)
        this.camera.position.y = 50 + 20 * (this.vPosition - 12009)/2000 + this.mouseY
      } else if (this.vPosition < 18000 ){
        this.camera.lookAt(0, 20 * (this.vPosition - 14000)/4000, 0)
        this.camera.position.y = 70 + this.mouseY
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
        this.dummy += 1;
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
