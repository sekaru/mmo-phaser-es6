import Game from '../states/Game'

export default class Client {
  constructor(game) {
    this.socket = io.connect();

    this.socket.on('disconnect', () => {
      setTimeout(() => {
        location.reload();        
      }, 4000);
    });

    this.socket.on('myid', data => {
      game.myID = data.id;
    });

    this.socket.on('newplayer', data => {
      game.addPlayer(data.id, data.x, data.y);
    });

    this.socket.on('allplayers', data => {
      for(let i=0; i<data.length; i++) {
        game.addPlayer(data[i].id, data[i].x, data[i].y);
      }
    });

    this.socket.on('playermove', data => {
      game.movePlayer(data.id, data.x, data.y);
    });

    this.socket.on('remove', id => {
      game.removePlayer(id);
    });
  }

  requestJoin() {
    this.socket.emit('newplayer');
  }

  sendMove(x, y) {
    this.socket.emit('playermove', { x, y });
  }
}