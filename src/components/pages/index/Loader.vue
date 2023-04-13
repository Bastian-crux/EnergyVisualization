<template>
  <section id="loading-screen">
    <div class="preloader" style="opacity: 1">
      <div class="spinner">
        <!--        <looping-rhombuses-spinner-->
        <!--          :animation-duration="2500"-->
        <!--          :rhombus-size="25"-->
        <!--          color="#9ca6b8"-->
        <!--        />-->
        <self-building-square-spinner
          :animation-duration="4000"
          :size="40"
          color="#9ca6b8"
        />
      </div>
      <div class="text">
        <transition name="switch" mode="out-in">
          <div v-if="props.progress < 100">加载资源中...</div>
          <div v-else>加载完成...</div>
        </transition>
        <transition name="switch" mode="out-in">
          <n-progress
            v-if="props.progress < 100"
            id="progress"
            type="line"
            :height="10"
            color="#9CA6B8"
            rail-color="#214358"
            :percentage="props.progress"
            :show-indicator="false"
            processing
          />
          <n-button
            style="font-weight: bold"
            id="enter-button"
            text-color="#9CA6B8"
            color="#192E41"
            :bordered="false"
            round
            @click="$emit('initPage')"
            v-else
          >
            进入
          </n-button>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { NProgress, NButton } from "naive-ui";
import {
  LoopingRhombusesSpinner,
  SelfBuildingSquareSpinner,
} from "epic-spinners";
const props = defineProps({ progress: Number });
const emit = defineEmits(["initPage"]);
</script>

<style scoped>
#progress {
  width: 90%;
  margin: 30px auto auto;
}

.switch-enter-active,
.switch-leave-active {
  --transition-time: 0.5s;
}

#loading-screen {
  position: absolute;
  z-index: 2;
  /*top: 0;*/
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #151b25;
}

.preloader {
  position: absolute;
  margin-left: -55px;
  margin-top: -100px;
  height: 110px;
  width: 110px;
  left: 50%;
  top: 50%;
}

.text {
  letter-spacing: 1px;
  text-align: center;
  margin-left: -43px;
  font-weight: bold;
  margin-top: 40px;
  font-size: 15px;
  color: #9ca6b8;
  width: 200px;
}

#enter-button {
  margin: 30px auto auto;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  /*height: 100vh;*/
}
</style>
