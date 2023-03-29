<template>
  <div class="center1" id="index">
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
          :percentage="vPosition / 240"
          :show-indicator="false"
          style="width: 500px; bottom: 30px"
          class="absolute center"
        />
        <!--        <n-progress-->
        <!--          type="line"-->
        <!--          :height="6"-->
        <!--          :color="iconColor"-->
        <!--          :rail-color="skycolor"-->
        <!--          :percentage="vPosition / 240"-->
        <!--          :show-indicator="false"-->
        <!--          style="width: 500px; bottom: 30px"-->
        <!--          class="absolute center"-->
        <!--        />-->
      </div>
    </transition>
    <div id="three"></div>

    <!--    <audio ref="rainSound" loop>-->
    <!--      <source src="/assets/sounds/rain.wav" type="audio/wav" />-->
    <!--    </audio>-->
    <!--    <audio ref="chimes" loop>-->
    <!--      <source src="/assets/sounds/chimes.wav" type="audio/wav" />-->
    <!--    </audio>-->
    <!--    <audio ref="desertSound" loop>-->
    <!--      <source src="/assets/sounds/desert.wav" type="audio/wav" />-->
    <!--    </audio>-->
  </div>
  <!--  <div class="text"></div>-->
</template>

<script setup>
import * as THREE from "three";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { MathUtils, Object3D, Vector3 } from "three";
import { ref, computed, watch } from "vue";
import { NButton, NProgress } from "naive-ui";
import Loader from "./Loader.vue";
import IconGroup from "./IconGroup.vue";
import TextScroll from "./TextScroll.vue";
import DataList from "@/components/pages/statistic/DataList.vue";
import DataListMain from "@/components/pages/statistic/DataListMain.vue";
import { Pane } from "tweakpane";

const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import Stats from "three/addons/libs/stats.module";

import { onMounted, onUnmounted } from "vue";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader";
import { useRoute, useRouter } from "vue-router";

const props = defineProps(["itemIdx"]);

/*from setup() in Scene.vue*/
//Loading Manager
const percent = ref(0);
THREE.DefaultLoadingManager.onProgress = function (
  url,
  itemsLoaded,
  itemsTotal
) {
  percent.value = (itemsLoaded / itemsTotal) * 100;
};

let camera, scene, renderer;
let viewControls2;
let model = [];
let settings;
let composer, outlinePass, renderPass;
let element;
let stats;
let animateId;

let textBox;

let renderEnabled;
let timeOut = null;

let nowMouseOn = null;

//fps
let clock;
let renderT = 1 / 30;
let times = 0;

// value from scene.vue
let rain;
let hemiLight;
let pointLight1;
let instanceMesh;
let spotLight1;

const router = useRouter();

//verticle control
const [rainTime, nightTime, dawnTime, dayTime] = [6000, 8000, 4000, 6000]; // 持续时间
// TODO: Debug Only
// const [rainTime, nightTime, dawnTime, dayTime] = [0, 0, 0, 100000]; // 持续时间

const vPosition = ref(0);
// console.log(vPosition);
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
      1 - (vPosition.value - rainTime - (3 * nightTime) / 4) / (nightTime / 4)
    );
  } else {
    return 0;
  }
});

const rainUnder = computed(() =>
  Math.min(Math.floor((3000 * vPosition.value) / rainTime), 3000)
);

const fogDistance = computed(() => {
  if (vPosition.value > rainTime && vPosition.value < rainTime + nightTime) {
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
    Math.max((200 * (vPosition.value - rainTime - nightTime)) / dawnTime, 0),
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
// const rainSound = ref(null);
// const desertSound = ref(null);
// const chimes = ref(null);
const loaded = ref(true);
const initPage = () => {
  loaded.value = false;
  // rainSound.value.play();
  // desertSound.value.play();
  // chimes.value.play();
  // rainSound.value.volume = 1;
  // desertSound.value.volume = 0;
  // chimes.value.volume = 0;
};

// const rainVolume = computed(() => Math.max(1 - vPosition.value / rainTime, 0));
// // watch(rainVolume, (val, prev) => {
// //   rainSound.value.volume = val;
// // });
//
// const desertVolume = computed(() =>
//   Math.min(Math.max((vPosition.value - rainTime - nightTime) / dawnTime, 0), 1)
// );
// watch(desertVolume, (val, prev) => {
//   desertSound.value.volume = val;
// });

// const toggleSound = () => {
//   soundMuted.value = soundMuted.value ? false : true;
//   rainSound.value.muted = soundMuted.value;
//   desertSound.value.muted = soundMuted.value;
//   chimes.value.muted = soundMuted.value;
// };

// const soundMuted = ref(false);

//textures
const imageArray = Array(6).fill("/assets/skybox/sky.png");

const NUM_INSTANCES = 800;
const instances = [];
const target = new Vector3();
const dummyO = new Object3D();
const dummyV = new Vector3();
// for (let i = 0; i < NUM_INSTANCES; i++) {
//   instances.push({
//     position: new Vector3(rndFS(30), rndFS(30), rndFS(30)),
//     scale: 1,
//     velocity: new Vector3(rndFS(1.5), rndFS(1.5), rndFS(1.5)),
//     attraction: 0.03 + rnd(-0.01, 0.01),
//     vlimit: 1 + rnd(-0.1, 0.1),
//   });
// }

// watch ---Scene.vue
watch(rainUnder, (val, old) => {
  const positions = rain.geometry.attributes.position.array;
  if (val > old) {
    const lessRain = val - old;
    for (let i = 0; i < lessRain; i++) {
      positions[3 * (rainUnder - lessRain + i) + 1] = -50;
    }
  } else {
    const moreRain = old - val;
    for (let i = 0; i < moreRain; i++) {
      positions[3 * (rainUnder + i) + 1] = Math.random() * 250;
    }
  }
  rain.geometry.attributes.position.needsUpdate = true;
});
watch(skycolor, (val, old) => {
  hemiLight.color.set(val);
  // this.$refs.light.light.color.set(val);
  scene.fog.color.set(skycolor);
  // this.water.material.uniforms['sunColor'].value = new THREE.Color(val);
});
watch(groundcolor, (val, old) => {
  hemiLight.groundColor.set(val);
  pointLight1.color.set(val);
  // this.water.material.uniforms['waterColor'].value = new THREE.Color(val);
});
watch(sunHeight, (val, old) => {
  pointLight1.position.y = val;
});
watch(fogDistance, (val, old) => {
  scene.fog.far = val;
});
// watch(opacity, (val, old) => {
//   // const imesh = this.$refs.imesh;
//   // this.$refs.mouse.light.intensity = val * 0.1
//   instanceMesh.material.opacity = val;
//   chimes.value.volume = val;
//   if (val === 0) {
//     instanceMesh.mesh.visible = false;
//   } else if (old === 0 && val > 0) {
//     instanceMesh.mesh.visible = true;
//   }
// });

const lerp = (start, end, amt) => {
  return (1 - amt) * start + amt * end;
};
// const animateMesh = () => {
//   const { pointer } = this.$refs.renderer.three;
//   target.copy(pointer.positionV3);
//   for (let i = 0; i < NUM_INSTANCES; i++) {
//     const { position, scale, velocity, attraction, vlimit } =
//         this.instances[i];
//     dummyV
//         .copy(target)
//         .sub(position)
//         .normalize()
//         .multiplyScalar(attraction);
//     velocity.add(dummyV).clampScalar(-vlimit, vlimit);
//     position.add(velocity);
//     dummyO.position.copy(position);
//     dummyO.scale.set(scale, scale, scale);
//     dummyO.lookAt(dummyV.copy(position).add(velocity));
//     dummyO.updateMatrix();
//     imesh.setMatrixAt(i, dummyO.matrix);
//   }
//   this.imesh.instanceMatrix.needsUpdate = true;
// };

const loadGltfModelUsingDraco = (src, name, pos, scale, rota) => {
  const loader = new GLTFLoader();
  const dLoader = new DRACOLoader();
  dLoader.setDecoderPath("/draco/");
  dLoader.setDecoderConfig({ type: "js" }); //使用js方式解压
  dLoader.preload(); //初始化_initDecoder 解码器
  loader.setDRACOLoader(dLoader);
  loader.load(src, function (gltf) {
    // gltf.scene.traverse(function (child){
    //   child.castShadow = true;
    // })
    const temp = gltf.scene;
    temp.name = name;
    temp.position.set(pos[0], pos[1], pos[2]);
    temp.scale.set(scale[0], scale[1], scale[2]);
    temp.rotation.set(rota[0], rota[1], rota[2]);
    temp.castShadow = true;
    scene.add(temp);
    model.push(temp);
  });
};

function initScene() {
  // 设置fps
  clock = new THREE.Clock();

  // 创建场景
  element = document.getElementById("index");
  scene = new THREE.Scene();
  // scene.background = new THREE.Color("#000000");
  scene.fog = new THREE.Fog(skycolor, 1, 800);
  camera = new THREE.PerspectiveCamera(
    50,
    element.clientWidth / element.clientHeight,
    0.1,
    500
  );
  camera.position.set(85, 5, -50); // 相机的位置
  camera.lookAt(0, 75, 0);
  scene.add(camera);

  // 半球光
  hemiLight = new THREE.HemisphereLight(
    "rgb(1, 10, 26)",
    "rgb(7, 16, 33)",
    1.78
  );
  hemiLight.position.set(0, 100, 0);
  scene.add(hemiLight);

  // pointLight
  pointLight1 = new THREE.PointLight("rgb(7, 16, 33)", 0.13, 0, 0);
  pointLight1.castShadow = true;
  pointLight1.position.set(120, 20, 0);
  scene.add(pointLight1);

  // spotLight
  spotLight1 = new THREE.SpotLight("#555555", 5, 500, Math.PI / 2, 0, 0.5);
  spotLight1.position.y = 250;
  spotLight1.target.y = 500;
  scene.add(spotLight1);

  // let ambientLight = new THREE.AmbientLight(0xffffff); //设置环境光
  // scene.add(ambientLight); //将环境光添加到场景中

  const sphereGeo = new THREE.SphereGeometry(0.3);
  const basicMaterial = new THREE.MeshBasicMaterial({
    opacity: 0,
    transparent: true,
    color: "#ffffff",
  });
  instanceMesh = new THREE.InstancedMesh(
    sphereGeo,
    basicMaterial,
    NUM_INSTANCES
  );
  scene.add(instanceMesh);

  // // 平行光
  // const dirLight = new THREE.DirectionalLight(0xffffff);
  // // 平行光的位置
  // dirLight.position.set(-0, 40, 50);
  // // 是否显示阴影
  // dirLight.castShadow = true;
  // dirLight.shadow.camera.top = 50;
  // dirLight.shadow.camera.bottom = -25;
  // dirLight.shadow.camera.left = -25;
  // dirLight.shadow.camera.right = 25;
  // dirLight.shadow.camera.near = 0.1;
  // dirLight.shadow.camera.far = 200;
  // dirLight.shadow.mapSize.set(1024, 1024);
  // scene.add(dirLight);

  // 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  const canvasFrame = document.querySelector("#three");
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(element.clientWidth, element.clientHeight);
  // renderer.outputEncoding = THREE.sRGBEncoding;
  // 是否允许阴影贴图
  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  canvasFrame.appendChild(renderer.domElement);

  // stats = new Stats();
  // element.appendChild(stats.dom);

  // 地面

  // 添加鼠标控制
  // viewControls2 = new OrbitControls(camera, renderer.domElement);
  // // 开启阻尼
  // viewControls2.enableDamping = true;
  // // 阻尼系数
  // viewControls2.dampingFactor = 0.25;
  // // 开启缩放
  // viewControls2.enableZoom = true;
  // // 自动旋转
  // viewControls2.autoRotate = true;
  // // 开启鼠标右键拖拽
  // viewControls2.enablePan = true;
  // // 相机离原点的最远距离
  // viewControls2.maxDistance = 1000;

  // plane
  const plane = new THREE.PlaneGeometry(800, 800, 64, 64);
  const loader = new THREE.TextureLoader();
  const planeTexture = loader.load("/assets/textures/green3c5942.png");
  const planeDisplacement = loader.load("/assets/textures/Background.png");

  const planeMaterial = new THREE.MeshStandardMaterial({
    map: planeTexture,
    displacementMap: planeDisplacement,
  });

  plane.reciveShadow = true;
  const ground = new THREE.Mesh(plane, planeMaterial);
  ground.position.set(-32.61, -13.35, 8.7);
  ground.rotation.set(-Math.PI / 2, 0, 0);
  scene.add(ground);

  // models
  let tempPos = [-73.61, -28.91, -32.61];
  let tempScale = [45, 45, 45];
  let constRota = [0, 0, 0];
  loadGltfModelUsingDraco(
    "/static/mountain.glb",
    "mountain",
    tempPos,
    tempScale,
    constRota
  );
  tempPos = [56.52, 2.17, -43.48];
  tempScale = [15, 15, 15];
  constRota = [0, 0, 0];
  loadGltfModelUsingDraco(
    "/static/solar/newSolarStat.glb",
    "newSolarStat",
    tempPos,
    tempScale,
    constRota
  );
  tempPos = [32.61, 2.17, -43.48];
  tempScale = [10, 10, 10];
  constRota = [0, 2.93, 0];
  loadGltfModelUsingDraco(
    "/static/solar/board.glb",
    "board",
    tempPos,
    tempScale,
    constRota
  );
  tempPos = [65.22, 2.17, -26.09];
  tempScale = [10, 10, 10];
  constRota = [0, 1.2, 0];
  loadGltfModelUsingDraco(
    "/static/solar/board.glb",
    "board1",
    tempPos,
    tempScale,
    constRota
  );
  tempPos = [71.74, 2.17, -17.39];
  tempScale = [10, 10, 10];
  constRota = [0, 1.2, 0];
  loadGltfModelUsingDraco(
    "/static/solar/board.glb",
    "board2",
    tempPos,
    tempScale,
    constRota
  );
  tempPos = [73.91, 2.6, -6.52];
  tempScale = [10, 10, 10];
  constRota = [0, 1.15, 0];
  loadGltfModelUsingDraco(
    "/static/solar/board.glb",
    "board3",
    tempPos,
    tempScale,
    constRota
  );
  // const loader2 = new GLTFLoader();
  // const dLoader2 = new DRACOLoader();
  // dLoader2.setDecoderPath("/draco/");
  // dLoader2.setDecoderConfig({ type: "js" }); //使用js方式解压
  // dLoader2.preload(); //初始化_initDecoder 解码器
  // loader2.setDRACOLoader(dLoader2);
  // loader2.load("/static/solarPS_compress.glb", function (gltf) {
  //   const temp = gltf.scene;
  //   temp.name = "能源月报";
  //   temp.position.set(32, 2, -43);
  //   temp.scale.set(20, 20, 20);
  //   temp.castShadow = true;
  //   scene.add(temp);
  //   model.push(temp);
  // });

  //skybox ---Scene.vue
  let texture = [];
  let material = [];
  imageArray.forEach((el) => texture.push(new THREE.TextureLoader().load(el)));
  texture.forEach((el) =>
    material.push(new THREE.MeshStandardMaterial({ map: el }))
  );
  for (let i = 0; i < 6; i++) material[i].side = THREE.BackSide;
  let skyboxGeo = new THREE.BoxGeometry(5000, 5000, 5000);
  let skybox = new THREE.Mesh(skyboxGeo, material);
  scene.add(skybox);

  //mouse ---Scene.vue
  // const mouse = this.$refs.mouse.light;
  // this.pointer = this.renderer.three.pointer;
  // const mouseV3 = this.pointer.positionV3;

  // rain ---Scene.vue
  const rainMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.1,
    transparent: true,
  });

  const rainCount = 3000;
  const rainGeo = new THREE.BufferGeometry();
  let rainVert = new Float32Array(rainCount * 3);
  for (let i = 0; i < rainCount; i++) {
    (rainVert[i * 3] = Math.random() * 400 - 200),
      (rainVert[i * 3 + 1] = Math.random() * 250),
      (rainVert[i * 3 + 2] = Math.random() * 400 - 200);
  }
  rainGeo.setAttribute("position", new THREE.BufferAttribute(rainVert, 3));
  rain = new THREE.Points(rainGeo, rainMaterial);
  scene.add(rain);
  const positions = rain.geometry.attributes.position.array;

  //particles ---Scene.vue
  // this.pointerV3 = new THREE.Vector3();
  // this.imesh = this.$refs.imesh.mesh;
  // this.imesh.visible = false;
  // for (let i = 0; i < NUM_INSTANCES; i++) {
  //   const { position, scale } = instances[i];
  //   dummyO.position.copy(position);
  //   dummyO.scale.set(scale, scale, scale);
  //   dummyO.updateMatrix();
  //   this.imesh.setMatrixAt(i, dummyO.matrix);
  // }
  // this.imesh.instanceMatrix.needsUpdate = true;

  // let mesh;

  //ANIMATION LOOP ---Scene.vue
  // scene.onBeforeRender(() => {
  //   // water.material.uniforms[ 'time' ].value += 0.7 / 60.0;
  //
  //
  //   //mouse
  //   // mouse.position.copy(mouseV3);
  //
  //   // //rain
  //   // for (let i = 0; i < rainCount; i++) {
  //   //   if (positions[3 * i + 1] > 0) {
  //   //     positions[3 * i + 1] -= 2;
  //   //   } else if (positions[3 * i + 1] > -10) {
  //   //     positions[3 * i + 1] = 250;
  //   //   }
  //   // }
  //   // rain.geometry.attributes.position.needsUpdate = true;
  // });

  animate();
}

function animate() {
  if (vPosition.value > 2400) {
    camera.position.x = Math.cos((vPosition.value - 2400) / 3000) * 150;
    camera.position.z = Math.sin((vPosition.value - 2400) / 3000) * 200;
  }

  if (vPosition.value < 2000) {
    camera.position.set(
      (-150 * vPosition.value) / 2000 + 300,
      (-40 * vPosition.value) / 2000 + 100 + mouseY.value,
      (-100 * vPosition.value) / 2000 + 100
    );
    camera.lookAt(
      0,
      35 - (15 * vPosition.value) / 2000,
      (-30 * vPosition.value) / 2000
    );
  } else if (vPosition.value < 2400) {
    camera.position.y = 60 + mouseY.value;
    camera.lookAt(0, 20, -30 - (20 * (vPosition.value - 2000)) / 400);
  } else if (vPosition.value < 9000) {
    camera.position.y =
      60 + 40 * ((vPosition.value - 2400) / 6600) + mouseY.value;
    camera.lookAt(
      (30 * (vPosition.value - 2400)) / 6600,
      20,
      -50 + (80 * (vPosition.value - 2400)) / 6600
    );
  } else if (vPosition.value < 12000) {
    camera.position.y =
      100 - (50 * (vPosition.value - 9000)) / 3000 + mouseY.value;
    camera.lookAt(30, 20 - (20 * (vPosition.value - 9000)) / 3000, 30);
  } else if (vPosition.value < 14000) {
    camera.lookAt(
      30 - (30 * (vPosition.value - 12000)) / 2000,
      0,
      30 - (30 * (vPosition.value - 12000)) / 2000
    );
    camera.position.y =
      50 + (20 * (vPosition.value - 12009)) / 2000 + mouseY.value;
  } else if (vPosition.value < 18000) {
    camera.lookAt(0, (20 * (vPosition.value - 14000)) / 4000, 0);
    camera.position.y = 70 + mouseY.value;
  } else {
    camera.lookAt(0, 20, 0);
    camera.position.y = 70 + mouseY.value;
  }

  vPosition.value = lerp(vPosition.value, dummy.value, 0.1); // ?
  // if (this.opacity > 0) {
  //   // animateMesh();
  // }
  if (!loaded.value) {
    // 缓慢推进
    dummy.value += 1;
  }
  animateId = requestAnimationFrame(animate);
  render();
  // stats.update();
}

function render() {
  renderer.render(scene, camera);
  // if (composer) {
  //   composer.render();
  // }
}

function mouseMoveEvent(event) {
  //获取在射线上的接触点
  //获取鼠标坐标
  let marginLeft = window.innerWidth * 0.1;
  let marginTop = 58;
  let mouse = new THREE.Vector2();
  let raycaster = new THREE.Raycaster();
  mouse.x = ((event.clientX - marginLeft) / element.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - marginTop) / element.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    let selectedObj = intersects[0].object;
    let temp;
    for (
      temp = selectedObj;
      temp.parent.type !== "Scene";
      temp = temp.parent
    ) {}
    console.log(temp);
    outlineObj([temp]);
    textBox.style.display = "inline-block";
    textBox.style.left = transPosition(temp).x + "px";
    textBox.style.top = transPosition(temp).y + "px";
    textBox.innerHTML = temp.name;
    nowMouseOn = temp.name;
  } else {
    textBox.style.display = "none";
    nowMouseOn = null;
  }
}

function clickEvent(event) {
  enterPage(nowMouseOn);
}

//高亮显示模型（呼吸灯）
function outlineObj(selectedObjects) {
  // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
  composer = new EffectComposer(renderer);
  composer.renderTarget1.texture.encoding = THREE.sRGBEncoding;
  composer.renderTarget2.texture.encoding = THREE.sRGBEncoding;
  // 新建一个场景通道  为了覆盖到原理来的场景上
  renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  // 物体边缘发光通道
  outlinePass = new OutlinePass(
    new THREE.Vector2(element.clientWidth, element.clientHeight),
    scene,
    camera,
    selectedObjects
  );
  outlinePass.selectedObjects = selectedObjects;
  outlinePass.edgeStrength = 100.0; // 边框的亮度
  outlinePass.edgeGlow = 2; // 光晕[0,1]
  outlinePass.usePatternTexture = false; // 是否使用父级的材质
  outlinePass.edgeThickness = 1.0; // 边框宽度
  outlinePass.downSampleRatio = 1; // 边框弯曲度
  outlinePass.pulsePeriod = 5; // 闪烁的速度
  outlinePass.visibleEdgeColor.set(parseInt(0xffffff)); // 呼吸显示的颜色
  outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0); // 呼吸消失的颜色
  outlinePass.clear = true;
  composer.addPass(outlinePass);
  // 自定义的着色器通道 作为参数
  let effectFXAA = new ShaderPass(FXAAShader);
  effectFXAA.uniforms.resolution.value.set(
    1 / element.clientWidth,
    1 / element.clientHeight
  );
  effectFXAA.renderToScreen = true;
  composer.addPass(effectFXAA);
  // 修正颜色
  const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
  composer.addPass(gammaCorrectionPass);

  // model[0].scale.set(1.2, 1.2, 1.2);
}

//三维坐标转屏幕坐标的方法
function transPosition(position) {
  let world_vector = new THREE.Vector3(position.x, position.y, position.z);
  let vector = world_vector.project(camera);
  let halfWidth = element.clientWidth / 2,
    halfHeight = element.clientHeight / 2;
  return {
    x: Math.round(vector.x * halfWidth + halfWidth),
    y: Math.round(-vector.y * halfHeight + halfHeight),
  };
}

function enterPage(name) {
  if (name === "能源概览") {
    router.push("/overview");
  } else if (name === "热力图") {
    router.push("/heatmap");
  } else if (name === "能源月报") {
    router.push("/statistic");
  }
}

// function timeRender() {
//   //设置为可渲染状态
//   renderEnabled = true;
//   //清除上次的延迟器
//   if (timeOut) {
//     clearTimeout(timeOut);
//   }
//   timeOut = setTimeout(function () {
//     renderEnabled = false;
//   }, 3000);
// }

function disposeScene() {
  removeModel(null, scene);

  // scene.background.dispose();
  viewControls2.dispose();
  //处理当前的渲染环境
  renderer.dispose();

  //模拟WebGL环境的丢失。
  renderer.forceContextLoss();
  //在内部用于处理场景渲染对象的排序注销
  renderer.renderLists.dispose();
  //renderer的渲染容器删除
  renderer.domElement = null;
  //释放renderer变量的内存
  renderer = null;
  //清除所有缓存中的值。
  THREE.Cache.clear();
  scene.remove();

  camera = null;
  scene = null;
  renderer = null;
  viewControls2 = null;
  model = null;
  composer = null;
  outlinePass = null;
  renderPass = null;
  element = null;
  stats = null;

  cancelAnimationFrame(animateId);
  animateId = null;
}

function removeModel(parent, child) {
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
    o;
    child.material.dispose();
  }
  child.remove();
  if (parent) {
    parent.remove(child);
  }
}

onMounted(() => {
  initScene();
  window.addEventListener("wheel", (e) => {
    if (loaded) onScroll(e);
  });
  // window.addEventListener("mousemove", () => {
  //   onMove();
  // });
  window.addEventListener("resize", (event) => {
    renderer.setSize(element.clientWidth, element.clientHeight);
    // camera.aspect = element.clientWidth / element.clientHeight;
    camera.updateProjectionMatrix();
    // timeRender();
  });
});
onUnmounted(() => {
  disposeScene();
});
</script>

<style scoped>
.center1 {
  height: 750px;
  margin: 0 auto;
}

/* 文字提示框样式 */
/*.text {*/
/*  display: none;*/
/*  box-shadow: 0 0 5px rgb(138, 138, 138);*/
/*  padding: 10px;*/
/*  position: relative;*/
/*  !*font-weight: bold;*!*/
/*  background: rgba(255, 255, 255, 0.747);*/
/*}*/
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
</style>
