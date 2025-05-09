<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from './BaseButton.vue';
import { useGameStore } from '@/stores/GameStore';
import { GameState } from '@/types';

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

const { currentGameState } = useGameStore()

const hintMessage = computed(() => hintsByGameState[currentGameState])

const buttonMessage = computed(() => {
  return currentGameState === GameState.InGame
    ? 'Удар!'
    : 'Новая игра'
})

const onPlayClick = () => {
  if (currentGameState === GameState.InGame) emit('make-hit')
  else emit('new-game')
}
</script>

<template>
  <div
    class="play-button"
    :class="{ 'play-button--hidden': currentGameState === GameState.Hitted }"
  >
    <p class="play-button__hint-message">
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
