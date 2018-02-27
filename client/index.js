import Game from './states/Game'

class App extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.AUTO)

    this.state.add('Game', Game)
    this.state.start('Game')
  }
}

new App()
