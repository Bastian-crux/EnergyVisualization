<template>
  <div id="blocker">
    <div id="instructions">
      <p style="font-size: 36px">Click to play</p>
      <p>
        Move: WASD<br />
        Jump: SPACE<br />
        Look: MOUSE
      </p>
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
          v-for="item in boardList"
          :ref="item.ref"
          src="/static/solar/board.glb"
          dracoPath="/draco/"
          :scale="item.scale"
          :position="item.position"
          :rotation="item.rotation"
        />
        <!--        nuclear-->
        <GltfModel
          v-for="item in nuclearBuildingList"
          :ref="item.ref"
          src="/static/nuclear/nuclearbuilding1.glb"
          dracoPath="/draco/"
          :scale="item.scale"
          :position="item.position"
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
          v-for="item in windGeneratorList"
          :ref="item.ref"
          src="/static/wind/generator.glb"
          dracoPath="/draco/"
          :scale="item.scale"
          :position="item.position"
          :rotation="item.rotation"
        /><!-- cloud -->
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
import * as THREE from "three";
import { MathUtils, Object3D, Vector3 } from "three";
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  getCurrentInstance,
} from "vue";
import { NButton, NProgress } from "naive-ui";
const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;
import { PointerLockControls } from "three/addons/controls/PointerLockControls";

const currentInstance = getCurrentInstance();

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

const objects = [];

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

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

// Position Array List
const boardList = ref([
  {
    ref: "board1",
    scale: {
      x: 10,
      y: 10,
      z: 10,
    },
    position: {
      x: 32.61,
      y: 2.17,
      z: -60.87,
    },
    rotation: {
      y: 2.93,
    },
  },
  {
    ref: "board2",
    scale: {
      x: 10,
      y: 10,
      z: 10,
    },
    position: {
      x: 65.22,
      y: 2.17,
      z: -26.09,
    },
    rotation: {
      y: 1.2,
    },
  },
  {
    ref: "board3",
    scale: {
      x: 10,
      y: 10,
      z: 10,
    },
    position: {
      x: 71.74,
      y: 2.17,
      z: -17.39,
    },
    rotation: {
      y: 1.2,
    },
  },
  {
    ref: "board4",
    scale: {
      x: 10,
      y: 10,
      z: 10,
    },
    position: {
      x: 73.91,
      y: 2.6,
      z: -6.52,
    },
    rotation: {
      y: 1.15,
    },
  },
]);

const nuclearBuildingList = [
  {
    ref: "nuclearBuilding1-1",
    scale: {
      x: 15,
      y: 15,
      z: 15,
    },
    position: {
      x: 8.04,
      y: 2.35,
      z: -70.57,
    },
  },
  {
    ref: "nuclearBuilding1-2",
    scale: {
      x: 15,
      y: 15,
      z: 15,
    },
    position: {
      x: 28.39,
      y: 3.35,
      z: -60.0,
    },
  },
];

const windGeneratorList = [
  {
    ref: "windGenerator1",
    scale: {
      x: 18,
      y: 18,
      z: 18,
    },
    position: {
      x: -19.57,
      y: -6.52,
      z: 52.17,
    },
    rotation: {
      y: -0.96,
    },
  },
  {
    ref: "windGenerator2",
    scale: {
      x: 20,
      y: 20,
      z: 20,
    },
    position: {
      x: -36.96,
      y: -8.7,
      z: 54.35,
    },
    rotation: {
      y: -0.96,
    },
  },
  {
    ref: "windGenerator3",
    scale: {
      x: 18,
      y: 18,
      z: 18,
    },
    position: {
      x: -34.78,
      y: -2.17,
      z: 39.13,
    },
    rotation: {
      y: -0.96,
    },
  },
];

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
      if (canJump === true) velocity.y += 100;
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

onMounted(() => {
  //scene core
  renderer = currentInstance.ctx.$refs.myRenderer;
  scene = currentInstance.ctx.$refs.myScene.scene;
  camera = currentInstance.ctx.$refs.myCamera.camera;
  // scene.fog = new THREE.Fog(this.skycolor, 1, 800);

  // Set window size
  let element = document.getElementById("index");
  renderer.three.setSize(element.clientWidth, element.clientHeight);

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

    if (controls.isLocked === true) {
      raycaster.ray.origin.copy(controls.getObject().position);
      raycaster.ray.origin.y -= 10;

      const intersections = raycaster.intersectObjects(objects, false);

      const onObject = intersections.length > 0;

      const delta = (time - prevTime) / 1000;

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

      controls.moveRight(-velocity.x * delta);
      controls.moveForward(-velocity.z * delta);

      controls.getObject().position.y += velocity.y * delta; // new behavior

      if (controls.getObject().position.y < 10) {
        velocity.y = 0;
        controls.getObject().position.y = 10;

        canJump = true;
      }
    }

    prevTime = time;
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
</style>
