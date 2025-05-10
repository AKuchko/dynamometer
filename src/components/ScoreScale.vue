<script setup lang="ts">
import measureMain from '@/assets/images/measure_main.webp'
import ruby from '@/assets/images/ruby.webp'
import MeasureBlocks from './icons/MeasureBlocks.vue';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'animationend'): void;
}>()

const animationLevel = ref(0)

const startScoreAnimation = (level = 0) => {
  console.log('startScoreAnimation', level, animationLevel.value);

  if (animationLevel.value !== level) setTimeout(() => {
    animationLevel.value += 1
    if (animationLevel.value !== level) startScoreAnimation(level)
    else emit('animationend')
  }, animationLevel.value * 100)
}

const resetScore = () => {
  if (animationLevel.value > 0) setTimeout(() => {
    animationLevel.value -= 1
    resetScore()
  }, 100)
}

defineExpose({
  startScoreAnimation,
  resetScore,
})
</script>

<template>
  <div class="score-scale">
    <img
      class="score-scale__frame"
      :src="measureMain"
    >
    <img
      class="score-scale__ruby"
      :src="ruby"
    />
    <MeasureBlocks
      class="score-scale__measure"
      :level="animationLevel"
    />
  </div>
</template>

<style scoped>
.score-scale {
  position: relative;
}

.score-scale__frame {
  height: 324px;
}

.score-scale__ruby {
  position: absolute;
  left: 49.5%;
  top: 10px;
  transform: translateX(-50%);

  width: 68px;
  height: 68px;

  z-index: 1;
}

.score-scale__measure {
  position: absolute;
  left: 49.5%;
  bottom: 10px;
  transform: translateX(-50%);

  width: 77px;
}
</style>
