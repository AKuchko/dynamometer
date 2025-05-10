export type CSSClasses = Record<string, boolean>

export enum GameState {
  InitialScreen = 'initial',
  InGame = 'inGame',
  Hitted = 'hiitted',
  Winner = 'win',
  Loser = 'loser',
}
