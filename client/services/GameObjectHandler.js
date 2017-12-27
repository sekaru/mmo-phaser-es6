import Game from '../states/Game'
import _ from 'lodash'

export default class Client {
  constructor(game) {
    this.game = game;
    this.players = [];
  }

  getPlayer(id) {
    return _.find(this.players, {id: id});
  }
  
  addPlayer(id, x, y) {
    let sprite = this.game.add.sprite(x, y, 'sprite');
    let player = Object.assign(sprite, {id: id});
    this.game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    this.players.push(player);
    if(id===this.game.myID) this.game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);  
  }

  movePlayer(id, x, y) {
    let player = this.getPlayer(id);
    let distance = Phaser.Math.distance(player.x, player.y, x, y);
    let duration = this.game.speed/2;
    let tween = this.game.add.tween(player);
    tween.to({ x, y }, duration);
    tween.start();
  }

  removePlayer(id) {
    this.getPlayer(id).destroy();
    this.players.splice(this.players.indexOf(this.getPlayer(id)));
  }
}