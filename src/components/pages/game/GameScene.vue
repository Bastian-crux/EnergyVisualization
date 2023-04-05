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
    <button
      class="buildingList"
      style="width: 80%; margin: 10px auto"
      v-for="item in buildings"
      :class="grab ? 'grab' : ''"
      :disabled="grab"
      @click="addBuilding(item)"
    >
      <div class="choose" style="display: flex; justify-content: center">
        <img
          :src="item.file"
          style="width: 90%; height: 90%; border-radius: 5px"
        />
      </div>
    </button>
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
    <h1 style="font-size: 20px; text-align: center">游戏信息</h1>
    <el-row :gutter="10" class="game-panel" justify="center">
      <el-col :span="4">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'star']" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="name">当前关卡</div>
      </el-col>
      <el-col :span="10">
        <div class="value">1</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="game-panel" justify="center">
      <el-col :span="4">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'clock']" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="name">剩余时间</div>
      </el-col>
      <el-col :span="10">
        <div class="value">1天</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="game-panel" justify="center">
      <el-col :span="4">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'coins']" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="name">剩余资金</div>
      </el-col>
      <el-col :span="10">
        <div class="value">₡1</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="game-panel" justify="center">
      <el-col :span="4">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'smog']" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="name">污染指数</div>
      </el-col>
      <el-col :span="10">
        <div class="value">0</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="game-panel" justify="center">
      <el-col :span="4">
        <div class="icon">
          <font-awesome-icon :icon="['fa', 'money-bill-trend-up']" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="name">收益</div>
      </el-col>
      <el-col :span="10">
        <div class="value">₡1/天</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="game-panel" justify="center">
      <el-col :span="4">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'bolt']" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="name">发电功率</div>
      </el-col>
      <el-col :span="10">
        <div class="value">0 MW</div>
      </el-col>
    </el-row>
    <div style="text-align: center">
      <el-button>新游戏</el-button>
    </div>
    <el-progress></el-progress>
    <el-row :gutter="10" class="game-panel" justify="center">
      <el-col :span="12">
        <div class="circleBox">
          <el-progress
            width="85"
            stroke-width="10"
            stroke-linecap="square"
            type="circle"
            :percentage="75"
            :show-text="false"
            color="#e6a23c"
          />
          <div class="textCenter">
            <div>20000MW</div>
            <span>2000 MW</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="circleBox">
          <el-progress
            width="85"
            stroke-width="10"
            stroke-linecap="square"
            type="circle"
            :percentage="50"
            :show-text="false"
            color="#e6a23c"
          />
          <div class="textCenter">
            <div>0</div>
            <span>80</span>
          </div>
        </div>
      </el-col>
    </el-row>
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

import { onMounted, onUnmounted, ref } from "vue";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader";
import { ElMessage, ElMessageBox } from "element-plus";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps(["itemIdx"]);
let camera, scene, renderer;
// let viewControls2;
let model = [];
let composer, outlinePass, renderPass;
let element;

let selectedModel;
let addModelMessage;

let animateId;

const grab = ref(false);

const points = ref([
  {
    name: "point-0",
    position: new THREE.Vector3(0, 1.5, -1),
    element: null,
    placed: false,
  },
  {
    name: "point-1",
    position: new THREE.Vector3(6, 1.2, 3),
    element: null,
    placed: false,
  },
  {
    name: "point-2",
    position: new THREE.Vector3(9, 2, -3),
    element: null,
    placed: false,
  },
  {
    name: "point-3",
    position: new THREE.Vector3(-3, 3, 3),
    element: null,
    placed: false,
  },
  {
    name: "point-4",
    position: new THREE.Vector3(-3, 3.8, -10),
    element: null,
    placed: false,
  },
  {
    name: "point-5",
    position: new THREE.Vector3(7, 1.2, 10),
    element: null,
    placed: false,
  },
  {
    name: "point-6",
    position: new THREE.Vector3(8, 3, -8),
    element: null,
    placed: false,
  },
  {
    name: "point-7",
    position: new THREE.Vector3(0, 3.8, -13),
    element: null,
    placed: false,
  },
]);

const buildings = ref([
  {
    name: "solar",
    file: "/images/icon1.png",
    modelPath: "/static/nuclear_game1.glb",
  },
  {
    name: "nuclear",
    file: "/images/icon2.png",
    modelPath: "/static/nuclear_game1.glb",
  },
  {
    name: "wind",
    file: "/images/icon3.png",
    modelPath: "/static/nuclear_game1.glb",
  },
  {
    name: "coal",
    file: "/images/icon1.png",
    modelPath: "/static/nuclear_game1.glb",
  },
]);

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
  scene.background = new THREE.Color("#AAAAAA");
  // scene.fog = new THREE.Fog(0xa0a0a0, 10, 500);

  element = document.getElementById("index");
  console.log(element);
  // 创建相机，这里创建的是一个透视相机
  // camera = new THREE.PerspectiveCamera(35, (window.innerWidth - 201) / window.innerHeight, 1, 500);
  camera = new THREE.PerspectiveCamera(
    20,
    element.clientWidth / element.clientHeight,
    1,
    500
  );
  camera.position.set(65, 35, 10); // 相机的位置
  camera.lookAt(0, 6, -2);
  scene.add(camera);
  console.log(camera);

  // 半球光
  // 天空发出的光的颜色是0xffffff，地面发出的光的颜色是0x444444
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  // 灯光的位置
  hemiLight.position.set(0, 100, 0);
  scene.add(hemiLight);

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

  // // 添加鼠标控制
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
    temp.name = "mainScene";
    temp.castShadow = true;
    temp.rotation.y = 0.2;
    temp.scale.set(1.2, 1.2, 1.2);
    scene.add(temp);
    model.push(temp);
  });
  console.log(scene);
  // const loader1 = new GLTFLoader();
  // const dLoader1 = new DRACOLoader();
  // dLoader1.setDecoderPath("/draco/");
  // dLoader1.setDecoderConfig({type: 'js'});  //使用js方式解压
  // dLoader1.preload();  //初始化_initDecoder 解码器
  // loader1.setDRACOLoader(dLoader1);
  // loader1.load('/static/nuclearPS_compress.glb',
  //     function (gltf) {
  //       const temp = gltf.scene;
  //       temp.name = '热力图';
  //
  //       temp.position.set(2, 2, -2);
  //       temp.castShadow = true;
  //       scene.add(temp);
  //       model.push(temp);
  //     });
  animate();
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
  model = null;
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
  console.log(item.name);
  ElMessageBox.confirm("是否要放在这个位置", "确认", {
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "放置成功",
      });
      placeNew(item);
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
  const loader = new GLTFLoader();
  const dLoader = new DRACOLoader();
  dLoader.setDecoderPath("/draco/");
  dLoader.setDecoderConfig({ type: "js" }); //使用js方式解压
  dLoader.preload(); //初始化_initDecoder 解码器
  loader.setDRACOLoader(dLoader);
  loader.load(selectedModel.modelPath, function (gltf) {
    // gltf.scene.traverse(function (child){
    //   child.castShadow = true;
    // })
    const temp = gltf.scene;
    // temp.name = "mainScene";
    temp.castShadow = true;
    temp.scale.set(0.8, 0.8, 0.8);
    temp.rotation.y = 0.4;
    // temp.position.copy(item.position);
    temp.position.set(item.position.x, item.position.y + 1, item.position.z);
    console.log("ok");
    scene.add(temp);
    model.push(temp);
  });
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
  console.log(obj);
  // gui
  //   .add(obj, "cameraPosX", -100, 100)
  //   .step(0.1)
  //   .onChange(function (e) {
  //     camera.position.x = e;
  //     camera.updateProjectionMatrix();
  //   });
  // gui
  //   .add(obj, "cameraPosY", -100, 100)
  //   .step(0.1)
  //   .onChange(function (e) {
  //     camera.position.y = e;
  //     camera.updateProjectionMatrix();
  //   });
  // gui
  //   .add(obj, "cameraPosZ", -100, 100)
  //   .step(0.1)
  //   .onChange(function (e) {
  //     camera.position.z = e;
  //     camera.updateProjectionMatrix();
  //   });
  // gui
  //   .add(obj, "lookatPosX", -100, 100)
  //   .step(0.1)
  //   .onChange(function (e) {
  //     camera.lookAt(e, 0, 0);
  //   });
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
  height: 750px;
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
  left: 10%;
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
/deep/ .el-progress-circle__track {
  stroke: #e0e0e0;
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
  color: #1360fb;
  font-weight: 600;
  padding: 0;
}
.circleBox .textCenter span {
  font-size: 8px;
}
</style>
