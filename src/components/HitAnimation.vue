<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useGameStore } from '@/stores/GameStore'
import { GameState, type CSSClasses } from '@/types'
import HammerImage from '@/assets/images/hammer.webp'
import HitButton from '@/components/icons/HitButton.vue'

const emit = defineEmits<{
  (e: 'animationend'): void;
}>()

const gameStore = useGameStore()

const isAnimationFinished = ref(false)

const hammerEl = ref<HTMLElement | null>(null)

const startHitAnimation = () => {
  if (!hammerEl.value) return

  const animationFrames: Keyframe[] = [
    { transform: 'rotate(0deg) translate(-5px, 0)' },
    { transform: 'rotate(45deg) translate(10px, -20px)' },
    { transform: 'rotate(-90deg) translate(55px, -31.5px)' },
  ]
  const animationOptions: KeyframeAnimationOptions = { duration: 600, iterations: 1 }
  const animation = hammerEl.value.animate(animationFrames, animationOptions)
  animation.onfinish = onAnimationEnd
}

const resetHitAnimation = () => {
  isAnimationFinished.value = false
}

const onAnimationEnd = () => {
  isAnimationFinished.value = true
  emit('animationend')
}

watch(() => gameStore.state, () => {
  if (gameStore.state === GameState.Hitted) startHitAnimation()
  if (gameStore.state === GameState.InGame) resetHitAnimation()
})

const rootCssClasses = computed((): CSSClasses => ({
  'hit-animation--ready': gameStore.state === GameState.InGame,
  'hit-animation--finished': isAnimationFinished.value,
}))
</script>

<template>
  <div
    class="hit-animation"
    :class="rootCssClasses"
  >
    <div class="hit-animation__wrapper">
      <img
        ref="hammerEl"
        class="hit-animation__hammer"
        :src="HammerImage"
      >
      <HitButton :pushed="isAnimationFinished" />
    </div>
  </div>
</template>

<style>
.hit-animation {
  min-height: 68px;
}

.hit-animation__wrapper {
  position: relative;
  display: inline-block;
}

.hit-animation__hammer {
  position: absolute;
  left: 100%;
  top: -80%;

  width: 90px;

  transition: all 0.6s ease;
  transform: rotate(-45deg);
  transform-origin: bottom center;
}

.hit-animation--ready .hit-animation__hammer {
  transform: rotate(0) translateX(-5px);
}

.hit-animation--finished .hit-animation__hammer {
  transition: none;
  transform: rotate(-90deg) translate(55px, -31.5px);
}
</style>
