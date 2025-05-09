import { defineStore } from 'pinia'
import { GameState } from '@/types'

interface StoreShape {
  state: GameState;
}

export const useGameStore = defineStore('counter', {
  state: (): StoreShape => ({
    state: GameState.InitialScreen,
  }),
  getters: {
    currentGameState: (state): GameState => state.state,
  },
  actions: {
    setGameState(state: GameState) {
      this.state = state;
    },
  },
})
