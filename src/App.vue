<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { GameState } from './types'
import { useGameStore } from './stores/GameStore'
import GamePowerScale from './components/HitPowerScale.vue'
import GameButton from './components/GameControlButton.vue'
import GameRobot from './components/GameRobot.vue'
import HitAnimation from './components/HitAnimation.vue'
import ScoreScale from './components/ScoreScale.vue'

const gameStore = useGameStore()

const scoreLevel = ref(0)

const scoreEl = useTemplateRef<InstanceType<typeof ScoreScale>>('scoreEl')

const startGame = () => {
  gameStore.setGameState(GameState.InGame)
  gameStore.setHitPower(0)
  scoreLevel.value = 0
  scoreEl.value?.resetScore()
}

const makeHit = () => {
  gameStore.setGameState(GameState.Hitted)
}

const onHitAnimationEnd = () => {
  scoreLevel.value = Math.round(gameStore.hitPower / (100 / gameStore.levelsCount))
  scoreEl.value?.startScoreAnimation(scoreLevel.value)
}

const onScoreAnimationEnd = () => {
  if (scoreLevel.value !== gameStore.levelsCount) {
    gameStore.setGameState(GameState.Loser)
  } else {
    gameStore.setGameState(GameState.Winner)
  }
}
</script>

<template>
  <main class="app">
    <div class="app__wrapper">
      <ScoreScale
        ref="scoreEl"
        @animationend="onScoreAnimationEnd"
      />
      <HitAnimation
        @animationend="onHitAnimationEnd"
      />
      <div class="app__control">
        <GamePowerScale class="app__dynamometer" />
        <GameButton
          class="app__play-button"
          @make-hit="makeHit"
          @new-game="startGame"
        />
        <GameRobot class="app__robot-view" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  padding: 30px 13px;
  background-image: url('@/assets/images/bg.webp');
  background-size: auto 640px;
  background-repeat: no-repeat;
  background-position: 50% 44px;
}

.app__wrapper {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  max-width: 360px;
  max-height: 640px;

  padding-bottom: 107px;

  margin: auto;
}

.app__control {
  position: absolute;
  bottom: 0;

  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 11px;
  align-items: end;

  width: 100%;
}

.app__dynamometer {
  margin: 0 14px;
}
</style>
