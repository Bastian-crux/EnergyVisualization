<template>
  <div class="point point-0">
    <div class="label label-0">1</div>
    <div class="text text-0">
      灯塔：矗立在海岸的岩石之上，白色的塔身以及红色的塔屋，在湛蓝色的天空和深蓝色大海的映衬下，显得如此醒目和美丽。
    </div>
  </div>
  <div class="point point-1">
    <div class="label label-1">2</div>
    <div class="text text-1">
      小船：梦中又见那宁静的大海，我前进了，驶向远方，我知道我是船，只属于远方。这一天，我用奋斗作为白帆，要和明天一起飘扬，呼喊。
    </div>
  </div>
  <div class="point point-2">
    <div class="label label-2">3</div>
    <div class="text text-2">
      沙滩：宇宙展开的一小角。不想说来这里是暗自疗伤，那过于矫情，只想对每一粒沙子，每一朵浪花问声你们好吗
    </div>
  </div>
  <div class="point point-3">
    <div class="label label-3">4</div>
    <div class="text text-3">
      飞鸟：在苍茫的大海上，狂风卷集着乌云。在乌云和大海之间，海燕像黑色的闪电，在高傲地飞翔。
    </div>
  </div>
  <div class="point point-4">
    <div class="label label-4">5</div>
    <div class="text text-4">
      礁石：寂寞又怎么样？礁石都不说话，但是水流过去之后，礁石留下。
    </div>
  </div>
  <div id="blocker">
    <div id="instructions">
      <SurfTutorial style="width: 50%" />
    </div>
  </div>
  <div id="index">
    <Renderer ref="myRenderer" shadow antialias resize="window">
      <!--      :orbit-ctrl="{-->
      <!--      autoRotate: false,-->
      <!--      enableDamping: true,-->
      <!--      dampingFactor: 0.05,-->
      <!--      }"-->
      <Camera
        ref="myCamera"
        :position="{ x: 85, y: 5, z: -50 }"
        :lookAt="{ x: 0, y: 75, z: 0 }"
        :far="5000"
      />
      <Scene ref="myScene">
        <HemisphereLight
          ref="light"
          color="rgb(1, 10, 26)"
          groundColor="rgb(7, 16, 33)"
          :intensity="1.78"
        />
        <DirectionalLight
          ref="dir"
          color="rgb(100, 100, 100)"
          :intensity="0.83"
          :position="{ x: 120, y: 120 }"
          cast-shadow
        >
        </DirectionalLight>

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
          ref="mainscene"
          src="/static/mainscenetest2_scale.glb"
          dracoPath="/draco/"
          :scale="{ x: 35, y: 35, z: 35 }"
          :position="{ x: -73.61, y: 0, z: -32.61 }"
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

<script setup>
import SurfTutorial from "@/components/pages/surf/SurfTutorial.vue";
import * as THREE from "three";
import { MathUtils, Object3D, Vector3 } from "three";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { NButton, NProgress } from "naive-ui";

const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;
import { PointerLockControls } from "three/addons/controls/PointerLockControls";
import { OrbitControls } from "three/addons/controls/OrbitControls";

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

// threejs/troisjs
let renderer, scene, camera;

// wander
let controls;

let objects = [];

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const jumpHeight = 200;
const eyeHeight = 10;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

const myRenderer = ref(null);
const myScene = ref(null);
const myCamera = ref(null);
const mainscene = ref(null);

let points;

// camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
// camera.position.y = 10;
//
// scene = new THREE.Scene();
// scene.background = new THREE.Color( 0xffffff );
// scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
//
// const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
// light.position.set( 0.5, 1, 0.75 );
// scene.add( light );

const rayCaster_labelVisible = new THREE.Raycaster();

const onKeyDown = function (event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      moveForward = true;
      break;

    case "ArrowLeft":
    case "KeyA":
      moveLeft = true;
      break;

    case "ArrowDown":
    case "KeyS":
      moveBackward = true;
      break;

    case "ArrowRight":
    case "KeyD":
      moveRight = true;
      break;

    case "Space":
      if (canJump === true) velocity.y += jumpHeight;
      canJump = false;
      break;
  }
};

const onKeyUp = function (event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      moveForward = false;
      break;

    case "ArrowLeft":
    case "KeyA":
      moveLeft = false;
      break;

    case "ArrowDown":
    case "KeyS":
      moveBackward = false;
      break;

    case "ArrowRight":
    case "KeyD":
      moveRight = false;
      break;
  }
};

const checkLabelVisible = function () {
  if (true) {
    // 遍历每个点
    for (const point of points) {
      // 获取2D屏幕位置
      const screenPosition = point.position.clone();
      screenPosition.project(camera);
      rayCaster_labelVisible.setFromCamera(screenPosition, camera);
      const intersects = rayCaster_labelVisible.intersectObjects(
        scene.children,
        true
      );

      const controlsPos = controls.getObject().position;
      const dis = controlsPos.distanceTo(point.position);
      // 计算距离 显示文字
      if (dis < 30) {
        point.text.classList.add("activate");
      } else {
        point.text.classList.remove("activate");
      }

      if (intersects.length === 0) {
        // 未找到相交点，显示
        point.element.classList.add("visible");
      } else {
        // 找到相交点
        // 获取相交点的距离和点的距离
        const intersectionDistance = intersects[0].distance;
        const pointDistance = point.position.distanceTo(camera.position);
        // 相交点距离比点距离近，隐藏；相交点距离比点距离远，显示
        intersectionDistance < pointDistance
          ? point.element.classList.remove("visible")
          : point.element.classList.add("visible");
      }
      let element = document.getElementById("index");
      const translateX = screenPosition.x * element.clientWidth * 0.5;
      const translateY = -screenPosition.y * element.clientHeight * 0.5;
      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    }
  }
};

const collideCheck = (angle) => {
  let rotationMatrix = new THREE.Matrix4();
  rotationMatrix.makeRotationY((angle * Math.PI) / 180);
  const cameraDirection = controls
    .getDirection(new THREE.Vector3(0, 0, 0))
    .clone();
  cameraDirection.applyMatrix4(rotationMatrix);
  const raycaster = new THREE.Raycaster(
    controls.getObject().position.clone(),
    cameraDirection,
    0,
    5
  ); //射线长度为5 一条较短的射线
  raycaster.ray.origin.y -= eyeHeight;
  console.log(objects);
  const intersections = raycaster.intersectObjects(objects, false);
  return intersections.length;
};

const getMesh = (parent) => {
  parent.forEach((item) => {
    if (item.type === "Mesh") objects.push(item);
    else if (item.type === "Group") getMesh(item.children);
  });
};

onMounted(() => {
  points = [
    {
      position: new THREE.Vector3(10, 46, 0),
      element: document.querySelector(".point-0"),
      text: document.querySelector(".text-0"),
    },
    {
      position: new THREE.Vector3(-10, 8, 24),
      element: document.querySelector(".point-1"),
      text: document.querySelector(".text-1"),
    },
    {
      position: new THREE.Vector3(30, 10, 70),
      element: document.querySelector(".point-2"),
      text: document.querySelector(".text-2"),
    },
    {
      position: new THREE.Vector3(-100, 50, -300),
      element: document.querySelector(".point-3"),
      text: document.querySelector(".text-3"),
    },
    {
      position: new THREE.Vector3(-120, 50, -100),
      element: document.querySelector(".point-4"),
      text: document.querySelector(".text-4"),
    },
  ];

  //scene core
  renderer = myRenderer.value;
  scene = myScene.value.scene;
  camera = myCamera.value.camera;
  console.log(scene);
  console.log(mainscene.value);
  console.log(mainscene.value.scene);
  console.log(scene === mainscene.value.scene);
  // console.log(mainscene.value.userData);
  // scene.fog = new THREE.Fog(this.skycolor, 1, 800);

  // Set window size
  let element = document.getElementById("index");
  renderer.three.setSize(element.clientWidth, element.clientHeight);

  // const orbitCtrl = new OrbitControls(camera, renderer.domElement);
  // orbitCtrl.enableRotate = false;
  // orbitCtrl.enableZoom = false;
  // scene.add(orbitCtrl);

  // wander
  controls = new PointerLockControls(camera, document.body);

  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  instructions.addEventListener("click", function () {
    controls.lock();
  });

  controls.addEventListener("lock", function () {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });

  controls.addEventListener("unlock", function () {
    blocker.style.display = "block";
    instructions.style.display = "";
  });

  scene.add(controls.getObject());

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );

  //skybox
  let texture = [];
  let material = [];
  const imageArray = Array(6).fill("/assets/skybox/sky.png");
  imageArray.forEach((el) => texture.push(new THREE.TextureLoader().load(el)));
  texture.forEach((el) =>
    material.push(new THREE.MeshStandardMaterial({ map: el }))
  );
  for (let i = 0; i < 6; i++) material[i].side = THREE.BackSide;
  let skyboxGeo = new THREE.BoxGeometry(5000, 5000, 5000);
  let skybox = new THREE.Mesh(skyboxGeo, material);
  scene.add(skybox);

  //ANIMATION LOOP
  renderer.onBeforeRender(() => {
    const time = performance.now();

    objects = [];
    getMesh(scene.children);

    if (controls.isLocked === true) {
      raycaster.ray.origin.copy(controls.getObject().position);
      raycaster.ray.origin.y -= 10;

      const intersections = raycaster.intersectObjects(objects, false);

      const onObject = intersections.length > 0;

      const delta = (time - prevTime) / 1000;

      // 四个方位是否产生碰撞
      let leftCollide = false;
      let rightCollide = false;
      let forwardCollide = false;
      let backCollide = false;

      // 碰撞检测 collide check
      if (moveForward) forwardCollide = collideCheck(0);
      if (moveBackward) backCollide = collideCheck(180);
      if (moveLeft) leftCollide = collideCheck(90);
      if (moveRight) rightCollide = collideCheck(270);

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.normalize(); // this ensures consistent movements in all directions

      if (moveForward || moveBackward)
        velocity.z -= direction.z * 400.0 * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

      if (onObject === true) {
        velocity.y = Math.max(0, velocity.y);
        canJump = true;
      }

      // 计算移动距离
      let rightDistance = -velocity.x * delta;
      let forwardDistance = -velocity.z * delta;

      // 右侧有障碍物时向右移动 置零
      if ((moveRight && rightCollide) || (moveLeft && leftCollide)) {
        rightDistance = 0;
      }

      // 前方有障碍物时向前移动 置零
      if ((moveForward && forwardCollide) || (moveBackward && backCollide)) {
        forwardDistance = 0;
      }

      // 设置最终移动值
      if (moveLeft || moveRight) controls.moveRight(rightDistance);

      if (moveForward || moveBackward) controls.moveForward(forwardDistance);

      controls.getObject().position.y += velocity.y * delta; // new behavior

      if (controls.getObject().position.y < 10) {
        velocity.y = 0;
        controls.getObject().position.y = 10;

        canJump = true;
      }
    }

    prevTime = time;

    // visible
    checkLabelVisible();
  });
});

onUnmounted(() => {
  // console.log(this.scene);
  // disposeScene();
});

// export default {
// components: {
//   NButton,
//   NProgress,
// },

// setup() {

// return {
//   percent,
//   imageArray,
// };
// },
// mounted() {
//
// },

// unmounted() {
//
// },
// watch: {},
// methods: {},
// };
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

#blocker {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

#instructions {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

.point {
  left: 50%;
  position: fixed;
  top: 50%;
  z-index: 10;
}

.point .label {
  background: rgba(0, 0, 0, 0.467);
  border: 1px solid hsla(0, 0%, 100%, 0.467);
  border-radius: 50%;
  cursor: help;
  height: 32px;
  left: -16px;
  line-height: 32px;
  text-align: center;
  top: -16px;
  -webkit-transform: scale(0);
  transform: scale(0);
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  width: 32px;
}

.point .label,
.point .text {
  color: #fff;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 100;
  position: absolute;
}

.point .text {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid hsla(0, 0%, 100%, 0.467);
  border-radius: 4px;
  left: -120px;
  line-height: 1.3em;
  opacity: 0;
  padding: 20px;
  pointer-events: none;
  text-align: justify;
  text-align-last: left;
  top: 30px;
  transition: opacity 0.3s;
  width: 200px;
}

.point .text.activate {
  opacity: 1;
}

.point.visible .label {
  -webkit-transform: scale(1);
  transform: scale(1);
}
</style>
