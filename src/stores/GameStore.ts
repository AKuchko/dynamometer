import { defineStore } from 'pinia'
import { GameState } from '@/types'

interface StoreShape {
  state: GameState;
  hitPower: number;
  levelsCount: number;
}

export const useGameStore = defineStore('gameStore', {
  state: (): StoreShape => ({
    state: GameState.InitialScreen,
    hitPower: 0,
    levelsCount: 8,
  }),
  actions: {
    setGameState(state: GameState) {
      this.state = state
    },
    setHitPower(value: number) {
      this.hitPower = value
    },
  },
})
