import Client from '../services/Client'

class Game extends Phaser.State {
  constructor() {
    super();
    this.client = new Client(this);
    this.playerMap = {};
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

    layer.inputEnabled = true;
    layer.events.onInputUp.add(this.getCoords, this);

    this.client.requestJoin();
  }

  getCoords(layer, pointer) {
    this.client.sendClick(pointer.worldX, pointer.worldY);
  }

  addPlayer(id, x, y) {
    this.playerMap[id] = this.game.add.sprite(x, y, 'sprite');
    this.game.camera.follow(this.playerMap[id], Phaser.Camera.FOLLOW_TOPDOWN);        
  }

  movePlayer(id, x, y) {
    let player = this.playerMap[id];
    let distance = Phaser.Math.distance(player.x, player.y, x, y);
    let duration = distance * 5;
    let tween = this.game.add.tween(player);
    tween.to({ x, y }, duration);
    tween.start();
  }

  removePlayer(id) {
    this.playerMap[id].destroy();
    delete this.playerMap[id]; // todo: bad
  }
}

export default Game
