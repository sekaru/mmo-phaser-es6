import Client from '../services/Client'
import GameObjectHandler from '../services/GameObjectHandler'

class Game extends Phaser.State {
  constructor() {
    super();
    this.client = new Client(this);
    this.myID = -1;
    this.moveSpeed = 4;
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
    map.addTilesetImage('tilesheet', 'tileset');    

    let layer = null;
    for(let i=0; i<map.layers.length; i++) layer = map.createLayer(i);

    this.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);   

    this.gameObjectHandler.create();
    this.client.requestJoin();
  }

  update() {
    let player = this.gameObjectHandler.getPlayer(this.myID);   
    if(!player) return;    
    
    this.physics.arcade.collide(player, this.gameObjectHandler.players, this.gameObjectHandler.handleCollision, null, this);

    this.handleInput(player);
  }

  handleInput(player) {
    let moved = false;
    
    if(this.input.keyboard.isDown(Phaser.KeyCode.W)) {
      player.y -= this.moveSpeed;
      moved = true;    
    }

    if(this.input.keyboard.isDown(Phaser.KeyCode.A)) {
      player.x -= this.moveSpeed;
      moved = true;        
    }
    
    if(this.input.keyboard.isDown(Phaser.KeyCode.S)) {
      player.y += this.moveSpeed;
      moved = true;         
    }

    if(this.input.keyboard.isDown(Phaser.KeyCode.D)) {
      player.x += this.moveSpeed;
      moved = true;      
    }   
    
    if(moved) this.client.sendMove(player.x, player.y); 
  }
}

export default Game