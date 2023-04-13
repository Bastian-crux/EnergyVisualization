<template>
  <!--  选址-->
  <div v-for="item in points">
    <div class="point" :class="item.name" @click="clickPoint(item)">
      <div class="label">+</div>
    </div>
  </div>

  <!--  选择发电站-->
  <div
    class="absolute background"
    style="
      color: #464646;
      width: 200px;
      right: 10px;
      top: 10px;
      border-radius: 5px;
    "
  >
    <h1 style="font-size: 20px; text-align: center">发电站列表</h1>
    <el-tooltip
      v-for="item in buildings"
      :content="
        powerStationTooltip(
          item.name,
          pollutionIndex[item.name],
          capacityIndex[item.name],
          constructionCost[item.name],
          money
        )
      "
      hide-after="10"
      placement="left"
      effect="light"
      raw-content
      popper-class="eltooltip-background"
    >
      <div>
        <button
          class="buildingList"
          style="width: 95%; margin: 3px auto"
          :class="
            grab || !gameInProgress || constructionCost[item.name] >= money
              ? 'grab'
              : ''
          "
          :disabled="
            grab || !gameInProgress || constructionCost[item.name] >= money
          "
          @click="addBuilding(item)"
        >
          <div class="choose" style="display: flex; justify-content: center">
            <img
              :src="item.file"
              style="width: 65%; height: 65%; border-radius: 5px"
            />
          </div>
        </button>
      </div>
    </el-tooltip>
  </div>

  <!--  左侧信息面板-->
  <div
    class="absolute panelBackground"
    style="
      color: #464646;
      width: 200px;
      left: 10px;
      top: 10px;
      border-radius: 5px;
    "
  >
    <h1 style="font-size: 20px; text-align: center">
      游戏信息
      <font-awesome-icon
        class="infoButton"
        :icon="['fas', 'circle-info']"
        size="xs"
        @click="gamePrompt"
      />
    </h1>
    <el-row :gutter="5" class="game-panel" justify="center">
      <el-col :span="4">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'star']" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="name">当前关卡</div>
      </el-col>
      <el-col :span="10">
        <div class="value">{{ level }}</div>
      </el-col>
    </el-row>

    <el-row :gutter="5" class="game-panel" justify="center">
      <el-col :span="4">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'coins']" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="name">剩余资金</div>
      </el-col>
      <el-col :span="10">
        <div class="value">₡ {{ Math.round(money) }}</div>
      </el-col>
    </el-row>
    <el-row :gutter="5" class="game-panel" justify="center">
      <el-col :span="4">
        <div class="icon">
          <font-awesome-icon :icon="['fa', 'money-bill-trend-up']" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="name">每日收益</div>
      </el-col>
      <el-col :span="10">
        <div class="value" :class="profit > 0 ? 'green' : 'red'">
          ₡ {{ Math.round(profit) }}
        </div>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="5" class="game-panel" justify="center">
      <el-col :span="4">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'clock']" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="name">当前时间</div>
      </el-col>
      <el-col :span="10">
        <div class="value">
          {{ Math.round(timePassed / 24) }} / {{ timeTarget }} (天)
        </div>
      </el-col>
    </el-row>
    <div style="text-align: center">
      <el-progress
        :width="85"
        :stroke-width="10"
        :percentage="timePercentage"
        :show-text="false"
        color="#5cb87a"
      ></el-progress>
    </div>
    <el-divider />

    <el-row :gutter="10" class="game-panel" justify="center">
      <el-col :span="3">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'bolt']" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="name" style="font-size: 10px">发电功率</div>
      </el-col>
      <el-col :span="2"> </el-col>
      <el-col :span="3">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'smog']" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="name" style="font-size: 10px">污染指数</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="game-panel" justify="center">
      <el-col :span="12">
        <div class="circleBox">
          <el-progress
            :width="85"
            :stroke-width="10"
            stroke-linecap="square"
            type="circle"
            :percentage="powerPercentage"
            :show-text="false"
            color="#e6a23c"
          />
          <div class="textCenter">
            <div style="color: #e6a23c">{{ Math.round(power) }}MW</div>
            <span style="">/ {{ powerTarget }}MW</span>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="circleBox">
          <el-progress
            :width="85"
            :stroke-width="10"
            stroke-linecap="square"
            type="circle"
            :percentage="pollutionPercentage"
            :show-text="false"
            color="#f56c6c"
          />
          <div class="textCenter">
            <div style="color: #f56c6c">{{ pollution }}</div>
            <span>/ {{ pollutionTarget }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="text-align: center">
      <el-button @click="newGame">新游戏</el-button>
    </div>
  </div>

  <!--  提示框-->
  <div></div>

  <div class="center" id="index">
    <div id="three"></div>
  </div>
</template>

<script setup>
import * as THREE from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import Stats from "three/addons/libs/stats.module";

import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";

import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader";
import { ElMessage, ElMessageBox } from "element-plus";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { powerStationTooltip, gameTutorial } from "@/utils";

import { Sky } from "three/examples/jsm/objects/Sky.js";
import { BoxBufferGeometry } from "three";

const props = defineProps(["itemIdx"]);
let camera, scene, renderer;
let models = [];
let modelInstances = [];
let composer, outlinePass, renderPass;
let viewControls2;
let element;

let selectedModel;
let addModelMessage;

let animateId;

// Game related parameters
let timer = null;
let gameInProgress = false;
let generatorList = [];
// Capacity of each generator
const nuclearCapacity = 1000;
const windCapacity = 700;
const solarCapacity = 400;
const smallFossilCapacity = 1000;
const largeFossilCapacity = 3000;
// Price of electricity each Watt
const electricityPrice = 3;
// Generator conpacity index
const capacityIndex = {
  nuclear: nuclearCapacity,
  wind: windCapacity,
  solar: solarCapacity,
  smallFossil: smallFossilCapacity,
  largeFossil: largeFossilCapacity,
};
// Generator construction cost
const constructionCost = {
  nuclear: 200000,
  wind: 100000,
  solar: 50000,
  smallFossil: 100000,
  largeFossil: 250000,
};
// Generator maintenance cost
const maintenanceCost = {
  nuclear: 1.2,
  wind: 0.3,
  solar: 0.3,
  smallFossil: 1.1,
  largeFossil: 1,
};
// Generator penalty cost
const penaltyCost = {
  nuclear: 0,
  wind: 0,
  solar: 0,
  smallFossil: 0.9,
  largeFossil: 1.5,
};
const pollutionIndex = {
  nuclear: 0,
  wind: 0,
  solar: 0,
  smallFossil: 40,
  largeFossil: 80,
};

// Game related computed variables
const level = ref(1);
const money = ref(80000);
const profit = ref(0);
const timePassed = ref(0);
const timeTarget = ref(7);
const power = ref(0);
const powerTarget = ref(2000);
const pollution = ref(0);
const pollutionTarget = ref(80);

const timePercentage = computed(() => {
  return (timePassed.value / (24 * timeTarget.value)) * 100;
});

const powerPercentage = computed(() => {
  return (power.value / powerTarget.value) * 100;
});

const pollutionPercentage = computed(() => {
  return (pollution.value / pollutionTarget.value) * 100;
});

const grab = ref(false);

const points = ref([
  {
    name: "point-0",
    position: new THREE.Vector3(0, 1.5, -1),
    element: null,
    placed: false,
    energyProfile: {
      nuclear: nuclearCapacity,
      wind: windCapacity,
      solar: solarCapacity,
      smallFossil: smallFossilCapacity,
      largeFossil: largeFossilCapacity,
      fossilPenalty: 1.25,
    },
  },
  {
    name: "point-1",
    position: new THREE.Vector3(6, 1.2, 3),
    element: null,
    placed: false,
    energyProfile: {
      nuclear: 0.9 * nuclearCapacity,
      wind: 0.9 * windCapacity,
      solar: 0.8 * solarCapacity,
      smallFossil: smallFossilCapacity,
      largeFossil: largeFossilCapacity,
      fossilPenalty: 1.5,
    },
  },
  {
    name: "point-2",
    position: new THREE.Vector3(9, 2, -3),
    element: null,
    placed: false,
    energyProfile: {
      nuclear: 0.7 * nuclearCapacity,
      wind: 0.9 * windCapacity,
      solar: 0.9 * solarCapacity,
      smallFossil: smallFossilCapacity,
      largeFossil: largeFossilCapacity,
      fossilPenalty: 1.1,
    },
  },
  {
    name: "point-3",
    position: new THREE.Vector3(-3, 3, 3),
    element: null,
    placed: false,
    energyProfile: {
      nuclear: nuclearCapacity,
      wind: windCapacity,
      solar: 0.9 * solarCapacity,
      smallFossil: smallFossilCapacity,
      largeFossil: largeFossilCapacity,
      fossilPenalty: 1.25,
    },
  },
  {
    name: "point-4",
    position: new THREE.Vector3(-3, 3.8, -10),
    element: null,
    placed: false,
    energyProfile: {
      nuclear: nuclearCapacity,
      wind: 0.8 * windCapacity,
      solar: solarCapacity,
      smallFossil: smallFossilCapacity,
      largeFossil: largeFossilCapacity,
      fossilPenalty: 1,
    },
  },
  {
    name: "point-5",
    position: new THREE.Vector3(7, 1.2, 10),
    element: null,
    placed: false,
    energyProfile: {
      nuclear: 0.8 * nuclearCapacity,
      wind: 0.7 * windCapacity,
      solar: 0.8 * solarCapacity,
      smallFossil: smallFossilCapacity,
      largeFossil: largeFossilCapacity,
      fossilPenalty: 2,
    },
  },
  {
    name: "point-6",
    position: new THREE.Vector3(7.5, 1.5, -7.5),
    element: null,
    placed: false,
    energyProfile: {
      nuclear: 0.7 * nuclearCapacity,
      wind: 0.9 * windCapacity,
      solar: solarCapacity,
      smallFossil: smallFossilCapacity,
      largeFossil: largeFossilCapacity,
      fossilPenalty: 1,
    },
  },
  {
    name: "point-7",
    position: new THREE.Vector3(0, 3.8, -13),
    element: null,
    placed: false,
    energyProfile: {
      nuclear: 0.8 * nuclearCapacity,
      wind: 0.8 * windCapacity,
      solar: solarCapacity,
      smallFossil: smallFossilCapacity,
      largeFossil: largeFossilCapacity,
      fossilPenalty: 1,
    },
  },
]);

const buildings = ref([
  {
    name: "nuclear",
    file: "/images/icons/nuclear.webp",
    modelPath: "/static/game/nuclear.glb",
  },
  {
    name: "wind",
    file: "/images/icons/wind.webp",
    modelPath: "/static/game/wind.glb",
  },
  {
    name: "solar",
    file: "/images/icons/solar.webp",
    modelPath: "/static/game/solar.glb",
  },
  {
    name: "smallFossil",
    file: "/images/icons/thermal_grande.webp",
    modelPath: "/static/game/thermal_grande.glb",
  },
  {
    name: "largeFossil",
    file: "/images/icons/thermal_venti.webp",
    modelPath: "/static/game/thermal_venti.glb",
  },
]);

// game info

// test variable
// const gui = new GUI();
let obj = {
  lookatPosX: 0,
  lookatPosY: 0,
  lookatPosZ: 0,
  cameraPosX: 41,
  cameraPosY: 48.5,
  cameraPosZ: 9,
};

function initScene() {
  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#eeedea");
  // scene.fog = new THREE.Fog(0xa0a0a0, 10, 500);

  element = document.getElementById("index");
  // 创建相机，这里创建的是一个透视相机
  // camera = new THREE.PerspectiveCamera(35, (window.innerWidth - 201) / window.innerHeight, 1, 500);
  camera = new THREE.PerspectiveCamera(
    20,
    element.clientWidth / element.clientHeight,
    1,
    2000
  );
  camera.position.set(65, 35, 10); // 相机的位置
  camera.lookAt(0, 6, -2);
  scene.add(camera);

  // 半球光
  // 天空发出的光的颜色是0xffffff，地面发出的光的颜色是0x444444
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  // 灯光的位置
  hemiLight.position.set(0, 100, 0);
  scene.add(hemiLight);
  const hemiHelper = new THREE.HemisphereLightHelper(hemiLight, 50, "#ff0000");
  scene.add(hemiHelper);

  // 平行光
  const dirLight = new THREE.DirectionalLight(0xffffff);
  // 平行光的位置
  dirLight.position.set(-0, 40, 50);
  // 是否显示阴影
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 50;
  dirLight.shadow.camera.bottom = -25;
  dirLight.shadow.camera.left = -25;
  dirLight.shadow.camera.right = 25;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 200;
  dirLight.shadow.mapSize.set(1024, 1024);
  scene.add(dirLight);
  const dirHelper = new THREE.DirectionalLightHelper(dirLight, 50, "#ff0000");
  scene.add(dirHelper);

  // 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  const canvasFrame = document.querySelector("#three");
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth - 201, window.innerHeight);
  renderer.setSize(element.clientWidth, element.clientHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  // 是否允许阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  canvasFrame.appendChild(renderer.domElement);

  // 添加鼠标控制
  viewControls2 = new OrbitControls(camera, renderer.domElement);
  // 开启阻尼
  viewControls2.enableDamping = true;
  // 阻尼系数
  viewControls2.dampingFactor = 0.25;
  // 开启缩放
  viewControls2.enableZoom = true;
  // 自动旋转
  viewControls2.autoRotate = true;
  // 开启鼠标右键拖拽
  viewControls2.enablePan = true;
  // 相机离原点的最远距离
  viewControls2.maxDistance = 1000;

  const loader = new GLTFLoader();
  const dLoader = new DRACOLoader();
  dLoader.setDecoderPath("/draco/");
  dLoader.setDecoderConfig({ type: "js" }); //使用js方式解压
  dLoader.preload(); //初始化_initDecoder 解码器
  loader.setDRACOLoader(dLoader);
  loader.load("/static/islandtest_compress.glb", function (gltf) {
    // gltf.scene.traverse(function (child){
    //   child.castShadow = true;
    // })
    const temp = gltf.scene;
    // console.log(gltf);
    // console.log(temp);
    temp.name = "mainScene";
    temp.castShadow = true;
    temp.rotation.y = 0.2;
    temp.scale.set(1.2, 1.2, 1.2);
    scene.add(temp);
  });
  buildings.value.forEach((item) => {
    initBuildingModel(item);
  });

  animate();
}
function initBuildingModel(item) {
  const loader = new GLTFLoader();
  const dLoader = new DRACOLoader();
  dLoader.setDecoderPath("/draco/");
  dLoader.setDecoderConfig({ type: "js" }); //使用js方式解压
  dLoader.preload(); //初始化_initDecoder 解码器
  loader.setDRACOLoader(dLoader);
  loader.load(item.modelPath, function (gltf) {
    // gltf.scene.traverse(function (child){
    //   child.castShadow = true;
    // })
    const temp = gltf.scene;
    // temp.name = "mainScene";
    temp.castShadow = true;
    temp.scale.set(0.8, 0.8, 0.8);
    temp.rotation.y = 0.8;
    models.push({ name: item.name, mesh: temp });
    modelInstances.push(temp);
    // temp.position.copy(item.position);
    // temp.position.set(item.position.x, item.position.y + 1, item.position.z);
    // const temp2 = temp.clone();
    // temp2.position.set(item.position.x, item.position.y + 3, item.position.z);

    // scene.add(temp);
    // scene.add(temp2);
    modelInstances.push(temp);
  });
}

function animate() {
  animateId = requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
  if (composer) {
    composer.render();
  }
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
  // viewControls2 = null;
  models = null;
  modelInstances = null;
  composer = null;
  outlinePass = null;
  renderPass = null;
  element = null;

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
    child.material.dispose();
  }
  scene.remove(child);
  if (parent) {
    parent.remove(child);
  }
}

function clickPoint(item) {
  ElMessageBox.confirm("是否要放在这个位置", "确认", {
    type: "warning",
  })
    .then(() => {
      if (constructionCost[selectedModel.name] <= money.value) {
        if (
          pollutionIndex[selectedModel.name] + pollution.value <=
          pollutionTarget.value
        ) {
          ElMessage({
            type: "success",
            message: "放置成功",
          });
          placeNew(item);
        } else {
          ElMessage({
            type: "error",
            message: "污染指数超标",
          });
          selectedModel = null;
          unshowIcon();
        }
      } else {
        ElMessage({
          type: "error",
          message: "资金不足",
        });
        selectedModel = null;
        unshowIcon();
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "放置已取消",
      });
      selectedModel = null;
      unshowIcon();
    });
  grab.value = false;
  addModelMessage.close();
}

function placeNew(item) {
  updateGame(item);
  // const loader = new GLTFLoader();
  // const dLoader = new DRACOLoader();
  // dLoader.setDecoderPath("/draco/");
  // dLoader.setDecoderConfig({ type: "js" }); //使用js方式解压
  // dLoader.preload(); //初始化_initDecoder 解码器
  // loader.setDRACOLoader(dLoader);
  // loader.load(selectedModel.modelPath, function (gltf) {
  //   // gltf.scene.traverse(function (child){
  //   //   child.castShadow = true;
  //   // })
  //   const temp = gltf.scene;
  //   // temp.name = "mainScene";
  //   temp.castShadow = true;
  //   temp.scale.set(0.8, 0.8, 0.8);
  //   temp.rotation.y = 0.4;
  //   // temp.position.copy(item.position);
  //   temp.position.set(item.position.x, item.position.y + 1, item.position.z);
  //   const temp2 = temp.clone();
  //   temp2.position.set(item.position.x, item.position.y + 3, item.position.z);
  //
  //   scene.add(temp);
  //   scene.add(temp2);
  //   models.push(temp);
  // });
  const tempModel = models.find((target) => target.name === selectedModel.name);
  const tempMesh = tempModel.mesh.clone();
  tempMesh.position.set(item.position.x, item.position.y + 1, item.position.z);
  modelInstances.push(tempMesh);
  scene.add(tempMesh);
  points.value.forEach((i) => {
    if (i.name === item.name) {
      i.placed = true;
    }
  });
  unshowIcon();
  selectedModel = null;
}

const showIcon = function () {
  for (const point of points.value) {
    // 获取2D屏幕位置
    if (point.placed === false) {
      const screenPosition = point.position.clone();
      screenPosition.project(camera);
      point.element.classList.add("visible");
      let element = document.getElementById("index");
      const translateX = screenPosition.x * element.clientWidth * 0.5;
      const translateY = -screenPosition.y * element.clientHeight * 0.5;
      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    }
  }
};

const unshowIcon = () => {
  for (const point of points.value) {
    point.element.classList.remove("visible");
  }
};

const addBuilding = (item) => {
  grab.value = true;
  addModelMessage = ElMessage({
    message: "点击+来添加对应的设施",
    type: "info",
    duration: 0,
  });
  selectedModel = item;
  showIcon();
};

const initGameParameters = () => {
  generatorList = [];
  level.value = 1;
  money.value = 80000;
  profit.value = 0;
  timePassed.value = 0;
  timeTarget.value = 7;
  power.value = 0;
  powerTarget.value = 2000;
  pollution.value = 0;
  pollutionTarget.value = 80;
};

const newGame = () => {
  grab.value = false;
  selectedModel = null;
  unshowIcon();
  gameInProgress = true;
  if (timer != null) {
    clearInterval(timer);
    initGameParameters();
  }
  points.value.forEach((item) => {
    item.placed = false;
  });
  modelInstances.forEach((item) => {
    scene.remove(item);
  });
  ElMessage({
    message: "游戏开始",
    type: "success",
  });
  timer = setInterval(() => {
    if (timePassed.value < timeTarget.value * 24) timePassed.value += 2;
  }, 500);
};

const nextLevel = () => {
  gameInProgress = true;
  clearInterval(timer);
  ElMessage({
    message: "游戏开始",
    type: "success",
  });
  timer = setInterval(() => {
    if (timePassed.value < timeTarget.value * 24) timePassed.value += 2;
  }, 300);
  // TODO: 更新游戏的目标
  updateGameGoal();
  level.value++;
  timePassed.value = 0;
};

const updateGameGoal = () => {
  powerTarget.value = powerTarget.value * 2;
};

const updateGame = (item) => {
  generatorList.push({
    generatorName: selectedModel.name,
    pointName: item.name,
    point: item,
  });
  let itemProfitPerWatt =
    electricityPrice -
    (maintenanceCost[selectedModel.name] +
      penaltyCost[selectedModel.name] * item.energyProfile.fossilPenalty);
  power.value += item.energyProfile[selectedModel.name];
  money.value -= constructionCost[selectedModel.name];
  pollution.value += pollutionIndex[selectedModel.name];
  profit.value +=
    itemProfitPerWatt * item.energyProfile[selectedModel.name] * 24;
};

const gamePrompt = () => {
  ElMessageBox.alert(gameTutorial(), "游戏说明", {
    confirmButtonText: "关闭",
    dangerouslyUseHTMLString: true,
  });
};

watch(timePassed, () => {
  if (timePassed.value < timeTarget.value * 24) {
    money.value += profit.value / 12;
  } else {
    gameInProgress = false;
    selectedModel = null;
    unshowIcon();
    if (power.value >= powerTarget.value) {
      ElMessageBox.confirm("你过关了，是否进入下一关？", "过关", {
        distinguishCancelAndClose: true,
        confirmButtonText: "下一关",
        cancelButtonText: "关闭",
      }).then(() => {
        nextLevel();
      });
    } else {
      ElMessageBox.confirm("你没有过关，是否重新开始？", "Game Over", {
        distinguishCancelAndClose: true,
        confirmButtonText: "重新开始",
        cancelButtonText: "关闭",
      }).then(() => {
        newGame();
      });
    }
    grab.value = false;
    selectedModel = null;
    unshowIcon();
  }
});

onMounted(() => {
  points.value[0].element = document.querySelector(".point-0");
  points.value[1].element = document.querySelector(".point-1");
  points.value[2].element = document.querySelector(".point-2");
  points.value[3].element = document.querySelector(".point-3");
  points.value[4].element = document.querySelector(".point-4");
  points.value[5].element = document.querySelector(".point-5");
  points.value[6].element = document.querySelector(".point-6");
  points.value[7].element = document.querySelector(".point-7");
  initScene();
  gamePrompt();
  window.addEventListener("resize", (event) => {
    element = document.getElementById("index");
    renderer.setSize(element.clientWidth, element.clientHeight);
    camera.aspect = element.clientWidth / element.clientHeight;
    camera.updateProjectionMatrix();
  });
});
onUnmounted(() => {
  disposeScene();
});
</script>

<style scoped>
.center {
  height: 100%;
  margin: 0 auto;
}
.absolute {
  position: absolute;
}
.background {
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
}
.panelBackground {
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.1);
  padding: 5px;
}

.choose:hover img {
  filter: alpha(Opacity=80);
  -moz-opacity: 0.8;
  opacity: 0.8;
  transform: scale(1.05);
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
}
/*.center {*/
/*  transform: translate(-50%, 0);*/
/*  left: 50%;*/
/*}*/
.point {
  left: 50%;
  position: fixed;
  top: 50%;
  z-index: 10;
}
.label {
  padding: 3px 0;
}

.point .label {
  background: rgba(0, 0, 0, 0.467);
  border: 1px solid hsla(0, 0%, 100%, 0.467);
  border-radius: 50%;
  cursor: grab;
  height: 32px;
  left: -16px;
  /*line-height: 32px;*/
  text-align: center;
  top: -16px;
  -webkit-transform: scale(0);
  transform: scale(0);
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  width: 32px;

  color: rgba(255, 255, 255, 0.8);
  font-family: Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: 100;
  position: absolute;
}
.point.visible .label {
  -webkit-transform: scale(1);
  transform: scale(1);
}
.point:hover .label {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}
.buildingList {
  position: relative;
  left: 2.5%;
  background-color: Transparent;
  border: none;
}
.grab {
  cursor: not-allowed;
}
.game-panel {
  /*display: flex;*/
  /*align-items: center;*/
  padding: 7px;
  background-color: Transparent;
}

.icon {
  width: 16px;
  height: 16px;
}

.icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.info {
  display: flex;
  align-items: center;
}

.name {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.value {
  font-size: 14px;
  text-align: center;
}
:deep(.el-progress-circle__track) {
  stroke: #e0e0e0;
}
:deep(.el-progress-bar__outer) {
  background-color: #e0e0e0;
}
.circleBox {
  position: relative;
  text-align: center;
}
.circleBox .textCenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.circleBox .textCenter div {
  font-size: 12px;
  font-weight: 600;
  padding: 0;
}
.circleBox .textCenter span {
  font-size: 8px;
  font-weight: 600;
  color: #5e5e5e;
}
.el-divider--horizontal {
  margin: 8px 0;
  background: 0 0;
}
.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}

.infoButton {
  cursor: pointer;
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow {
  border-top-color: #1ab394;
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow:after {
  border-top-color: #1ab394;
}
</style>
