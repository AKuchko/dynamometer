<script setup lang="ts">
import { computed } from 'vue';
import { GameState } from '@/types';
import BaseButton from './base/BaseButton.vue';
import { useGameStore } from '@/stores/GameStore';

const emit = defineEmits<{
  (e: 'make-hit'): void;
  (e: 'new-game'): void;
}>()

const gameStore = useGameStore()

const hintsByGameState: Partial<Record<GameState, string>> = {
  [GameState.InitialScreen]: 'Привет! \nпроверим твою силу!',
  [GameState.InGame]: 'Жми на кнопку в нужный момент!',
  [GameState.Loser]: 'Неплохо! \nПопробуй ещё раз.',
  [GameState.Winner]: 'ВОТ ЭТО СИЛА! \nТы выбил главный приз! \nРубин',
}

const hintMessage = computed(() => hintsByGameState[gameStore.state])

const isButtonHidden = computed(() => gameStore.state === GameState.Hitted)

const buttonMessage = computed(() => {
  return gameStore.state === GameState.InGame
    ? 'Удар!'
    : 'Новая игра'
})

const onPlayClick = () => {
  if (gameStore.state === GameState.InGame) emit('make-hit')
  else emit('new-game')
}
</script>

<template>
  <div
    class="game-control-button"
    :class="{ 'game-control-button--hidden': isButtonHidden }"
  >
    <p class="game-control-button__hint-message">
      {{ hintMessage }}
    </p>
    <BaseButton
      class="game-control-button__action-button"
      :disabled="isButtonHidden"
      @click="onPlayClick"
    >
      {{ buttonMessage }}
    </BaseButton>
  </div>
</template>

<style scoped>
.game-control-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;

  width: 172px;
}

.game-control-button__hint-message {
  font-weight: 700;
  text-align: center;
}

.game-control-button--hidden {
  opacity: 0;
}
</style>
