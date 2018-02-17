import Game from '../states/Game'
import _ from 'lodash'

class GameObjectHandler {
  constructor(game) {
    this.game = game;
    this.players;
  }

  create() {
    this.players = this.game.add.group();
  }

  getPlayer(id) {
    return _.find(this.players.hash, {id: id});
  }
  
  addPlayer(id, x, y) {
    let sprite = this.game.add.sprite(x, y, 'sprite');
    let player = Object.assign(sprite, {id: id});
    this.game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    this.players.add(player);
    if(id===this.game.myID) this.game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);  
  }

  movePlayer(id, x, y) {
    let player = this.getPlayer(id);
    if(!player) return;

    let distance = Phaser.Math.distance(player.x, player.y, x, y);
    let duration = this.game.moveSpeed/2;
    let tween = this.game.add.tween(player);

    tween.to({ x, y }, duration);
    tween.start();
  }

  removePlayer(id) {
    if(this.getPlayer(id)) {
      this.getPlayer(id).destroy();
      this.players.kill(this.getPlayer(id));
    }
  }

  handleCollision(player1, player2) {
    this.game.camera.flash(0xffffff, 500);
  }
}

export default GameObjectHandler