import Client from '../services/Client'
import _ from 'lodash'

class Game extends Phaser.State {
  constructor() {
    super();
    this.client = new Client(this);
    this.players = [];
    this.myID = -1;
    this.speed = 4;
  }

  preload() {
    this.game.stage.disableVisibilityChange = true;
    this.game.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.spritesheet('tileset', 'assets/map/tilesheet.png', 32, 32);
    this.game.load.image('sprite', 'assets/sprites/sprite.png')
  }

  create() {
    this.game.world.setBounds(0, 0, 40*32, 30*32);    
    let map = this.game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset');

    let layer = null;
    for(let i=0; i<map.layers.length; i++) {
      layer = map.createLayer(i);
    }

    // layer.inputEnabled = true;
    // layer.events.onInputUp.add(this.getCoords, this);

    this.client.requestJoin();
  }

  update() {
    let player = this.getPlayer(this.myID);   
    let moved = false;

    if(!player) return;     

    if(this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
      player.y -= this.speed;
      moved = true;    
    }

    if(this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      player.x -= this.speed;
      moved = true;        
    }
    
    if(this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
      player.y += this.speed;
      moved = true;         
    }

    if(this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      player.x += this.speed;
      moved = true;      
    }   
    
    if(moved) this.client.sendMove(player.x, player.y);    
  }

  getPlayer(id) {
    return _.find(this.players, {id: id});
  }

  getCoords(layer, pointer) {  
    this.client.sendMove(pointer.worldX, pointer.worldY);
  }

  addPlayer(id, x, y) {
    let sprite = this.game.add.sprite(x, y, 'sprite');
    let player = Object.assign(sprite, {id: id});
    this.game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;      

    this.players.push(player);
    if(id===this.myID) this.game.camera.follow(sprite);  
  }

  movePlayer(id, x, y) {
    let player = this.getPlayer(id);
    let distance = Phaser.Math.distance(player.x, player.y, x, y);
    let duration = this.speed;
    let tween = this.game.add.tween(player);
    tween.to({ x, y }, duration);
    tween.start();
  }

  removePlayer(id) {
    this.getPlayer(id).destroy();
    this.players.splice(this.players.indexOf(this.getPlayer(id)));
  }
}

export default Game
