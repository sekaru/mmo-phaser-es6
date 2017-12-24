import ConnectionEvent from './events/Connection'

class Game {
  constructor(app) {
    this.lastPlayerID = 0;
    this.io = require('socket.io')(app);
    new ConnectionEvent(this);
  }

  getAllPlayers() {
    let players = [];
    
    Object.keys(this.io.sockets.connected).forEach(socketID => {
      let player = this.io.sockets.connected[socketID].player;
      if(player) players.push(player);
    });
    return players;
  }

  rand(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }
}

export default Game
