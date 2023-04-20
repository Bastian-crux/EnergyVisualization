<template>
  <div style="display: flex; bottom: 45px" class="absolute center">
    <n-button
      text
      style="margin-left: 10px"
      @click="$emit('relocate', 2400)"
      :disabled="processing"
    >
      <Icon size="35" :color="iconColor">
        <font-awesome-icon :icon="['fass', 'fire']" />
      </Icon>
    </n-button>

    <n-button
      text
      style="margin-left: 60px"
      @click="$emit('relocate', 9000)"
      :disabled="processing"
    >
      <Icon size="35" :color="iconColor">
        <font-awesome-icon :icon="['fass', 'droplet']" />
      </Icon>
    </n-button>
    <n-button
      text
      style="margin-left: 60px"
      @click="$emit('relocate', 17000)"
      :disabled="processing"
    >
      <Icon size="35" :color="iconColor">
        <font-awesome-icon :icon="['fas', 'radiation']" />
      </Icon>
    </n-button>
    <n-button
      text
      style="margin-left: 60px"
      @click="$emit('relocate', 21500)"
      :disabled="processing"
    >
      <Icon size="35" :color="iconColor">
        <font-awesome-icon :icon="['fas', 'sun']" />
      </Icon>
    </n-button>
    <n-button
      text
      style="margin-left: 60px"
      @click="$emit('relocate', 28000)"
      :disabled="processing"
    >
      <Icon size="35" :color="iconColor">
        <font-awesome-icon :icon="['fass', 'wind']" />
      </Icon>
    </n-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NButton } from "naive-ui";
import { Icon } from "@vicons/utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const props = defineProps({
  vPosition: Number,
  processing: Boolean,
});
const emit = defineEmits(["relocate"]);
const iconColor = ref("white");
</script>
