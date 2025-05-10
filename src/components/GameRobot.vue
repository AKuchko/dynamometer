<script setup lang="ts">
import { computed } from 'vue'
import { GameState } from '@/types'

import RobotIdle from '@/components/icons/RobotIdle.vue'
import RobotLove from '@/components/icons/RobotLove.vue'
import RobotSmile from '@/components/icons/RobotSmile.vue'
import { useGameStore } from '@/stores/GameStore'

const gameStore = useGameStore()

const robotSmileStates = [
  GameState.Hitted,
  GameState.Loser,
]

const robotLoveStates = [
  GameState.Winner,
]

const currentRobotStateIcon = computed(() => {
  if (robotSmileStates.includes(gameStore.state)) return RobotSmile
  if (robotLoveStates.includes(gameStore.state)) return RobotLove
  return RobotIdle
})
</script>

<template>
  <div class="game-robot">
    <component
      class="game-robot__robot"
      :is="currentRobotStateIcon"
    />
  </div>
</template>

<style>
.game-robot {
  position: relative;

  width: 70px;
  height: 70px;

  border: 1px solid var(--color-white);
  border-radius: 4px;
  overflow: visible;

  background: var(--color-deep-blue);
}

.game-robot__robot {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);

  height: 86.5px;
}
</style>
