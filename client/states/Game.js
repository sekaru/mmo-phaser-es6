import Client from '../services/Client'
import GameObjectHandler from '../services/GameObjectHandler'

export default class Game extends Phaser.State {
  constructor() {
    super();
    this.client = new Client(this);
    this.myID = -1;
    this.speed = 4;
    this.gameObjectHandler = new GameObjectHandler(this);
  }

  preload() {
    this.stage.disableVisibilityChange = true;
    this.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('tileset', 'assets/map/tilesheet.png', 32, 32);
    this.load.image('sprite', 'assets/sprites/sprite.png')
  }

  create() {
    let map = this.add.tilemap('map');    
    this.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);    
    map.addTilesetImage('tilesheet', 'tileset');

    let layer = null;
    for(let i=0; i<map.layers.length; i++) {
      layer = map.createLayer(i);
    }

    this.client.requestJoin();
  }

  update() {
    let player = this.gameObjectHandler.getPlayer(this.myID);   
    let moved = false;

    if(!player) return;     

    if(this.input.keyboard.isDown(Phaser.KeyCode.W)) {
      player.y -= this.speed;
      moved = true;    
    }

    if(this.input.keyboard.isDown(Phaser.KeyCode.A)) {
      player.x -= this.speed;
      moved = true;        
    }
    
    if(this.input.keyboard.isDown(Phaser.KeyCode.S)) {
      player.y += this.speed;
      moved = true;         
    }

    if(this.input.keyboard.isDown(Phaser.KeyCode.D)) {
      player.x += this.speed;
      moved = true;      
    }   
    
    if(moved) this.client.sendMove(player.x, player.y); 
  }
}
