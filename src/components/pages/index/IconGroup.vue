<template>
  <div style="display: flex; bottom: 45px" class="absolute center">
    <n-button
      text
      style="margin-left: 10px"
      @click="$emit('relocate', 2400)"
      :disabled="processing"
    >
      <Icon size="45" :color="iconColor">
        <WeatherRain24Regular />
      </Icon>
    </n-button>

    <n-button
      text
      style="margin-left: 60px"
      @click="$emit('relocate', 9000)"
      :disabled="processing"
    >
      <Icon size="45" :color="iconColor">
        <GrainRound />
      </Icon>
    </n-button>
    <n-button
      text
      style="margin-left: 60px"
      @click="$emit('relocate', 17000)"
      :disabled="processing"
    >
      <Icon size="45" :color="iconColor">
        <WeatherFog24Regular />
      </Icon>
    </n-button>
    <n-button
      text
      style="margin-left: 60px"
      @click="$emit('relocate', 25000)"
      :disabled="processing"
    >
      <Icon size="45" :color="iconColor">
        <WeatherSunny24Regular />
      </Icon>
    </n-button>
    <n-button
      text
      style="margin-left: 60px"
      @click="$emit('relocate', 33000)"
      :disabled="processing"
    >
      <Icon size="45" :color="iconColor">
        <WeatherSunny24Regular />
      </Icon>
    </n-button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { NButton } from "naive-ui";
import {
  WeatherRain24Regular,
  WeatherFog24Regular,
  WeatherSunny24Regular,
} from "@vicons/fluent";
import { GrainRound } from "@vicons/material";
import { Icon } from "@vicons/utils";
const props = defineProps({
  vPosition: Number,
  processing: Boolean,
});
const emit = defineEmits(["relocate"]);
const iconColor = computed(() =>
  props.vPosition > 20000 ? "#4d290b" : "white"
);
</script>
