<template>
  <div>
    <div class="center" id="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three';


import {OrbitControls} from "three/addons/controls/OrbitControls";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";

import {GUI} from "three/examples/jsm/libs/lil-gui.module.min"


import {EffectComposer} from "three/addons/postprocessing/EffectComposer";
import {RenderPass} from "three/addons/postprocessing/RenderPass";
import {OutlinePass} from "three/addons/postprocessing/OutlinePass";

export default {
  data() {
    return {
      // publicPath: process.env.BASE_URL,
    }
  },
  mounted() {
    this.mesh = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.controls = null;
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.createScene() // 创建场景
      this.loadGLTF() // 加载GLTF模型
      this.createLight() // 创建光源
      this.createCamera() // 创建相机
      this.createRender() // 创建渲染器
      this.createControls() // 创建控件对象
      this.render() // 渲染
    },
    // 创建场景
    createScene() {
      this.scene = new THREE.Scene()
    },
    // 加载GLTF模型
    loadGLTF() {
      const THIS = this
      const loader = new GLTFLoader()
      loader.load('/assets/models/windPS.glb', model => {
        this.scene.add(model.scene);
      })
    },
    // 创建光源
    createLight() {
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1) // 创建环境光
      this.scene.add(ambientLight) // 将环境光添加到场景

      const spotLight = new THREE.SpotLight(0xffffff) // 创建聚光灯
      spotLight.position.set(150, 150, 150)
      spotLight.castShadow = true
      this.scene.add(spotLight)
    },
    // 创建相机
    createCamera() {
      const element = document.getElementById('container')
      const width = element.clientWidth // 窗口宽度
      const height = element.clientHeight // 窗口高度
      const k = width / height // 窗口宽高比
      // PerspectiveCamera( fov, aspect, near, far )
      this.camera = new THREE.PerspectiveCamera(35, k, 0.1, 1000)
      this.camera.position.set(150, 150, 150) // 设置相机位置

      this.camera.lookAt(new THREE.Vector3(10, 40, 0)) // 设置相机方向
      this.scene.add(this.camera)
    },
    // 创建渲染器
    createRender() {
      const element = document.getElementById('container')
      this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
      this.renderer.setSize(window.clientWidth, window.clientHeight) // 设置渲染区域尺寸
      this.renderer.shadowMap.enabled = true // 显示阴影
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.renderer.setClearColor(0x3f3f3f, 1) // 设置背景颜色
      element.appendChild(this.renderer.domElement)
    },

    render() {
      if (this.mesh) {
        this.mesh.rotation.z += 0.006
      }
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render)
    },
    // 创建控件对象
    createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    }
  }

}
</script>

<style scoped>
.center {
  height: 0px;
  max-width: 100%;
  margin: 0rem auto;
}
</style>