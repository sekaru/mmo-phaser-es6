import Game from '../states/Game'
import _ from 'lodash'

class GameObjectHandler {
  constructor(game) {
    this.game = game
    this.players
  }

  create() {
    this.players = this.game.add.group()
  }

  getPlayer(id) {
    return _.find(this.players.children, {id: id})
  }
  
  addPlayer(id, x, y) {
    let sprite = this.game.add.sprite(x, y, 'sprite')
    sprite.id = id
    this.game.physics.arcade.enable(sprite)
    sprite.body.collideWorldBounds = true

    this.players.add(sprite)
    if(id===this.game.myID) this.game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)  
  }

  movePlayer(id, x, y) {
    let player = this.getPlayer(id)
    if(!player) return

    let tween = this.game.add.tween(player)
    tween.to({ x, y }, 50)
    tween.start()
  }

  removePlayer(id) {
    if(!this.getPlayer(id)) return

    this.getPlayer(id).destroy()
    delete this.getPlayer(id)
  }

  handleCollision(player1, player2) {
    this.game.camera.flash(0xffffff, 500)
  }
}

export default GameObjectHandler