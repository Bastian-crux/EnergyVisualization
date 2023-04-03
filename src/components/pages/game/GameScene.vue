<template>
  <!--  选择发电站-->
  <div
    class="absolute"
    style="
      color: #464646;
      background-color: white;
      width: 400px;
      right: 0px;
      top: 0%;
    "
  >
    <h1 style="font-size: 28px">发电站列表</h1>
    <el-space direction="vertical">
      <el-card></el-card>
      <el-card></el-card>
    </el-space>
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

import { onMounted, onUnmounted } from "vue";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader";

const props = defineProps(["itemIdx"]);
let camera, scene, renderer;
let viewControls2;
let model = [];
let composer, outlinePass, renderPass;
let element;

let animateId;

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
    35,
    element.clientWidth / element.clientHeight,
    1,
    500
  );
  camera.position.set(10, 10, 10); // 相机的位置
  scene.add(camera);

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
  // const dLoader = new DRACOLoader();
  // dLoader.setDecoderPath("/draco/");
  // dLoader.setDecoderConfig({type: 'js'});  //使用js方式解压
  // dLoader.preload();  //初始化_initDecoder 解码器
  // loader.setDRACOLoader(dLoader);
  loader.load("/static/islandtest.glb", function (gltf) {
    // gltf.scene.traverse(function (child){
    //   child.castShadow = true;
    // })
    const temp = gltf.scene;
    temp.name = "mainScene";
    // temp.position.set(-2, 2, -2);
    temp.castShadow = true;
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
  viewControls2 = null;
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

onMounted(() => {
  initScene();
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
/*.center {*/
/*  transform: translate(-50%, 0);*/
/*  left: 50%;*/
/*}*/
</style>
