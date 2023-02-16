<template>
  <div>
    <div class="center" id="three"></div>
  </div>
</template>

<script setup>
import * as THREE from "three";
import {ThreeMFLoader} from "three/examples/jsm/loaders/3MFLoader.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer.js"
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass.js"
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass.js"
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass.js"
import {FXAAShader} from "three/examples/jsm/shaders/FXAAShader.js"

import {onMounted} from "vue";

let camera, scene, renderer;
let model, settings;
let composer, outlinePass, renderPass;

function initScene() {
  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#AAAAAA");
  // scene.fog = new THREE.Fog(0xa0a0a0, 10, 500);

  // 创建相机，这里创建的是一个透视相机
  // camera = new THREE.PerspectiveCamera(35, (window.innerWidth - 201) / window.innerHeight, 1, 500);
  camera = new THREE.PerspectiveCamera(35, (window.innerWidth) / window.innerHeight, 1, 500);
  camera.position.set(-100, 80, 100); // 相机的位置
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
  renderer = new THREE.WebGLRenderer({antialias: true});
  const canvasFrame = document.querySelector("#three");
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth - 201, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  // 是否允许阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  canvasFrame.appendChild(renderer.domElement);

  // 地面
  const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(150, 150), // 一个长150，宽150的正方形
      new THREE.MeshPhongMaterial({color: 0x999999, depthWrite: false})
  );
  // x轴旋转90度
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, 0, 0);
  // 地面接收阴影
  ground.receiveShadow = true;
  scene.add(ground);

  // 加载3D模型
  // const loader3mf = new ThreeMFLoader();
  // loader3mf.load("3dMode/island.3mf", function (object) {
  //   object.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
  //   object.position.set(-10, 25, -30);
  //   object.scale.set(150, 150, 150);
  //   object.traverse(function (child) {
  //     child.castShadow = true;
  //     if (child.material) {
  //       child.material.transparent = true; // 每个材质都开启透明度设置，这个不开启改了opacity的值也不会生效
  //       child.material.opacity = 1; // 默认设置透明度为1
  //     }
  //   });
  //   model = object;
  //   scene.add(model);
  //   // 渲染
  //   animate();
  //
  //   // 添加鼠标控制
  //   const viewControls2 = new OrbitControls(camera, renderer.domElement);
  //   // 开启阻尼
  //   viewControls2.enableDamping = true;
  //   // 阻尼系数
  //   viewControls2.dampingFactor = 0.25;
  //   // 开启缩放
  //   viewControls2.enableZoom = true;
  //   // 自动旋转
  //   viewControls2.autoRotate = true;
  //   // 开启鼠标右键拖拽
  //   viewControls2.enablePan = true;
  //   // 相机离原点的最远距离
  //   viewControls2.maxDistance = 1000;
  // });
  const loader = new GLTFLoader();
  loader.load('/assets/models/windPS.glb',
      function (gltf) {
        // gltf.scene.traverse(function (child){
        //   child.castShadow = true;
        // })
        model = gltf.scene;
        model.scale.set(10, 10, 10);
        model.castShadow = true;
        scene.add(gltf.scene);
        // that.createPanel();
        animate();
        // 添加鼠标控制
        const viewControls2 = new OrbitControls(camera, renderer.domElement);
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
      });
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
  if (composer) {
    composer.render()
  }
}

function clickEvent(event) {
  //获取在射线上的接触点
  //获取鼠标坐标
  let mouse = new THREE.Vector2();
  let raycaster = new THREE.Raycaster();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(scene.children);
  if (intersects && intersects.length > 0) {
    outlineObj([intersects[0].object])
  }
  console.log('111')
}

//高亮显示模型（呼吸灯）
function outlineObj(selectedObjects) {
  // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
  composer = new EffectComposer(renderer)
  // 新建一个场景通道  为了覆盖到原理来的场景上
  renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass);
  // 物体边缘发光通道
  outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, selectedObjects)
  outlinePass.selectedObjects = selectedObjects
  outlinePass.edgeStrength = 15.0 // 边框的亮度
  outlinePass.edgeGlow = 2// 光晕[0,1]
  outlinePass.usePatternTexture = false // 是否使用父级的材质
  outlinePass.edgeThickness = 1.0 // 边框宽度
  outlinePass.downSampleRatio = 1 // 边框弯曲度
  outlinePass.pulsePeriod = 5 // 呼吸闪烁的速度
  outlinePass.visibleEdgeColor.set(parseInt(0xff0000)) // 呼吸显示的颜色
  outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
  outlinePass.clear = true
  composer.addPass(outlinePass)
  // 自定义的着色器通道 作为参数
  let effectFXAA = new ShaderPass(FXAAShader)
  effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)
  effectFXAA.renderToScreen = true
  composer.addPass(effectFXAA)
}

onMounted(() => {
  initScene();
  window.addEventListener('click', event => {
    clickEvent(event)
  });
});
</script>

<style scoped>
.center {
  max-width: 100%;
  margin: 0 auto;
}
</style>