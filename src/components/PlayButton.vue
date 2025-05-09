<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/GameStore';
import { GameState } from '@/types';
import BaseButton from './BaseButton.vue';

const emit = defineEmits<{
  (e: 'make-hit'): void;
  (e: 'new-game'): void;
}>()

const hintsByGameState: Partial<Record<GameState, string>> = {
  [GameState.InitialScreen]: 'Привет! \nпроверим твою силу!',
  [GameState.InGame]: 'Жми на кнопку в нужный момент!',
  [GameState.Loser]: 'Неплохо! \nПопробуй ещё раз.',
  [GameState.Winner]: 'ВОТ ЭТО СИЛА! \nТы выбил главный приз! \nРубин',
}

const { currentGameState } = storeToRefs(useGameStore())

const hintMessage = computed(() => hintsByGameState[currentGameState.value])

const buttonMessage = computed(() => {
  return currentGameState.value === GameState.InGame
    ? 'Удар!'
    : 'Новая игра'
})

const onPlayClick = () => {
  if (currentGameState.value === GameState.InGame) emit('make-hit')
  else emit('new-game')
}
</script>

<template>
  <div
    class="play-button"
    :class="{ 'play-button--hidden': currentGameState === GameState.Hitted }"
  >
    <p class="play-button__hint-message">
      {{ currentGameState }}
      {{ hintMessage }}
    </p>
    <BaseButton
      class="play-button__action-button"
      :disabled="currentGameState === GameState.Hitted"
      @click="onPlayClick"
    >
      {{ buttonMessage }}
    </BaseButton>
  </div>
</template>

<style scoped>
.play-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;
}

.play-button__hint-message {
  max-width: 172px;
  font-weight: 700;
  text-align: center;
}

.play-button--hidden {
  opacity: 0;
}
</style>
