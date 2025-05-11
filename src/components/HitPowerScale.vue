<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore'
import { GameState, type CSSClasses } from '@/types'
import { computed, ref, watch } from 'vue'

const gameStore = useGameStore()

const isAnimationActive = ref(false)

const scaleValueEl = ref<HTMLElement | null>(null)

const getElementHeight = (element: HTMLElement | null) => {
  if (!element) return 0
  const { height, marginTop, marginBottom, paddingTop, paddingBottom } = getComputedStyle(element)
  const topOffset = +marginTop.replace('px', '') + +paddingTop.replace('px', '')
  const bottomOffset = +marginBottom.replace('px', '') + +paddingBottom.replace('px', '')
  return +height.replace('px', '') + topOffset + bottomOffset
}

const getPowerValue = (): number => {
  const conteinerHeight = getElementHeight(scaleValueEl.value?.parentElement || null)
  const scaleHeight = getElementHeight(scaleValueEl.value)
  return Math.round((scaleHeight / conteinerHeight) * 100)
}

const stopAnimation = () => {
  if (!scaleValueEl.value) return

  const power = getPowerValue()
  isAnimationActive.value = false

  requestAnimationFrame(() => {
    if (scaleValueEl.value) scaleValueEl.value.style.height = `${power}%`
  })
}

const startAnimation = () => {
  isAnimationActive.value = true
}

watch(
  () => gameStore.state,
  (state) => {
    if (state === GameState.Hitted) {
      stopAnimation()
      gameStore.setHitPower(getPowerValue())
    }

    if (state === GameState.InGame) {
      startAnimation()
    }
  }
)

const rootCssClasses = computed((): CSSClasses => ({
  'hit-power-scale--animated': isAnimationActive.value,
}))
</script>

<template>
  <div
    class="hit-power-scale"
    :class="rootCssClasses"
  >
    <div
      ref="scaleValueEl"
      class="hit-power-scale__power-value"
    />
    <img
      class="hit-power-scale__power-scale"
      src="@/assets/images/power-scale.webp"
    >
  </div>
</template>

<style scoped>
.hit-power-scale {
  position: relative;

  width: 40px;
  height: 147px;

  border-radius: 4px;

  border: 1px solid var(--color-blue);
  background-color: var(--dnm-dynamometer-bg);
}

.hit-power-scale__power-value {
  position: absolute;
  left: 0;
  bottom: 0;

  width: calc(100% - 6px);

  margin: 3px;
  border-radius: 2px;

  background-color: var(--dnm-dynamometer-filled);
}

.hit-power-scale__power-value::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 48px;
  height: 3px;

  border-radius: 2px;

  background-color: var(--color-white);
}

.hit-power-scale__power-scale {
  position: absolute;
  left: 42%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 26px;
  height: 100%;
}

.hit-power-scale--animated .hit-power-scale__power-value {
  animation-name: powerScaleAnimation;
  animation-duration: 1.75s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes powerScaleAnimation {
  0%   { height: 5%; }
  10%  { height: 80%; }
  20%  { height: 30%; }
  30%  { height: 60%; }
  40%  { height: 10%; }
  50%  { height: 98%; }
  60%  { height: 50%; }
  70%  { height: 25%; }
  80%  { height: 70%; }
  90%  { height: 40%; }
  100% { height: 0%; }
}
</style>
